import React from 'react';
import classNames from 'classnames';
import styles from './overseas.module.css';

interface DataType {
  name: string;
  total: number;
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
    supColor: 'rgb(247, 76, 49)'
  },
  {
    key: 'confirm',
    label: '累计确诊',
    color: 'rgb(247, 130, 7)',
    supColor: 'rgb(247, 130, 7)'
  },
  {
    key: 'heal',
    label: '累计治愈',
    color: 'rgb(40, 183, 163)',
    supColor: 'rgb(40, 183, 163)'
  },
  {
    key: 'dead',
    label: '累计死亡',
    color: 'rgb(93, 112, 146)',
    supColor: 'rgb(93, 112, 146)'
  }
];

export const OverseasOverview = (props: OverseasOverview) => {
  const { globalTotal } = props;
  return (
    <div className={styles.dataInfo}>
      <span className={styles.title}>全球数据:</span>
      <ul className={styles.ulStyle}>
        {DataInfoMapping.map(info => (
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
  const getTotalConfirmedCountries = countries.sort((a, b) => {
    if (a.total - b.total > 0) {
      return -1;
    }
    if (a.total - b.total === 0) {
      return 0;
    }
    return 1;
  });

  return (
    <div className="">
      国外累计确诊排行：
      {getTotalConfirmedCountries.map((country, index) => (
        <div
          className={classNames('border-t border-l border-r border-gray-600', {
            'border-b': index === getTotalConfirmedCountries.length - 1
          })}
          key={country.name}
        >
          <div className="flex justify-between">
            <span className="font-medium">{country.name}</span>
            <span>{country.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overseas;