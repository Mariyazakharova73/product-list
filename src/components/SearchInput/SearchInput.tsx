import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import s from './SearchInput.module.css';

const { Search } = Input;

const SearchInput = () => {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  return (
    <Search
      placeholder="Введите название продукта"
      allowClear
      // loading
      className={s.input}
      width={300}
      onSearch={onSearch}
      enterButton
    />
  );
};

export default SearchInput;
