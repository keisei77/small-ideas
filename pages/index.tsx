import React, { useEffect, useState, useMemo } from 'react';

import Link from 'next/link';
import Head from '../components/head';
import Homeland from '../components/homeland';
import Overseas from '../components/overseas';

import fetch from 'isomorphic-unfetch';

const Home = props => {
  const data = JSON.parse(props.NCPInfo.data);
  console.log(data);
  const homeData = useMemo(
    () => data.areaTree.find(area => area.name === '中国'),
    []
  );
  const overseasData = useMemo(
    () => data.areaTree.filter(area => area.name !== '中国'),
    []
  );

  return (
    <div>
      <Head title="每日数据汇总" />
      <div className="hero">
        <h1 className="title">每日数据汇总</h1>
        <div>最新更新时间：{data.lastUpdateTime}</div>
        <Homeland data={homeData} />
        <Overseas data={overseasData} />
      </div>
      <style jsx>{`
        * {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch(
    'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5'
  );
  const data = await res.json();
  return {
    NCPInfo: data
  };
};

export default Home;
