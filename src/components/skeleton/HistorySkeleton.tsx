import { Skeleton } from '@mui/material';

const HistorySkeleton = () => {
  return (
    <div className="flex justify-center p-6 bg-background-light h-full w-full">
      <div className="w-full md:w-[60%]">
        <h1 className="w-full text-2xl font-semibold mb-4 text-secondary">
          <Skeleton width="30%" />
        </h1>
        <div className="space-y-4">
          {Array.from(new Array(3)).map((_, index) => (
            <div
              key={index}
              className="flex p-2 border border-background-medium rounded-lg shadow-sm bg-background-light"
            >
              <div className="w-[70%] ml-5 space-y-2">
                <p className="text-gray-700">
                  <Skeleton width="60%" />
                </p>
                <p className="text-gray-700">
                  <Skeleton width="50%" />
                </p>
                <p className="text-gray-700">
                  <Skeleton width="40%" />
                </p>
                <p className="text-gray-700">
                  <Skeleton width="30%" />
                </p>
              </div>
              <div className="flex-grow flex flex-col justify-center items-center space-y-2">
                <Skeleton width="40%" height={20} />
                <Skeleton width="60%" height={20} />
                <Skeleton width="50%" height={20} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center">
          <Skeleton variant="rectangular" width="25%" height={40} />
        </div>
      </div>
    </div>
  );
};

export default HistorySkeleton;
