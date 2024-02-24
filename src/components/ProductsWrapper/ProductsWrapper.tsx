import { Skeleton } from 'antd';
import { FC } from 'react';
import { Product } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import s from './ProductsWrapper.module.css';

export interface ProductsWrapperProps {
  products?: Product[];
  isLoading: boolean;
}

const ProductsWrapper: FC<ProductsWrapperProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className={s.wrapper}>
        <Skeleton />
      </div>
    );
  }
  return (
    <div className={s.wrapper}>
      {products?.map(item => {
        return <ProductCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ProductsWrapper;
