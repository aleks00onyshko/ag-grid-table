import { createAction, props, union } from '@ngrx/store';

import { YoutubeItem } from '../../models';

export const getVideos = createAction('[Table] Get Videos');
export const getVideosSuccess = createAction(
  '[Table] Get Videos Success',
  props<{ videos: YoutubeItem[] }>()
);
export const getVideosFail = createAction(
  '[Table] Get Videos Fail',
  props<{ error: any; videosMock: YoutubeItem[] }>()
);
export const selectionChanged = createAction(
  '[Table] Selection Changed',
  props<{ selectionCount: number }>()
);

export const toggleSelectionMode = createAction(
  '[Table] Selection Mode Toggled',
  props<{ selectionMode?: boolean }>()
);

export const toggleOverallSelection = createAction(
  '[Table] Toggle Overall Selection',
  props<{ allSelected?: boolean }>()
);

const all = union({
  getVideos,
  getVideosSuccess,
  getVideosFail,
  selectionChanged,
  toggleSelectionMode,
  toggleOverallSelection,
});

export type TableAction = typeof all;
