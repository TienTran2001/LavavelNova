import Button from '@mui/material/Button';
import { warning } from '~/assets';

interface ErrorWithRetryProps {
  errorMessage: string;
  variant?: 'page' | 'element';
  onRetry: () => void;
}

const ErrorWithRetry = ({
  errorMessage,
  onRetry,
  variant,
}: ErrorWithRetryProps) => {
  if (variant === 'element') {
    return (
      <div className="flex items-center px-4 py-2 bg-gray-200 gap-x-5 rounded-16">
        <p className="text-14 font-600 text-red/500 ">{errorMessage}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={onRetry}
          sx={{
            borderRadius: '4px',
            maxWidth: 100,
            width: '100%',
            textTransform: 'unset',
            fontSize: 14,
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-1/2 gap-5 py-10 mx-auto bg-white rounded-16 mt-50">
      <div className="max-w-[200px] w-full">
        <img
          src={warning}
          alt="warning"
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-xl font-600 text-red/500 ">{errorMessage}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={onRetry}
        sx={{
          borderRadius: 9999,
          maxWidth: 200,
          width: '100%',
          textTransform: 'unset',
          fontSize: 20,
        }}
      >
        Retry
      </Button>
    </div>
  );
};

export default ErrorWithRetry;
