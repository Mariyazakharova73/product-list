import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../thunks/fetchProducts';
import { ProductsIds } from '../../types/types';

export interface ProductState {
  data?: ProductsIds;
  isLoading: boolean;
  error?: string;
}

const initialState = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // setReadOnly: (state, action: PayloadAction<boolean>) => {},
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsIds>) => {
        // @ts-ignore
        state.data = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        // @ts-ignore
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: productsActions, reducer: productsReducer } = productsSlice;
