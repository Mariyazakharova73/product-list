import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectBrand,
  selectBrandsError,
  selectPrice,
  selectSearchValue,
} from '../../services/selectors/filtersSelectors';
import {
  selectFilterError,
  selectIdsError,
} from '../../services/selectors/productsSelectors';
import { fetchBrands } from '../../services/thunks/fetchBrands';
import { fetchFilter } from '../../services/thunks/fetchFilter';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';

const PageWrapper = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const priceValue = useAppSelector(selectPrice);
  const brandValue = useAppSelector(selectBrand);
  const searchValue = useAppSelector(selectSearchValue);

  const idsError = useAppSelector(selectIdsError);
  const brandsError = useAppSelector(selectBrandsError);
  const filterError = useAppSelector(selectFilterError);
  // const itemsError = useAppSelector(selectItemsError);

  useEffect(() => {
    if (brandsError) {
      dispatch(fetchBrands());
    }

    if (idsError) {
      dispatch(fetchProductsIds());
    }
  }, [brandsError, dispatch, idsError]);

  useEffect(() => {
    if (filterError) {
      if (priceValue) {
        fetchFilter({ price: Number(priceValue) });
      }

      if (brandValue) {
        fetchFilter({ brand: brandValue });
      }

      if (searchValue) {
        fetchFilter({ product: searchValue });
      }
    }
  }, [brandValue, dispatch, filterError, priceValue, searchValue]);

  return <>{children}</>;
};

export default PageWrapper;
