import s from './SelectBrand.module.css';

import { Select } from 'antd';

const options = [
  {
    value: '1',
    label: 'Not Identified',
  },
  {
    value: '2',
    label: 'Closed',
  },
  {
    value: '3',
    label: 'Communicated',
  },
  {
    value: '4',
    label: 'Identified',
  },
  {
    value: '5',
    label: 'Resolved',
  },
  {
    value: '6',
    label: 'Cancelled',
  },
];

const SelectBrand = () => {
  return (
    <Select
      className={s.select}
      showSearch
      allowClear
      style={{ width: 150 }}
      // loading
      placeholder="Бренд"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
    />
  );
};

export default SelectBrand;
