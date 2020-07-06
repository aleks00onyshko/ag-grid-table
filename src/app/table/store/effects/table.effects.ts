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
  tap,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { TableService } from '../../core/services';
import { YoutubeItem, TableState } from '../../models';

import {
  getVideos,
  getVideosFail,
  getVideosSuccess,
  selectionChanged,
  toggleOverallSelection,
  toggleSelectionMode,
} from '../actions';
import { getVideosSelector } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class TableEffects {
  getVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getVideos),
      mergeMap(() =>
        this.tableService.getVideos().pipe(
          map((videos: YoutubeItem[]) => getVideosSuccess({ videos })),
          catchError((error: any) =>
            of(
              getVideosFail({ error, videosMock: this.tableService.videosMock })
            )
          )
        )
      )
    )
  );

  getVideosFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getVideosFail),
        tap(() => {
          alert('google key is expired, videos will be replaced with a mock');
        })
      ),
    { dispatch: false }
  );

  selectionChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectionChanged),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.pipe(select(getVideosSelector)))
        )
      ),
      concatMap(([action, videos]) => [
        toggleOverallSelection({
          allSelected: action.selectionCount === videos.length,
        }),
      ])
    )
  );

  selectionModeToggled$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleSelectionMode),
      concatMapTo([
        selectionChanged({ selectionCount: 0 }),
        toggleOverallSelection({ allSelected: false }),
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<TableState>,
    private tableService: TableService
  ) {}
}
