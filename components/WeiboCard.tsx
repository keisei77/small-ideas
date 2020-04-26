import React from 'react';

interface FeedMedia {
  content: string;
  images?: string[];
}

interface WeiboCard {
  feed: FeedMedia;
}

const WeiboCard = (props: WeiboCard) => {
  const { feed } = props;
  console.log(feed);
  return (
    <p className="mt-2 rounded-sm border bg-white p-4 text-purple-900 text-sm">
      {feed.content}
      {(feed.images || []).map(
        (src) => src && <img src={src} alt="media image" />
      )}
    </p>
  );
};

export default WeiboCard;
