import { Action } from '@ngrx/store';

import { YoutubeItem } from '../../models';

export const GET_VIDEOS = '[Table] Get videos';
export const GET_VIDEOS_SUCCESS = '[Table] Get Videos Success';
export const GET_VIDEOS_FAIL = '[Table] Get Videos Fail';

export const SELECTION_CHANGED = '[Table] Selection Changed';
export const SELECTION_MODE_CHANGED = '[Table] Selection Mode Changed';
export const TOGGLE_OVERALL_SELECTION = '[Table] Toggle Overall Selection';
export const TOGGLE_OVERALL_DESELECTION = '[Table] Toggle Overall Deselection';

export class GetVideos implements Action {
  readonly type = GET_VIDEOS;
}

export class GetVideosSuccess implements Action {
  readonly type = GET_VIDEOS_SUCCESS;
  constructor(public payload: YoutubeItem[]) {}
}

export class GetVideosFail implements Action {
  readonly type = GET_VIDEOS_FAIL;
  constructor(public payload: any) {}
}

export class SelectionChanged implements Action {
  readonly type = SELECTION_CHANGED;
  constructor(public payload: number) {}
}

export class SelectionModeChanged implements Action {
  readonly type = SELECTION_MODE_CHANGED;
  constructor(public payload?: boolean) {}
}

export class ToggleOverallSelection implements Action {
  readonly type = TOGGLE_OVERALL_SELECTION;
  constructor(public payload?: boolean) {}
}

export class ToggleOverallDeselection implements Action {
  readonly type = TOGGLE_OVERALL_DESELECTION;
  constructor(public payload?: boolean) {}
}

export type TableActions =
  | GetVideos
  | GetVideosSuccess
  | GetVideosFail
  | SelectionChanged
  | SelectionModeChanged
  | ToggleOverallSelection
  | ToggleOverallDeselection;
