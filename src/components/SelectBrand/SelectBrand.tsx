import { useMemo } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { filteredBrands } from '../../services/selectors/filtersSelectors';
import s from './SelectBrand.module.css';

import { Select, Spin } from 'antd';

export interface Option {
  label: string;
  value: string;
}

const SelectBrand = () => {
  const brands = useAppSelector(filteredBrands);

  const options = useMemo(() => {
    return brands?.map(item => {
      return { value: item, label: item };
    });
  }, [brands]);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const filterOption = (input: string, option?: Option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return options?.length !== 0 ? (
    <Select
      className={s.select}
      showSearch
      allowClear
      style={{ width: 150 }}
      // loading
      placeholder="Бренд"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={options as Option[]}
    />
  ) : (
    <Spin />
  );
};

export default SelectBrand;
