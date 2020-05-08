import React from 'react';
import getConfig from 'next/config';
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
    <p className="mt-2 rounded-sm border bg-white p-4 text-purple-900 text-sm">
      {feed.content}
      {(feed.images || []).map(
        ({ thumbSrc, originSrc }) =>
          originSrc && (
            <img
              onError={(ev) => {
                (ev.target as any).src = thumbSrc;
              }}
              src={`${publicRuntimeConfig.weiboImg}?src=${originSrc}&referer=${referer}`}
              alt={feed.content}
            />
          )
      )}
      {feed.video && (
        <video controls>
          <source
            src={`${publicRuntimeConfig.weiboImg}?src=${feed.video}&referer=${referer}`}
            type="video/mp4"
          ></source>
        </video>
      )}
    </p>
  );
};

export default WeiboCard;
