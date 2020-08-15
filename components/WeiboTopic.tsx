import React from 'react';
import WeiboCard, { FeedMedia } from './WeiboCard';

export interface TopicInfo {
  lead: string;
  feedContent: FeedMedia[];
  link: string;
}

interface WeiboTopic {
  topic: TopicInfo;
  contentClassNames?: string;
}
const WeiboTopic = React.memo((props: WeiboTopic) => {
  const { topic, contentClassNames = 'block' } = props;
  return topic ? (
    <>
      {topic.lead ? (
        <div className="pt-1 text-xs text-gray-500">{topic.lead}</div>
      ) : null}
      {topic.feedContent && topic.feedContent.length ? (
        <div className={contentClassNames}>
          {topic.feedContent.map((feed, index) => (
            <WeiboCard key={index} referer={topic.link} feed={feed} />
          ))}
        </div>
      ) : null}
    </>
  ) : null;
});

export default WeiboTopic;
