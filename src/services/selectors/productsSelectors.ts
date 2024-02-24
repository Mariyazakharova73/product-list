import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../store';

export const selectAllIds = (state: StateSchema) => state.products?.allIds;

export const filteredAllIds = createSelector(selectAllIds, arr => {
  const newSet = new Set(arr);
  return Array.from(newSet);
});

export const selectProductsFullInfo = (state: StateSchema) => state.products?.items;

export const selectIsLoadingPage = (state: StateSchema) => state.products.isLoadingPage;
export const selectIsLoading = (state: StateSchema) => state.products.isLoading;

export const selectError = (state: StateSchema) => state.products.isLoading;

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
