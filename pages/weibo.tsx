import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-unfetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { pseudoRandomBytes } from 'crypto';

const Weibo = props => {
  const data = props.data;
  const [fullData, setFullData] = useState(data);
  const [topicsExpand, setTopicsExpand] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const updateTopicsExpand = useCallback(async (expanded, link, topicIndex) => {
    if (!expanded) {
      await loadWeiboDetail(link, topicIndex);
    }
    setTopicsExpand(
      prevExpand => (
        (prevExpand[topicIndex] = !prevExpand[topicIndex]), [...prevExpand]
      )
    );
  }, []);

  const loadWeiboDetail = useCallback(async (link, index) => {
    setLoading(true);
    const weiboDetailData = await fetch(
      `https://micro-backend.herokuapp.com/api/weibo-detail?link=${link}`
    );
    const weiboDetail = await weiboDetailData.json();
    setLoading(false);

    ReactDOM.unstable_batchedUpdates(() => {
      setFullData(prevData =>
        prevData.map((data, idx) => {
          if (idx === index) {
            return { ...data, ...weiboDetail };
          } else {
            return data;
          }
        })
      );
    });
  }, []);

  return (
    <ol className="px-8">
      {fullData.map((topic, topicIndex) => (
        <li className="my-4" key={topic.title}>
          <div className="text-xl text-indigo-500">{topic.title}</div>
          {loading ? (
            <span>加载中...</span>
          ) : (
            <>
              {topic.lead ? (
                <div className="pt-1 text-xs text-gray-500">{topic.lead}</div>
              ) : null}
              {topic.feedContent && topic.feedContent.length ? (
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
                  </>
                ) : (
                  <span>收起</span>
                )
              ) : null}
            </>
          )}

          {topicsExpand[topicIndex] ? (
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
                onClick={() =>
                  updateTopicsExpand(
                    topicsExpand[topicIndex],
                    topic.link,
                    topicIndex
                  )
                }
              >
                收起
              </a>
            </>
          ) : (
            <a
              className="cursor-pointer"
              onClick={() =>
                updateTopicsExpand(
                  topicsExpand[topicIndex],
                  topic.link,
                  topicIndex
                )
              }
            >
              展开
            </a>
          )}
        </li>
      ))}
    </ol>
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
