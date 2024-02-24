import { Pagination, PaginationProps, Spin } from 'antd';
import { useEffect } from 'react';
import FiltersWrapper from '../../components/FiltersWrapper/FiltersWrapper';
import ProductsWrapper from '../../components/ProductsWrapper/ProductsWrapper';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectCurrentPage,
  selectPrice,
  selectSearchValue,
} from '../../services/selectors/filtersSelectors';
import {
  filteredAllIds,
  filteredProductsFullInfo,
  selectError,
  selectIsLoading,
  selectIsLoadingPage,
} from '../../services/selectors/productsSelectors';
import { filtersActions } from '../../services/slices/filterSlice';
import { fetchBrands } from '../../services/thunks/fetchBrands';
import { fetchItems } from '../../services/thunks/fetchItems';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';
import s from './MainPage.module.css';

const MainPage = () => {
  const dispatch = useAppDispatch();

  const allIds = useAppSelector(filteredAllIds);
  const products = useAppSelector(filteredProductsFullInfo);
  const isLoading = useAppSelector(selectIsLoading);
  const isLoadingPage = useAppSelector(selectIsLoadingPage);
  const error = useAppSelector(selectError);
  const price = useAppSelector(selectPrice);
  const searchValue = useAppSelector(selectSearchValue);
  const currentPage = useAppSelector(selectCurrentPage);

  console.log(isLoading, 'isLoading');

  useEffect(() => {
    dispatch(fetchProductsIds(null));
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const getIdsforCurrentPage = (currentPage: number) => {
      const startIndex = (currentPage - 1) * 50;
      const endIndex = currentPage * 50 - 1;
      return allIds.slice(startIndex, endIndex);
    };
    const ids = getIdsforCurrentPage(currentPage);
    if (ids.length !== 0) {
      dispatch(fetchItems(ids));
    }
  }, [dispatch, price, currentPage, searchValue, allIds]);

  if (isLoadingPage) {
    return (
      <div className={s.spinContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className={s.container}>{error}</div>;
  }

  const onChangePage: PaginationProps['onChange'] = pageNumber => {
    console.log('Page: ', pageNumber);
    dispatch(filtersActions.setCurrentPage(pageNumber));
  };

  return (
    <main className={s.main}>
      <SearchInput />
      <div className={s.container}>
        <FiltersWrapper />
        <ProductsWrapper products={products} isLoading={isLoading}/>
      </div>
      <Pagination
        defaultCurrent={1}
        showSizeChanger={false}
        pageSize={50}
        total={allIds.length}
        onChange={onChangePage}
      />
    </main>
  );
};

export default MainPage;
