import React, { useEffect, useState } from 'react';
import withErrorState from '~/hoc/withErrorState';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ComponentType<{ reload: () => void }>;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setError(event.error);
      console.log(event.error);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  const reload = () => {
    setError(null);
  };

  if (error) {
    const FallbackComponent = withErrorState(fallback);
    return <FallbackComponent reload={reload} />;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
