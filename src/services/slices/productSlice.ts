import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFilter } from '../thunks/fetchFilter';
import { fetchItems } from '../thunks/fetchItems';
import { fetchProductsIds } from '../thunks/fetchProductsIds';

export interface ProductState {
  isLoadingPage: boolean;
  isLoading: boolean;
  error?: string;

  allIds?: string[];
  items?: string[];
}

const initialState: ProductState = {
  isLoadingPage: false,
  isLoading: false,
  error: undefined,

  allIds: undefined,
  items: undefined,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // setReadOnly: (state, action: PayloadAction<boolean>) => {},
  },
  extraReducers: builder => {
    // allIds
    builder
      .addCase(fetchProductsIds.pending, state => {
        state.error = undefined;
        state.isLoadingPage = true;
      })
      .addCase(fetchProductsIds.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.allIds = action.payload;
        state.isLoadingPage = false;
      })

      .addCase(fetchProductsIds.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingPage = false;
      });
    // items
    builder
      .addCase(fetchItems.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.items = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchItems.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
    // filter
    builder
      .addCase(fetchFilter.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchFilter.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.items = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchFilter.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: productsActions, reducer: productsReducer } = productsSlice;
