import React from 'react';

const InfiniteScroller = (props: any) => {
  const { children = null, loadingMore } = props;
  return (
    <>
      <div
        className="sticky text-right top-12 p-2 pr-4 -mb-4"
        onClick={loadingMore}
      >
        下一页
      </div>
      <div>{children}</div>
    </>
  );
};

export default InfiniteScroller;
