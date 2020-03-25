import React, { useState, useCallback } from 'react';
import fetch from 'isomorphic-unfetch';
import InfiniteScroller from '../components/InfiniteScroller';

const Weibo = props => {
  const data = props.data;

  const [topicsExpand, setTopicsExpand] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const updateTopicsExpand = useCallback(topicIndex => {
    setTopicsExpand(
      prevExpand => (
        (prevExpand[topicIndex] = !prevExpand[topicIndex]), [...prevExpand]
      )
    );
  }, []);

  return (
    <InfiniteScroller>
      <ol className="px-8">
        {data.map((topic, topicIndex) => (
          <li className="my-4" key={topic.title}>
            <div className="text-xl text-indigo-500">{topic.title}</div>
            {topic.lead ? (
              <div className="pt-1 text-xs text-gray-500">{topic.lead}</div>
            ) : null}
            {topic.feedContent.length ? (
              topicsExpand[topicIndex] ? (
                <>
                  {topic.feedContent.map((feed, index) => (
                    <p
                      className="odd:bg-yellow-100 even:bg-white pt-1 text-sm text-purple-900"
                      key={index}
                    >
                      {feed}
                    </p>
                  ))}
                  <a
                    className="cursor-pointer"
                    onClick={() => updateTopicsExpand(topicIndex)}
                  >
                    收起
                  </a>
                </>
              ) : (
                <a
                  className="cursor-pointer"
                  onClick={() => updateTopicsExpand(topicIndex)}
                >
                  展开
                </a>
              )
            ) : null}
          </li>
        ))}
      </ol>
    </InfiniteScroller>
  );
};

export async function getServerSideProps() {
  const weiboDataResponse = await fetch(
    'https://micro-backend.herokuapp.com/api/weibo'
  );

  const weiboData = await weiboDataResponse.json();

  return { props: { data: weiboData } };
}

export default Weibo;
