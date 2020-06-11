import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TableState } from '../../models';

const getTableState = createFeatureSelector<TableState>('table');

export const getVideosSelector = createSelector(
  getTableState,
  (state: TableState) => state.videos
);

export const getSelectionCount = createSelector(
  getTableState,
  (state: TableState) => state.selectionCount
);

export const getSelectionMode = createSelector(
  getTableState,
  (state: TableState) => state.selectionMode
);

export const getAllSelected = createSelector(
  getTableState,
  (state: TableState) => state.allSelected
);
