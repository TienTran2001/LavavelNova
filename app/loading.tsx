import { RotateLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="fixed inset-0 text-white bg-primary/500 z-[99999]">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-[9998]">
        <RotateLoader
          color={'white'}
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loading;
