import Skeleton from '@mui/material/Skeleton';

const TableSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-5 p-4 border border-b-gray/100">
      <div className="w-[20px]  ">
        <Skeleton variant="rounded" width="100%" height={20} />
      </div>
      <div className="w-[15%]">
        <Skeleton variant="rounded" width="100%" height={70} />
      </div>
      <div className="w-[20%]">
        <Skeleton variant="rounded" width="100%" height={20} />
      </div>
      <div className="w-[25%]">
        <Skeleton variant="rounded" width="100%" height={20} />
      </div>
      <div className="w-[15%]">
        <Skeleton variant="rounded" width="100%" height={20} />
      </div>
    </div>
  );
};

export default TableSkeleton;
