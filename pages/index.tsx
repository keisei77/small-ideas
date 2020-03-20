import React, { useEffect, useState, useMemo } from 'react';

import Link from 'next/link';
import Head from '../components/head';
import Homeland, { HomelandOverview } from '../components/homeland';
import Overseas, { OverseasOverview } from '../components/overseas';
import { initGA, logPageView } from '../components/googleAnalytics';
import fetch from 'isomorphic-unfetch';
import Flipper from '../components/flipper';

const Home = props => {
  const NCPInfo = props.data;
  const lastUpdateTime = NCPInfo[0].lastUpdateTime;
  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      initGA();
      (window as any).GA_INITIALIZED = true;
    }
    logPageView();
  }, []);
  const homeData = useMemo(() => NCPInfo[0], []);
  const overseasData = useMemo(
    () =>
      NCPInfo[1].foreignList.map(country => {
        return {
          name: country.name,
          total: country.confirm
        };
      }),
    []
  );

  return (
    <div className="p-4">
      <Head title="每日数据汇总" />
      <div className="hero">
        <h1 className="title">每日数据汇总</h1>
        <div>最新更新时间：{lastUpdateTime}</div>
        <Flipper
          sceneStyle={{
            height: 200,
            margin: '12px 0'
          }}
          frontNode={
            <HomelandOverview
              chinaAdd={homeData.chinaAdd}
              chinaTotal={homeData.chinaTotal}
            />
          }
          backNode={<OverseasOverview globalTotal={NCPInfo[1].globalStatis} />}
        />

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
  const data = [];
  const allData = await Promise.all([
    fetch('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5'),
    fetch('https://view.inews.qq.com/g2/getOnsInfo?name=disease_other')
  ]);
  for (let index = 0; index < allData.length; index++) {
    const res = await allData[index].json();
    data.push(JSON.parse(res.data));
  }
  return {
    data
  };
};

export default Home;
