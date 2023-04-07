import React from 'react'

const spinner = () => {
  return (
<div className="preloader loaded-success fixed inset-0 ">
  <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2">
    <div className="relative mx-auto my-12">
    <div className="inline-block">
  <span className="relative flex h-5 w-5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500" />
  </span>
</div>
    </div>
  </div>
</div>
  )
}

export default spinner