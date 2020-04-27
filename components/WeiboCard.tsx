import React from 'react';
import getConfig from 'next/config';
interface FeedMedia {
  content: string;
  images?: string[];
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
        (src) =>
          src && (
            <img
              src={`${publicRuntimeConfig.weiboImg}?src=${src}&referer=${referer}`}
              alt="media image"
            />
          )
      )}
    </p>
  );
};

export default WeiboCard;
