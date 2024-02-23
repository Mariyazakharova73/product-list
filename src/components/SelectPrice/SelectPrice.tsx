// import s from './SelectPrice.module.css';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
const { Search } = Input;

const SelectPrice = () => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <Search placeholder="Цена" allowClear onSearch={onSearch} style={{ width: 150 }} />
  );
};

export default SelectPrice;
