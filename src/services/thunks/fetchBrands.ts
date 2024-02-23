import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestActions } from '../../types/types';
import { ThunkConfig } from '../store';

export const fetchBrands = createAsyncThunk<any, void, ThunkConfig<string>>(
  'filters/fetchBrands',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const res = await extra.api.post<any>('/', {
        action: RequestActions.GET_FIELDS,
        params: { field: 'brand' },
      });

      if (!res.data) {
        throw new Error();
      }

      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Ошибка');
    }
  },
);
