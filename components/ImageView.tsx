import React, { useState, useCallback } from 'react';
import Popup from './Popup';

interface ImageView {
  thumbImage: string;
  originImage: string;
  alternateInfo: string;
}

const ImageView = React.memo(function ImageView(props: ImageView) {
  const { thumbImage, originImage, alternateInfo } = props;
  const [isShow, setIsShow] = useState(false);
  const onClose = useCallback(() => {
    setIsShow((isShow) => !isShow);
  }, []);
  return (
    <span className="m-2">
      <img
        className="h-24 w-24 object-cover"
        src={thumbImage}
        onClick={onClose}
      />
      <Popup
        isShow={isShow}
        onClose={onClose}
        content={
          <img
            onError={(ev) => {
              (ev.target as any).src = thumbImage;
            }}
            src={originImage}
            alt={alternateInfo}
          />
        }
      />
    </span>
  );
});

export default ImageView;
