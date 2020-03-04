import React from 'react';
import classNames from 'classnames';

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
    <div className="w-64">
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
          <div className="flex justify-between">
            {country.newIncreaseUpdated && `今日新增：${country.newIncrease}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overseas;
