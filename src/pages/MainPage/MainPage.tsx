import FiltersWrapper from '../../components/FiltersWrapper/FiltersWrapper';
import ProductsWrapper from '../../components/ProductsWrapper/ProductsWrapper';
import SearchInput from '../../components/SearchInput/SearchInput';
import s from './MainPage.module.css';

const MainPage = () => {
  return (
    <main className={s.main}>
      <SearchInput />
      <div className={s.container}>
        <FiltersWrapper />
        <ProductsWrapper />
      </div>
    </main>
  );
};

export default MainPage;
