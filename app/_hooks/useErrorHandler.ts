import { useCallback, useState } from 'react';

export interface IError {
  message?: string;
}

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: IError | null) => {
    const errorMessage =
      err?.message || 'Lồi rồi nè, ấn nút dưới để thử lại nào!!!';

    err ? setError(errorMessage) : setError(null);
  }, []);

  return {
    error,
    handleError,
  };
}
