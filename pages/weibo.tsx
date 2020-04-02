import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const Weibo = props => {
  const data = props.data;
  const [fullData, setFullData] = useState(data);
  const [topicsExpand, setTopicsExpand] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [loading, setLoading] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const updateTopicsExpand = useCallback(
    async (link, topicIndex) => {
      if (!fullData[topicIndex].feedContent) {
        await loadWeiboDetail(link, topicIndex);
      }
      setTopicsExpand(
        prevExpand => (
          (prevExpand[topicIndex] = !prevExpand[topicIndex]), [...prevExpand]
        )
      );
    },
    [fullData]
  );

  const loadWeiboDetail = useCallback(async (link, index) => {
    setLoading(prevLoading => ((prevLoading[index] = true), [...prevLoading]));
    const weiboDetailData = await fetch(
      `${publicRuntimeConfig.baseAPI}/weibo-detail?link=${encodeURIComponent(
        link
      )}`
    );
    const weiboDetail = await weiboDetailData.json();
    setLoading(prevLoading => ((prevLoading[index] = false), [...prevLoading]));

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
          {loading[topicIndex] ? (
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
                ) : null
              ) : null}
            </>
          )}

          {topicsExpand[topicIndex] ? (
            <>
              {topic.feedContent &&
                topic.feedContent.map((feed, index) => (
                  <p
                    className="odd:bg-yellow-100 even:bg-white pt-1 text-sm text-purple-900"
                    key={index}
                  >
                    {feed}
                  </p>
                ))}
              <a
                className="cursor-pointer"
                onClick={() => updateTopicsExpand(topic.link, topicIndex)}
              >
                收起
              </a>
            </>
          ) : (
            <a
              className="cursor-pointer"
              onClick={() => updateTopicsExpand(topic.link, topicIndex)}
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
