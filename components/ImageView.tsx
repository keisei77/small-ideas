import React, { useState, useCallback } from 'react';
import Popup from './Popup';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

export interface ImageSource {
  thumbSrc: string;
  originSrc: string;
}

interface ImageView {
  currentImg: string;
  images: ImageSource[];
  alternateInfo: string;
  initialSlide: number;
}

const ImageView = React.memo(function ImageView(props: ImageView) {
  const { currentImg, initialSlide, images, alternateInfo } = props;
  const [isShow, setIsShow] = useState(false);
  const onClose = useCallback(() => {
    setIsShow((isShow) => !isShow);
  }, []);
  return (
    <span className="m-2">
      <img
        className="h-20 w-20 object-cover"
        src={currentImg}
        onClick={onClose}
      />
      {isShow ? (
        <Popup
          isShow={isShow}
          onClose={onClose}
          content={
            <Swiper initialSlide={initialSlide}>
              {images.map(({ thumbSrc, originSrc }) => {
                return (
                  <SwiperSlide key={thumbSrc}>
                    <img
                      className="w-full"
                      onError={(ev) => {
                        (ev.target as any).src = thumbSrc;
                      }}
                      src={originSrc}
                      alt={alternateInfo}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          }
        />
      ) : null}
    </span>
  );
});

export default ImageView;
