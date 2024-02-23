// import type { PayloadAction } from '@reduxjs/toolkit';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from '../thunks/fetchBrands';

export interface FiltersState {
  currentPage: number;
  searchValue?: string;
  price?: number;
  brand?: string;
  brands: any;
  isLoading: boolean;
  error?: string;
}

const initialState = {
  currentPage: 1,
  searchValue: undefined,
  price: undefined,
  brand: undefined,
  brands: undefined,
  isLoading: false,
  error: undefined,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // setReadOnly: (state, action: PayloadAction<boolean>) => {},
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<any>) => {
        state.brands = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchBrands.rejected, (state, action) => {
        //@ts-ignore
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;
