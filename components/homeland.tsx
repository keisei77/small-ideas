import React from 'react';

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

interface DataType {
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

interface HomelandProps {
  data: DataType;
}

const Homeland = (props: HomelandProps) => {
  const { data } = props;
  const { today, total, children: provinces } = data;
  const getTopConfirmedProvinces = provinces
    .filter(province => province.today.isUpdated && province.today.confirm > 0)
    .map(province => ({
      name: province.name,
      count: province.today.confirm
    }))
    .sort((a, b) => {
      if (a.count - b.count > 0) {
        return -1;
      }
      if (a.count - b.count === 0) {
        return 0;
      }
      return 1;
    });

  return (
    <div>
      国内新增确诊排行：
      {getTopConfirmedProvinces.map(province => (
        <div key={province.name}>
          {province.name}:{province.count}
        </div>
      ))}
    </div>
  );
};

export default Homeland;
