import { Button, Pagination, PaginationProps, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import FiltersWrapper from '../../components/FiltersWrapper/FiltersWrapper';
import ProductsWrapper from '../../components/ProductsWrapper/ProductsWrapper';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectBrandsError,
  selectCurrentPage,
} from '../../services/selectors/filtersSelectors';
import {
  filteredAllIds,
  filteredProductsFullInfo,
  selectError,
  selectIsLoadingIds,
  selectIsLoadingItems,
} from '../../services/selectors/productsSelectors';
import { filtersActions } from '../../services/slices/filterSlice';
import { fetchBrands } from '../../services/thunks/fetchBrands';
import { fetchItems } from '../../services/thunks/fetchItems';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';
import s from './MainPage.module.css';

const { Title, Text } = Typography;

const MainPage = () => {
  const dispatch = useAppDispatch();

  const allIds = useAppSelector(filteredAllIds);
  const products = useAppSelector(filteredProductsFullInfo);
  const isLoadingPageIds = useAppSelector(selectIsLoadingIds);
  const isLoadingItems = useAppSelector(selectIsLoadingItems);
  const error = useAppSelector(selectError);
  const brandsError = useAppSelector(selectBrandsError);
  const currentPage = useAppSelector(selectCurrentPage);

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchProductsIds(null));
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const getIdsforCurrentPage = (currentPage: number) => {
      const startIndex = (currentPage - 1) * 50;
      const endIndex = currentPage * 50;
      return allIds.slice(startIndex, endIndex);
    };
    const ids = getIdsforCurrentPage(currentPage);
    if (ids.length !== 0) {
      console.log(allIds, 'allIds');
      dispatch(fetchItems(ids));
    }
  }, [dispatch, currentPage, allIds]);

  if (isLoadingPageIds) {
    return (
      <main className={s.spinContainer}>
        <Spin size="large" />
      </main>
    );
  }

  if (error || brandsError) {
    return (
      <main className={s.errorContainer}>
        {error && <Title level={1}>{error}</Title>}
        {brandsError && <Title level={1}>{brandsError}</Title>}
        <Text>Попробуйте обновить страницу</Text>
        <Button type="primary" onClick={refreshPage}>
          Обновить
        </Button>
      </main>
    );
  }

  const onChangePage: PaginationProps['onChange'] = pageNumber => {
    dispatch(filtersActions.setCurrentPage(pageNumber));
  };

  return (
    <main className={s.main}>
      <SearchInput />
      <div className={s.container}>
        <FiltersWrapper />
        <ProductsWrapper products={products} isLoading={isLoadingItems} />
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
