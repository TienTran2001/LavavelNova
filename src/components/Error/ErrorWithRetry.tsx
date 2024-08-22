import Button from '@mui/material/Button';
import { warning } from '~/assets';

interface ErrorWithRetryProps {
  errorMessage: string;
  onRetry: () => void;
}

const ErrorWithRetry = ({ errorMessage, onRetry }: ErrorWithRetryProps) => {
  return (
    <div className="flex flex-col items-center w-1/2 gap-5 py-10 mx-auto bg-white rounded-16">
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
