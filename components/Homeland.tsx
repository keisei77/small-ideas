import React from 'react';
import classNames from 'classnames';
import styles from './homeland.module.css';
import Flipper from './Flipper';
let bizCharts;
if (process.browser) {
  bizCharts = require('bizcharts');
}
interface TodayDataType {
  confirm: number;
  confirmCuts?: number;
  isUpdated: boolean;
}

interface TotalDataType {
  confirm: number;
  dead: number;
  deadRate: string;
  heal: number;
  healRate: string;
  showHeal: boolean;
  showRate: boolean;
  suspect: number;
}

interface AreaData {
  name: string;
  today: TodayDataType;
  total: TotalDataType;
  children: {
    name: string;
    today: TodayDataType;
    total: TotalDataType;
    children: {
      name: string;
      today: TodayDataType;
      total: TotalDataType;
    }[];
  }[];
}

interface ChinaAdd {
  confirm: number;
  heal: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  nowSevere: number;
  importedCase: number;
}

interface ChinaTotal {
  confirm: number;
  heal: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  nowSevere: number;
  importedCase: number;
}

interface DataType {
  areaTree: AreaData[];
  chinaAdd: ChinaAdd;
  chinaTotal: ChinaTotal;
}

interface HomelandProps {
  data: DataType;
}

const DataInfoMapping = [
  {
    key: 'nowConfirm',
    label: '现存确诊',
    color: 'rgb(247, 76, 49)',
    supColor: 'rgb(247, 76, 49)',
  },
  {
    key: 'importedCase',
    label: '境外输入',
    color: 'rgb(247, 130, 7)',
    supColor: 'rgb(247, 130, 7)',
  },
  {
    key: 'nowSevere',
    label: '现存重症',
    color: 'rgb(162, 90, 78)',
    supColor: 'rgb(162, 90, 78)',
  },
  {
    key: 'confirm',
    label: '累计确诊',
    color: 'rgb(174, 33, 44)',
    supColor: 'rgb(174, 33, 44)',
  },
  {
    key: 'dead',
    label: '累计死亡',
    color: 'rgb(93, 112, 146)',
    supColor: 'rgb(93, 112, 146)',
  },
  {
    key: 'heal',
    label: '累计治愈',
    color: 'rgb(40, 183, 163)',
    supColor: 'rgb(40, 183, 163)',
  },
];

interface HomelandOverview {
  chinaAdd: ChinaAdd;
  chinaTotal: ChinaTotal;
}

export const HomelandOverview = (props: HomelandOverview) => {
  const { chinaAdd, chinaTotal } = props;
  return (
    <div className={styles.dataInfo}>
      <span className={styles.title}>国内数据：</span>
      <ul className={styles.ulStyle}>
        {DataInfoMapping.map((info) => (
          <li key={info.key} className={styles.liStyle}>
            <div className={styles.compare}>
              <b>
                较昨日
                <em className={styles.emStyle} style={{ color: info.supColor }}>
                  {chinaAdd[info.key] > 0 ? '+' : ''}
                  {chinaAdd[info.key]}
                </em>
              </b>
            </div>
            <strong
              className={styles.strongStyle}
              style={{ color: info.color }}
            >
              {chinaTotal[info.key]}
            </strong>
            <span className={styles.spanStyle}>{info.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Homeland = (props: HomelandProps) => {
  const { data } = props;
  const { areaTree, chinaAdd, chinaTotal } = data;
  const areaData = areaTree.find((area) => area.name === '中国');
  const { today, total, children: provinces } = areaData;
  const getTopConfirmedProvinces = provinces
    .filter(
      (province) => province.today.isUpdated && province.today.confirm > 0
    )
    .map((province) => ({
      name: province.name,
      count: province.today.confirm,
    }))
    .sort((a, b) => {
      if (a.count - b.count > 0) {
        return -1;
      }
      if (a.count - b.count === 0) {
        return 0;
      }
      return 1;
    })
    .slice(0, 10);
  if (!process.browser) {
    return null;
  }

  const { Chart, Coord, Tooltip, Legend, Geom, Label } = bizCharts;

  return (
    <div className="homeland">
      国内新增确诊：
      <Chart
        height={320}
        data={getTopConfirmedProvinces}
        padding={[80, 100, 80, 80]}
        forceFit
      >
        <Coord type="polar" innerRadius={0.05} />
        <Tooltip />
        <Geom
          type="interval"
          color="name"
          position="name*count"
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
        >
          <Label
            content="percent"
            autoRotate={false}
            formatter={(val, item) => {
              return item.point.name + ': ' + item.point.count;
            }}
          />
        </Geom>
      </Chart>
    </div>
  );
};

export default Homeland;
