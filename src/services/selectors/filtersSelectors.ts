import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../store';

export const getBrands = (state: StateSchema) => state?.filters?.brands;

export const filteredBrands = createSelector(getBrands, arr => {
  return arr?.result?.filter((item: any) => item !== null);
});
