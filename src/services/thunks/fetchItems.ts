import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestActions, RequestResult } from '../../types/types';
import { ThunkConfig } from '../store';

type Items = RequestResult<string[]>;

export const fetchItems = createAsyncThunk<string[], string[], ThunkConfig<string>>(
  'products/fetchItems',
  async (arrIds, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const res = await extra.api.post<Items>('/', {
        action: RequestActions.GET_ITEMS,
        params: { ids: arrIds },
      });

      // if (!res.data.result) {
      //   throw new Error();
      // }

      return res.data.result;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Ошибка');
    }
  },
);
