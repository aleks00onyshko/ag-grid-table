import { TableState } from '../../models';
import {
  TableActions,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAIL,
  SELECTION_CHANGED,
  SELECTION_MODE_CHANGED,
  TOGGLE_OVERALL_SELECTION,
  TOGGLE_OVERALL_DESELECTION,
} from '../actions';

export const initialState: TableState = {
  videos: [],
  selectionCount: 0,
  selectionMode: false,
  allSelected: false,
  allUnselected: true,
  error: null,
};

export function tableReducer(
  state: TableState = initialState,
  action: TableActions
) {
  switch (action.type) {
    case GET_VIDEOS_SUCCESS: {
      return {
        ...state,
        videos: [...action.payload],
      };
    }
    case GET_VIDEOS_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case SELECTION_CHANGED: {
      return {
        ...state,
        selectionCount: action.payload,
      };
    }
    case SELECTION_MODE_CHANGED: {
      return {
        ...state,
        selectionMode: action.payload ?? !state.selectionMode,
      };
    }
    case TOGGLE_OVERALL_SELECTION: {
      return {
        ...state,
        allSelected: action.payload ?? !state.allSelected,
      };
    }
    case TOGGLE_OVERALL_DESELECTION: {
      return {
        ...state,
        allUnselected: action.payload ?? !state.allUnselected,
      };
    }
  }

  return state;
}
