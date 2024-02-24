import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from '../thunks/fetchBrands';

export interface FiltersState {
  isLoading: boolean;
  error?: string;
  //
  brands?: string[] | null[];
  //
  currentPage: number;
  searchValue?: string;
  price?: string;
  brand?: string;
}

const initialState: FiltersState = {
  isLoading: false,
  error: undefined,
  //
  brands: undefined,
  //
  currentPage: 1,
  searchValue: undefined,
  price: undefined,
  brand: undefined,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<string[] | null[]>) => {
          state.brands = action.payload;
          state.isLoading = false;
        },
      )

      .addCase(fetchBrands.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;
