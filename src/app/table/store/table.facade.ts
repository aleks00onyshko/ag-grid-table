import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TableState, YoutubeItem } from '../models';

import {
  getVideosSelector,
  getSelectionCount,
  getSelectionMode,
  getAllSelected,
} from './selectors';
import {
  getVideos,
  selectionChanged,
  toggleSelectionMode,
  toggleOverallSelection,
} from './actions';

@Injectable({
  providedIn: 'root',
})
export class TableFacade {
  videos$: Observable<YoutubeItem[]> = this.store.select(getVideosSelector);
  selectionCount$: Observable<number> = this.store.select(getSelectionCount);
  selectionMode$: Observable<boolean> = this.store.select(getSelectionMode);
  allSelected$: Observable<boolean> = this.store.select(getAllSelected);

  constructor(private store: Store<TableState>) {}

  getVideos(): void {
    this.store.dispatch(getVideos());
  }

  selectionChanged(count: number): void {
    this.store.dispatch(selectionChanged({ selectionCount: count }));
  }

  toggleSelectionMode(): void {
    this.store.dispatch(toggleSelectionMode({}));
  }

  toggleOverallSelection(): void {
    this.store.dispatch(toggleOverallSelection({}));
  }
}
