import React, { useMemo } from 'react';
import Homeland, { HomelandOverview } from '../components/Homeland';
import Overseas, { OverseasOverview } from '../components/Overseas';
import fetch from 'isomorphic-unfetch';
import Flipper from '../components/Flipper';

const Ncov = (props) => {
  const NCPInfo = props.data;
  const lastUpdateTime = NCPInfo[0].lastUpdateTime;

  const homeData = useMemo(() => NCPInfo[0], []);
  const overseasData = useMemo(() => NCPInfo[2], []);

  return (
    <div className="pt-4 px-4 hero">
      <h1 className="title">每日数据汇总</h1>
      <div>最新更新时间：{lastUpdateTime}</div>
      <Flipper
        sceneStyle={{
          height: 200,
          margin: '12px 0',
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
  );
};

export async function getServerSideProps() {
  const data = [];
  const allData = await Promise.all([
    fetch('https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5'),
    fetch('https://view.inews.qq.com/g2/getOnsInfo?name=disease_foreign'),
    fetch(
      'https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist'
    ),
  ]);
  for (let index = 0; index < allData.length; index++) {
    const res = await allData[index].json();
    if (typeof res.data === 'string') {
      data.push(JSON.parse(res.data));
    } else {
      data.push(res.data);
    }
  }
  return { props: { data } };
}

export default Ncov;
