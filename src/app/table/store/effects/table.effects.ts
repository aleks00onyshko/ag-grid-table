import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  concatMap,
  concatMapTo,
  withLatestFrom,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { TableService } from '../../core/services';
import { YoutubeItem, TableState } from '../../models';

import {
  GET_VIDEOS,
  GetVideosSuccess,
  GetVideosFail,
  SELECTION_MODE_CHANGED,
  SelectionChanged,
  ToggleOverallSelection,
  SELECTION_CHANGED,
  ToggleOverallDeselection,
} from '../actions';
import { getSelectionMode, getVideos } from 'src/app/table/store/selectors';

@Injectable({
  providedIn: 'root',
})
export class TableEffects {
  getVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_VIDEOS),
      mergeMap(() =>
        this.tableService.getVideos().pipe(
          map((videos: YoutubeItem[]) => new GetVideosSuccess(videos)),
          catchError((error: any) => of(new GetVideosFail(error)))
        )
      )
    )
  );

  selectionChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SELECTION_CHANGED),
      concatMap((action: SelectionChanged) =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(getVideos))))
      ),
      concatMap(([action, videos]) => [
        new ToggleOverallSelection(action.payload === videos.length),
        new ToggleOverallDeselection(action.payload === 0),
      ])
    )
  );

  selectionModeChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SELECTION_MODE_CHANGED),
      concatMapTo([
        new SelectionChanged(0),
        new ToggleOverallSelection(false),
        new ToggleOverallDeselection(true),
      ])
    )
  );
  constructor(
    private actions$: Actions,
    private store: Store<TableState>,
    private tableService: TableService
  ) {}
}
