import React from 'react';

const spinner = () => {
  return (
    <div className="preloader loaded-success fixed top-0 inset-0 bg-white bg-opacity-40 z-50">
      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2">
        <div className="relative mx-auto my-12">
          <div className="inline-block">
            <span className="relative flex h-10 w-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-10 w-10 bg-blue-800" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default spinner;
