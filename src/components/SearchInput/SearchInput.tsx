import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSearchValue } from '../../services/selectors/filtersSelectors';
import { filtersActions } from '../../services/slices/filterSlice';
import { fetchFilter } from '../../services/thunks/fetchFilter';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';
import s from './SearchInput.module.css';

const { Search } = Input;

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (value) {
      dispatch(filtersActions.setSearchValue(value));
      dispatch(fetchFilter({ product: value }));
    }

    if (info?.source === 'clear') {
      dispatch(filtersActions.clearFilters());
      dispatch(fetchProductsIds(null));
    }
  };

  return (
    <Search
      placeholder="Введите название продукта"
      allowClear
      value={searchValue}
      className={s.input}
      width={300}
      onSearch={onSearch}
      enterButton
    />
  );
};

export default SearchInput;
