import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { filteredBrands } from '../../services/selectors/filtersSelectors';
// import { fetchProducts } from '../../services/thunks/fetchProducts';
import { fetchBrands } from '../../services/thunks/fetchBrands';
import ProductCard from '../ProductCard/ProductCard';
import s from './ProductsWrapper.module.css';

export interface ProductsWrapperProps {}

const ProductsWrapper = () => {
  const dispatch = useAppDispatch();

  const brands = useAppSelector(filteredBrands);
  console.log(brands);

  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default ProductsWrapper;
