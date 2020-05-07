import React from 'react';

const ChevronRight = () => {
  return (
    <>
      <i className="gg-chevron-right"></i>
      <style jsx>{`
        .gg-chevron-right {
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs, 1));
          width: 22px;
          height: 22px;
          border: 2px solid transparent;
          border-radius: 100px;
        }

        .gg-chevron-right::after {
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 10px;
          height: 10px;
          border-bottom: 2px solid;
          border-right: 2px solid;
          transform: rotate(-45deg);
          right: 6px;
          top: 4px;
        }
      `}</style>
    </>
  );
};

export default ChevronRight;