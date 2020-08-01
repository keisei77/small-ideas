import React from 'react';
import getConfig from 'next/config';
import ImageView from './ImageView';
interface FeedMedia {
  userInfo: { avatar: string; nickname: string };
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
  const { userInfo } = feed;
  return (
    <div className="mt-2 rounded-sm border bg-white p-4 text-purple-900 text-sm">
      <div className="flex items-center mb-3">
        <img src={userInfo.avatar} className="rounded-full w-10" />
        <span className="font-bold font-medium ml-3">{userInfo.nickname}</span>
      </div>
      <div>
        {feed.content}
        <div className="flex flex-wrap">
          {(feed.images || []).map(
            ({ thumbSrc, originSrc }) =>
              originSrc && (
                <ImageView
                  thumbImage={`${publicRuntimeConfig.weiboImg}?src=${thumbSrc}&referer=${referer}`}
                  originImage={`${publicRuntimeConfig.weiboLargeImg}?src=${originSrc}`}
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
    </div>
  );
};

export default WeiboCard;
