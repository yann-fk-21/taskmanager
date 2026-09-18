import React from 'react';

const Skeleton = () => {
  return (
    <React.Fragment>
      <div className="w-full rounded-xl bg-white p-2 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-5 w-5 rounded-full bg-gray-200"></div>
          <div className="h-4 w-28 rounded bg-gray-200"></div>
        </div>

        <div className="mt-3 rounded-xl bg-gray-100 p-3">
          <div className="h-6 w-2/5 rounded bg-gray-200"></div>
          <div className="mt-3 h-4 w-full rounded bg-gray-200"></div>
          <div className="mt-2 h-4 w-4/5 rounded bg-gray-200"></div>
        </div>

        <div className="flex items-center justify-end gap-2 px-3 py-2">
          <div className="h-5 w-5 rounded bg-gray-200"></div>
          <div className="h-5 w-5 rounded bg-gray-200"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Skeleton;
