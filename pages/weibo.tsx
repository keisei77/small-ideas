import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import Loading from '../components/Loading';
import ChevronRight from '../components/ChevronRight';
import ChevronDown from '../components/ChevronDown';

const { publicRuntimeConfig } = getConfig();
const Weibo = (props) => {
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
        (prevExpand) => (
          (prevExpand[topicIndex] = !prevExpand[topicIndex]), [...prevExpand]
        )
      );
    },
    [fullData]
  );

  const loadWeiboDetail = useCallback(async (link, index) => {
    setLoading(
      (prevLoading) => ((prevLoading[index] = true), [...prevLoading])
    );
    const weiboDetailData = await fetch(
      `${publicRuntimeConfig.baseAPI}/weibo-detail?link=${encodeURIComponent(
        link
      )}`
    );
    const weiboDetail = await weiboDetailData.json();
    setLoading(
      (prevLoading) => ((prevLoading[index] = false), [...prevLoading])
    );

    ReactDOM.unstable_batchedUpdates(() => {
      setFullData((prevData) =>
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
    <ol className="bg-gray-100 inline-block px-8 w-full">
      {fullData.map((topic, topicIndex) => (
        <li className="my-4" key={topic.title}>
          <a
            onClick={() => updateTopicsExpand(topic.link, topicIndex)}
            className="cursor-pointer text-xl text-indigo-500 flex items-center justify-between"
          >
            <span>{topic.title}</span>
            {topicsExpand[topicIndex] ? <ChevronDown /> : <ChevronRight />}
          </a>
          {loading[topicIndex] ? (
            <Loading />
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
                        className="mt-2 rounded-sm border bg-white p-4 text-purple-900 text-sm"
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
