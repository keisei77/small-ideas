import React, { useCallback } from 'react';
import styles from './overseas.module.css';
let bizCharts;
let DataSet;
if (process.browser) {
  bizCharts = require('bizcharts');
  DataSet = require('@antv/data-set');
}
interface DataType {
  name: string;
  confirm: number;
}

interface OverseasProps {
  data: DataType[];
}

interface GlobalTotal {
  nowConfirm: number;
  confirm: number;
  heal: number;
  dead: number;
  nowConfirmAdd: number;
  confirmAdd: number;
  healAdd: number;
  deadAdd: number;
}

interface OverseasOverview {
  globalTotal: GlobalTotal;
}

const DataInfoMapping = [
  {
    key: 'nowConfirm',
    label: '现存确诊',
    color: 'rgb(247, 76, 49)',
    supColor: 'rgb(247, 76, 49)',
  },
  {
    key: 'confirm',
    label: '累计确诊',
    color: 'rgb(247, 130, 7)',
    supColor: 'rgb(247, 130, 7)',
  },
  {
    key: 'heal',
    label: '累计治愈',
    color: 'rgb(40, 183, 163)',
    supColor: 'rgb(40, 183, 163)',
  },
  {
    key: 'dead',
    label: '累计死亡',
    color: 'rgb(93, 112, 146)',
    supColor: 'rgb(93, 112, 146)',
  },
];

export const OverseasOverview = (props: OverseasOverview) => {
  const { globalTotal } = props;
  return (
    <div className={styles.dataInfo}>
      <span className={styles.title}>全球数据:</span>
      <ul className={styles.ulStyle}>
        {DataInfoMapping.map((info) => (
          <li key={info.key} className={styles.liStyle}>
            <div className={styles.compare}>
              <b>
                较昨日
                <em className={styles.emStyle} style={{ color: info.supColor }}>
                  {globalTotal[info.key + 'Add'] > 0 ? '+' : ''}
                  {globalTotal[info.key + 'Add']}
                </em>
              </b>
            </div>
            <strong
              className={styles.strongStyle}
              style={{ color: info.color }}
            >
              {globalTotal[info.key]}
            </strong>
            <span className={styles.spanStyle}>{info.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Overseas = (props: OverseasProps) => {
  const { data: countries } = props;
  const getTotalConfirmedCountries = countries
    .sort((a, b) => {
      if (a.confirm - b.confirm > 0) {
        return 1;
      }
      if (a.confirm - b.confirm === 0) {
        return 0;
      }
      return -1;
    })
    .slice(-10);

  if (!process.browser) {
    return null;
  }

  const { Chart, Geom, Axis, Tooltip, Coord, Legend } = bizCharts;
  const { DataView } = DataSet;

  const dv = new DataView();
  dv.source(getTotalConfirmedCountries)
    .transform({
      type: 'map',
      callback(row) {
        row['dead'] *= -1;
        row['heal'] *= -1;
        return row;
      },
    })
    .transform({
      type: 'fold',
      fields: ['dead', 'heal', 'confirm'],
      key: 'opinion',
      value: 'value',
    })
    .transform({
      type: 'sort',
      callback(a, b) {
        return a.confirm - b.confirm;
      },
    });
  const colorMap = {
    dead: '#5d7092',
    heal: '#28b7a3',
    confirm: '#f74c31',
  };

  const labelMapping = {
    dead: '累计死亡',
    heal: '累计治愈',
    confirm: '累计确诊',
  };

  const getTooltipContent = useCallback((title, items) => {
    const liContent = items
      .map((item, index) => {
        return `<li style="margin: 0px 0px 4px; list-style-type: none; padding: 0px;" data-index={${index}}>
      <span style="background-color:${
        item.color
      };width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
      ${
        labelMapping[item.name]
      }<span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">${
          item.value
        }</span>
      </li>`;
      })
      .join('');
    return `<div class="g2-tooltip" style="position: absolute;z-index: 8;transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;background-color: rgba(255, 255, 255, 0.9);box-shadow: rgb(174, 174, 174) 0px 0px 10px;border-radius: 3px;color: rgb(87, 87, 87);font-size: 12px;line-height: 20px;padding: 10px 10px 6px;">
              <div class="g2-tooltip-title" style="margin-bottom: 4px;">${title}</div>
              <ul style="margin: 0px; list-style-type: none; padding: 0px;">${liContent}</ul>
            </div>`;
  }, []);

  return (
    <div className="">
      国外累计确诊：
      <Chart padding="auto" data={dv} forceFit>
        <Axis name="name" title={null} labelOffset={10} />
        <Axis
          name="value"
          title={null}
          tickLine={null}
          position="right"
          formatter={function (val) {
            return val + '%';
          }}
        />
        <Coord transpose />
        <Tooltip useHtml htmlContent={getTooltipContent} />
        <Legend
          itemFormatter={(val) => {
            return labelMapping[val];
          }}
        />
        <Geom
          type="intervalStack"
          position="name*value"
          color={[
            'opinion',
            function (opinion) {
              return colorMap[opinion];
            },
          ]}
          shape="smooth"
          opacity={0.8}
        />
      </Chart>
    </div>
  );
};

export default Overseas;
