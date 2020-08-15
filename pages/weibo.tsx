import React, { useState, useCallback, useReducer } from 'react';
import { Input, Modal } from 'antd';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import Loading from '../components/Loading';
import ChevronRight from '../components/ChevronRight';
import ChevronDown from '../components/ChevronDown';
import WeiboTopic, { TopicInfo } from '../components/WeiboTopic';
const { Search } = Input;
const { publicRuntimeConfig } = getConfig();

interface SearchInfo {
  value: string;
  isShowSearch: boolean;
  data: TopicInfo;
}

interface ActionType {
  type: 'toggleSearchModal' | 'searchValue' | 'feed';
  payload?: Partial<SearchInfo>;
}

const reducer = (state: SearchInfo, action: ActionType) => {
  switch (action.type) {
    case 'toggleSearchModal':
      return { ...state, isShowSearch: !state.isShowSearch };
    case 'searchValue':
      return { ...state, value: action.payload.value };
    case 'feed':
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};

const initialSearchInfo: SearchInfo = {
  value: '',
  isShowSearch: false,
  data: null,
};

const Weibo = React.memo(function Weibo(props: any) {
  const data = props.data;
  const [fullData, setFullData] = useState(data);
  const [topicsExpand, setTopicsExpand] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [loading, setLoading] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const [searchInfo, dispatch] = useReducer(reducer, initialSearchInfo);

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

  const onSearch = useCallback(async (value: string) => {
    if (!value) {
      return;
    }

    const weiboDetailData = await fetch(
      `${publicRuntimeConfig.baseAPI}/weibo-detail?link=${encodeURIComponent(
        `https://s.weibo.com/weibo?q=${encodeURIComponent(value)}`
      )}`
    );
    const weiboDetail = await weiboDetailData.json();

    dispatch({ type: 'toggleSearchModal' });
    dispatch({ type: 'searchValue', payload: { value } });
    dispatch({
      type: 'feed',
      payload: {
        data: {
          ...weiboDetail,
          link: `https://s.weibo.com/weibo?q=${encodeURIComponent(value)}`,
        },
      },
    });
  }, []);

  const onRequestCancel = useCallback(() => {
    dispatch({ type: 'toggleSearchModal' });
  }, []);

  return (
    <>
      <Search
        placeholder="输入关键词"
        size="large"
        allowClear
        enterButton
        onSearch={onSearch}
      />

      <Modal
        title={`搜索：${searchInfo.value}`}
        visible={searchInfo.isShowSearch}
        onCancel={onRequestCancel}
        footer={null}
      >
        <WeiboTopic topic={searchInfo.data} />
      </Modal>

      <ol className="bg-gray-100 inline-block px-4 w-full">
        {fullData.map((topic, topicIndex) => (
          <li className="my-4" key={topic.title}>
            <a
              onClick={() => updateTopicsExpand(topic.link, topicIndex)}
              className="sticky top-12 bg-gray-100 cursor-pointer text-xl text-indigo-500 flex items-center justify-between"
            >
              <span>{topic.title}</span>
              {topicsExpand[topicIndex] ? <ChevronDown /> : <ChevronRight />}
            </a>
            {loading[topicIndex] ? (
              <Loading />
            ) : (
              <WeiboTopic
                topic={topic}
                contentClassNames={
                  topicsExpand[topicIndex] ? 'block' : 'hidden'
                }
              />
            )}
          </li>
        ))}
      </ol>
    </>
  );
});

export async function getServerSideProps() {
  const weiboDataResponse = await fetch(`${publicRuntimeConfig.baseAPI}/weibo`);

  const weiboData = await weiboDataResponse.json();

  return { props: { data: weiboData } };
}

export default Weibo;
