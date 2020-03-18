import React from 'react';
import classNames from 'classnames';

interface DataType {
  name: string;
  total: number;
}

interface OverseasProps {
  data: DataType[];
}

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
