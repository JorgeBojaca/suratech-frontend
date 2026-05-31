import { Component } from 'react';

/**
 * ErrorBoundary — generic class boundary (spec appendix).
 * Catches errors thrown while rendering its child tree and shows a fallback
 * instead of crashing the whole app. Feature wrappers pass a tailored
 * `fallback`. (Does NOT catch event-handler or async errors — those use
 * state, e.g. ShowcaseErrorState.)
 *
 * @param {React.ReactNode | ({error, reset}) => React.ReactNode} fallback
 * @param {() => void} [onReset]  extra work to run when the user retries
 */
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Swap for a real logger (Sentry, etc.) later.
    console.error('ErrorBoundary caught an error:', error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return typeof fallback === 'function'
        ? fallback({ error, reset: this.reset })
        : fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
