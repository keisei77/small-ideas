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
  name: string;
  today: TodayDataType;
  total: TotalDataType;
}

interface OverseasProps {
  data: DataType[];
}

const Overseas = (props: OverseasProps) => {
  const { data: countries } = props;
  const getTotalConfirmedCountries = countries
    .map(country => ({
      name: country.name,
      newIncrease: country.today.confirm,
      newIncreaseUpdated: country.today.isUpdated,
      total: country.total.confirm
    }))
    .sort((a, b) => {
      if (a.total - b.total > 0) {
        return -1;
      }
      if (a.total - b.total === 0) {
        return 0;
      }
      return 1;
    });

  return (
    <div>
      国外累计确诊排行：
      {getTotalConfirmedCountries.map(country => (
        <div key={country.name}>
          {country.name}:{country.total}
          {country.newIncreaseUpdated && `今日新增：${country.newIncrease}`}
        </div>
      ))}
    </div>
  );
};

export default Overseas;
