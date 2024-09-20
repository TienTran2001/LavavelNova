import Button from '@mui/material/Button';

interface ErrorWithRetryProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorWithRetry = ({ errorMessage, onRetry }: ErrorWithRetryProps) => {
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
};

export default ErrorWithRetry;
