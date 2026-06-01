import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import useProject from './useProject';
import portfolioService from '../services/portfolioService';

// Mock the data layer — these tests verify the hook's logic, not the network.
vi.mock('../services/portfolioService', () => ({
  default: { getProject: vi.fn() },
}));

const ok = (project) => ({ error: null, aborted: false, data: project });
const empty = { error: null, aborted: false, data: null };
const failed = { error: new Error('network'), aborted: false, data: null };
const aborted = { error: null, aborted: true, data: null };

describe('useProject', () => {
  it('resolves a project for a valid slug', async () => {
    const project = { id: 1, slug: 'walletflow', name: 'WalletFlow' };
    portfolioService.getProject.mockResolvedValue(ok(project));

    const { result } = renderHook(() => useProject('walletflow'));

    // starts in the loading state
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.project).toEqual(project);
    expect(result.current.isError).toBe(false);
    expect(result.current.isNotFound).toBe(false);
    expect(portfolioService.getProject).toHaveBeenCalledWith(
      expect.objectContaining({ slug: 'walletflow', signal: expect.any(AbortSignal) }),
    );
  });

  it('flags not-found (not error) when the result is empty', async () => {
    portfolioService.getProject.mockResolvedValue(empty);

    const { result } = renderHook(() => useProject('ghost'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isNotFound).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.project).toBeNull();
  });

  it('flags error (not not-found) when the request fails', async () => {
    portfolioService.getProject.mockResolvedValue(failed);

    const { result } = renderHook(() => useProject('walletflow'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
    expect(result.current.isNotFound).toBe(false);
    expect(result.current.project).toBeNull();
  });

});
