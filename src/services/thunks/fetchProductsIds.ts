import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestActions, RequestResult } from '../../types/types';
import { ThunkConfig } from '../store';

type ProductsIds = RequestResult<string[]>;

export interface Params {
  offset: number;
  limit: 50;
}

export const fetchProductsIds = createAsyncThunk<
  string[],
  Params | null,
  ThunkConfig<string>
>('products/fetchProductsIds', async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const res = await extra.api.post<ProductsIds>('/', {
      action: RequestActions.GET_IDS,
      ...(!!data && { params: data }),
    });

    // if (!res.data.result) {
    //   throw new Error();
    // }

    return res.data.result;
  } catch (e) {
    console.log(e);
    return rejectWithValue(
      'Произошла ошибка при загрузке товаров. Попробуйте обновить страницу',
    );
  }
});
