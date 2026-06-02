# JavaScript Refactoring: `getUser` → `fetchUserById`

> A complete analysis, refactor, and production-readiness guide for a common async fetch function.

---

## 1. Analysis of the Original Code

```js
function getUser(d){ return
fetch("https://jsonplaceholder.typicode.com/users/"+d).then(x=>x.json()).then(j=>console
.log(j)) }
```

### Critical bugs

| # | Issue | Description |
|---|-------|-------------|
| 1 | **ASI silent bug** | `return` sits on its own line. JavaScript's Automatic Semicolon Insertion inserts a semicolon after it, so the function always returns `undefined` — the Promise is never returned to the caller. |
| 2 | **No HTTP error handling** | `fetch()` only rejects on network-level failures. A `404 Not Found` or `500 Internal Server Error` resolves successfully. Non-OK responses are silently swallowed. |
| 3 | **Side-effect instead of return** | The result is passed to `console.log` and discarded. The function is untestable and cannot be composed with other logic. |
| 4 | **No input validation** | Passing `null`, `undefined`, `0`, `-1`, or a float like `1.5` silently builds a bad URL with no error. |

### Code smell & style issues

- **Cryptic naming** — `d`, `x`, `j` communicate nothing about intent or type.
- **String concatenation for URLs** — brittle, typo-prone, and harder to extend.
- **No JSDoc** — nothing for editors or type checkers to work with.
- **Single responsibility violation** — one function handles fetching, parsing, AND logging.
- **No `async/await`** — chained `.then()` is harder to read and debug.

---

## 2. Refactored Version

```js
const BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Fetches a single user by their ID from the JSONPlaceholder API.
 *
 * @param {number} userId - A positive integer user ID.
 * @returns {Promise<Object>} Resolves with the user data object.
 * @throws {TypeError} If userId is not a positive integer.
 * @throws {Error} If the network request fails or the server returns a non-OK status.
 */
async function fetchUserById(userId) {
  if (!Number.isInteger(userId) || userId < 1) {
    throw new TypeError(
      `Invalid userId: expected a positive integer, but received "${userId}" (${typeof userId}).`
    );
  }

  const response = await fetch(`${BASE_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user ${userId}: HTTP ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
```

### Usage

```js
// Caller owns the logging, rendering, and error surface
try {
  const user = await fetchUserById(1);
  console.log(user.name); // "Leanne Graham"
} catch (error) {
  console.error("Could not load user:", error.message);
}
```

---

## 3. Explanation of Improvements

### 3.1 ASI-safe `async/await`

**Before:**
```js
function getUser(d){ return       // ← semicolon inserted here by ASI
fetch("...")...}
```

**After:**
```js
async function fetchUserById(userId) {
  ...
  return response.json(); // explicit, unambiguous
}
```

`async/await` makes control flow linear and eliminates the entire class of ASI-related return bugs.

---

### 3.2 Meaningful naming

| Original | Refactored | Reason |
|----------|------------|--------|
| `getUser` | `fetchUserById` | `fetch` signals a network operation; `ById` clarifies the lookup key |
| `d` | `userId` | Self-documenting; no mental mapping required |
| `x` | `response` | Matches the `fetch` API's standard vocabulary |
| `j` | _(eliminated)_ | `response.json()` is returned directly |

---

### 3.3 Input validation

```js
if (!Number.isInteger(userId) || userId < 1) {
  throw new TypeError(
    `Invalid userId: expected a positive integer, but received "${userId}" (${typeof userId}).`
  );
}
```

Follows the **fail-fast** principle. Illegal inputs (`null`, `undefined`, `0`, `-5`, `1.5`, `"abc"`) are rejected before any I/O occurs. The error message tells the caller exactly what went wrong and what was received.

---

### 3.4 HTTP error surface

```js
if (!response.ok) {
  throw new Error(
    `Failed to fetch user ${userId}: HTTP ${response.status} ${response.statusText}`
  );
}
```

`fetch()` only rejects the Promise on network-level failures (no internet, DNS failure, CORS block). A `404` or `500` from the server **resolves** the Promise. Checking `response.ok` closes this critical gap and gives callers a real error to handle.

---

### 3.5 Data returned, not logged

**Before:** `console.log(j)` — data is printed and discarded.

**After:** `return response.json()` — data is returned to the caller.

The function now does one thing: fetch and return data. The caller decides what to do with it — render it in the UI, pass it to another function, write a test assertion against it, or log it. This is the foundation of composable, testable code.

---

### 3.6 Extracted base URL constant

```js
const BASE_URL = "https://jsonplaceholder.typicode.com";
```

- Swapping environments (dev, staging, prod) is a one-line change.
- Prevents the same URL string from being duplicated across functions.
- Makes typos immediately visible rather than buried inside a template literal.

---

### 3.7 Template literal URL

**Before:** `"https://.../" + d`

**After:** `` `${BASE_URL}/users/${userId}` ``

Cleaner, safer, and easier to extend (e.g. add query params). No accidental type coercion on `+`.

---

### 3.8 JSDoc

```js
/**
 * @param {number} userId
 * @returns {Promise<Object>}
 * @throws {TypeError}
 * @throws {Error}
 */
```

Documents the full contract — parameters, return type, and every exception — without any runtime overhead. Any editor with TypeScript language service (VS Code, WebStorm) will show inline type hints and flag misuse before the code runs.

---

## 4. Production-Readiness Considerations

### 4.1 Request timeout

`fetch()` has no built-in timeout. A hanging server will hang your UI indefinitely.

```js
async function fetchUserById(userId) {
  if (!Number.isInteger(userId) || userId < 1) {
    throw new TypeError(`Invalid userId: expected a positive integer, got "${userId}".`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5_000); // 5 second timeout

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user ${userId}: HTTP ${response.status} ${response.statusText}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId); // always clean up the timer
  }
}
```

---

### 4.2 Retry with exponential backoff

Transient failures (network blip, 503 under load) can be recovered automatically.

```js
async function fetchWithRetry(fn, { retries = 3, baseDelayMs = 300 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt === retries;
      if (isLastAttempt) throw error;

      const delay = baseDelayMs * 2 ** attempt; // 300ms, 600ms, 1200ms
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Usage
const user = await fetchWithRetry(() => fetchUserById(1));
```

---

### 4.3 Environment-based base URL

Never hardcode production URLs in source files.

```js
// Vite / modern bundler
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Node.js / CJS
const BASE_URL = process.env.API_BASE_URL;
```

Add validation at startup so misconfigured environments fail loudly:

```js
if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined. Check your .env file.");
}
```

---

### 4.4 Centralized HTTP client

At scale, replace raw `fetch` calls with a shared client that handles auth headers, base URL, serialization, and retries in one place — keeping individual data functions thin.

```js
// lib/httpClient.js
export async function get(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${path}`);
  }

  return response.json();
}

// users/api.js — stays thin
import { get } from "../lib/httpClient.js";

export async function fetchUserById(userId) {
  if (!Number.isInteger(userId) || userId < 1) {
    throw new TypeError(`Invalid userId: "${userId}"`);
  }
  return get(`/users/${userId}`);
}
```

---

### 4.5 TypeScript version

For TypeScript codebases, define a typed interface for the API response:

```ts
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

async function fetchUserById(userId: number): Promise<User> {
  if (!Number.isInteger(userId) || userId < 1) {
    throw new TypeError(`Invalid userId: expected a positive integer, got "${userId}".`);
  }

  const response = await fetch(`${BASE_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user ${userId}: HTTP ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<User>;
}
```

---

### 4.6 Unit test example (Vitest / Jest)

```js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUserById } from "./users.js";

describe("fetchUserById", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns user data for a valid ID", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: "Leanne Graham" }),
    });

    const user = await fetchUserById(1);
    expect(user.name).toBe("Leanne Graham");
  });

  it("throws TypeError for non-integer input", async () => {
    await expect(fetchUserById("abc")).rejects.toThrow(TypeError);
    await expect(fetchUserById(0)).rejects.toThrow(TypeError);
    await expect(fetchUserById(-1)).rejects.toThrow(TypeError);
    await expect(fetchUserById(1.5)).rejects.toThrow(TypeError);
  });

  it("throws Error on non-OK HTTP response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchUserById(999)).rejects.toThrow("HTTP 404");
  });
});
```

---

## Summary

| Concern | Original | Refactored |
|---------|----------|------------|
| Returns the Promise | ❌ (ASI bug) | ✅ |
| Input validation | ❌ | ✅ |
| HTTP error handling | ❌ | ✅ |
| Data returned to caller | ❌ (logged only) | ✅ |
| Readable naming | ❌ | ✅ |
| Composable / testable | ❌ | ✅ |
| JSDoc / typed | ❌ | ✅ |
| Single responsibility | ❌ | ✅ |

--- 

## Exercise 04 AI Assistance

I used ChatGPT with a simple prompt to generate a better prompt. After reviewing and adjusting the generated result, I used the refined prompt in Claude.

These were the two prompts I used:

```txt
Act as a frontend senior developer to refactor a function into modern, production-ready quality...
```

 ```txt
Act as a Senior Frontend Developer with experience building production-grade JavaScript applications.
Refactor the provided function into modern, clean, maintainable, and production-ready code.
Requirements:

* Use modern JavaScript (ES2023+) best practices.
* Improve readability and naming conventions.
* Add proper error handling.
* Follow clean code principles.
* Remove code smells and anti-patterns.
* Ensure the function has a single responsibility.
* Add meaningful comments only where necessary.
* Consider performance and maintainability.
* Return the complete refactored code.
* Explain every improvement made and why it was necessary.
* Highlight any potential issues in the original implementation.

function getUser(d){ return
fetch("https://jsonplaceholder.typicode.com/users/"+d).then(x=>x.json()).then(j=>console
.log(j)) }

Output format:

1. Analysis of the original code.
2. Refactored version.
3. Explanation of improvements.
4. Production-readiness considerations.
```
