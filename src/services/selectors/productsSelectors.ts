import { StateSchema } from '../store';

export const getProductsIds = (state: StateSchema) => state.products?.data?.result;
