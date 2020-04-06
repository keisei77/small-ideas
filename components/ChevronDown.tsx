import React from 'react';

const ChevronDown = () => {
  return (
    <>
      <i className="gg-chevron-down"></i>
      <style jsx>{`
        .gg-chevron-down {
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs, 1));
          width: 22px;
          height: 22px;
          border: 2px solid transparent;
          border-radius: 100px;
        }

        .gg-chevron-down::after {
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 10px;
          height: 10px;
          border-bottom: 2px solid;
          border-right: 2px solid;
          transform: rotate(45deg);
          left: 4px;
          top: 2px;
        }
      `}</style>
    </>
  );
};

export default ChevronDown;
