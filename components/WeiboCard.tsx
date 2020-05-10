import React from 'react';
import getConfig from 'next/config';
import ImageView from './ImageView';
interface FeedMedia {
  content: string;
  images?: { thumbSrc: string; originSrc: string }[];
  video?: string;
}

interface WeiboCard {
  feed: FeedMedia;
  referer: string;
}
const { publicRuntimeConfig } = getConfig();
const WeiboCard = (props: WeiboCard) => {
  const { feed, referer } = props;
  return (
    <div className="mt-2 rounded-sm border bg-white p-4 text-purple-900 text-sm">
      {feed.content}
      <div className="flex flex-wrap justify-around">
        {(feed.images || []).map(
          ({ thumbSrc, originSrc }) =>
            originSrc && (
              <ImageView
                thumbImage={`${publicRuntimeConfig.weiboImg}?src=${thumbSrc}&referer=${referer}`}
                originImage={`${publicRuntimeConfig.weiboImg}?src=${originSrc}&referer=${referer}`}
                alternateInfo={feed.content}
              />
            )
        )}
      </div>
      {feed.video && (
        <video controls>
          <source
            src={`${publicRuntimeConfig.weiboImg}?src=${feed.video}&referer=${referer}`}
            type="video/mp4"
          ></source>
        </video>
      )}
    </div>
  );
};

export default WeiboCard;
