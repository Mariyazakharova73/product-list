import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../store';

export const selectAllIds = (state: StateSchema) => state.products?.allIds;

export const filteredAllIds = createSelector(selectAllIds, arr => {
  const newSet = new Set(arr);
  return Array.from(newSet);
});

export const selectProductsFullInfo = (state: StateSchema) => state.products?.items;

export const selectIsLoadingIds = (state: StateSchema) => state.products.isLoadingIds;
export const selectIsLoadingItems = (state: StateSchema) => state.products.isLoadingItems;

export const selectError = (state: StateSchema) => state.products.error;

export const filteredProductsFullInfo = createSelector(selectProductsFullInfo, arr => {
  if (arr) {
    return arr.reduce(
      // @ts-ignore
      (arr, el) => (arr.find(i => i.id === el.id) || arr?.push(el), arr),
      [],
    );
  }
  return [];
});
