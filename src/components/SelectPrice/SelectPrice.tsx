import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useAppDispatch } from '../../hooks/hooks';
import { filtersActions } from '../../services/slices/filterSlice';
import s from './SelectPrice.module.css';
const { Search } = Input;

const SelectPrice = () => {
  const dispatch = useAppDispatch();

  const onSearch: SearchProps['onSearch'] = value => {
    console.log(typeof value);
    dispatch(filtersActions.setPrice(value));
    // dispatch(fetchFilter({ price: Number(value) }));
  };

  return <Search placeholder="Цена" allowClear onSearch={onSearch} className={s.price} />;
};

export default SelectPrice;
