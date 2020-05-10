import React from 'react';
import classNames from 'classnames';

interface Popup {
  isShow: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Popup = React.memo(function Popup(props: Popup) {
  const { isShow, onClose, content } = props;
  return (
    <div
      onClick={onClose}
      className={classNames(
        isShow ? 'block' : 'hidden',
        'bg-black block fixed inset-0 z-10 bg-opacity-75 flex items-center justify-center'
      )}
    >
      {content}
    </div>
  );
});

export default Popup;
