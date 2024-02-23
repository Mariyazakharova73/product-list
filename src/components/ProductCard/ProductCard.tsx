import { Card } from 'antd';
import s from './ProductCard.module.css';

const ProductCard = () => {
  return (
    <Card hoverable title="Card title" className={s.card}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default ProductCard;
