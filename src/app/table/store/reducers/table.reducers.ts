import { TableState } from '../../models';
import {
  getVideosSuccess,
  getVideosFail,
  selectionChanged,
  toggleSelectionMode,
  toggleOverallSelection,
} from '../actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: TableState = {
  videos: [],
  selectionCount: 0,
  selectionMode: false,
  allSelected: false,
  error: null,
};

export const tableReducer = createReducer(
  initialState,
  on(getVideosSuccess, (state, { videos }) => ({ ...state, videos })),
  on(getVideosFail, (state, { error }) => ({ ...state, error })),
  on(selectionChanged, (state, { selectionCount }) => ({
    ...state,
    selectionCount,
  })),
  on(toggleSelectionMode, (state, { selectionMode }) => ({
    ...state,
    selectionMode: selectionMode ?? !state.selectionMode,
  })),
  on(toggleOverallSelection, (state, { allSelected }) => ({
    ...state,
    allSelected: allSelected ?? !state.allSelected,
  }))
);
