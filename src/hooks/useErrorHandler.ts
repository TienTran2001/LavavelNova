import { useCallback, useState } from 'react';

export interface IError {
  message?: string;
}

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: IError) => {
    const errorMessage = err?.message || 'Error!!!';
    setError(errorMessage);
  }, []);

  const handleRetry = useCallback((callback: () => void) => {
    setError(null);
    callback();
  }, []);

  return {
    error,
    handleError,
    handleRetry,
  };
}
