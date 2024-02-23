import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsIds, RequestActions } from '../../types/types';
import { ThunkConfig } from '../store';

export const fetchProducts = createAsyncThunk<ProductsIds, void, ThunkConfig<string>>(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const res = await extra.api.post<ProductsIds>('/', {
        action: RequestActions.GET_IDS,
        params: { offset: 0, limit: 50 },
      });

      if (!res.data.result) {
        throw new Error();
      }

      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Ошибка');
    }
  },
);
