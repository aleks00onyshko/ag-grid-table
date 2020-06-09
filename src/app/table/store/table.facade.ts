import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TableState, YoutubeItem } from '../models';

import {
  getVideos,
  getSelectionCount,
  getSelectionMode,
  getAllSelected,
  getAllUnselected,
} from './selectors';
import {
  GetVideos,
  SelectionChanged,
  SelectionModeChanged,
  ToggleOverallSelection,
  ToggleOverallDeselection,
} from './actions';

@Injectable({
  providedIn: 'root',
})
export class TableFacade {
  videos$: Observable<YoutubeItem[]> = this.store.select(getVideos);
  selectionCount$: Observable<number> = this.store.select(getSelectionCount);
  selectionMode$: Observable<boolean> = this.store.select(getSelectionMode);
  allSelected$: Observable<boolean> = this.store.select(getAllSelected);
  allUnselected$: Observable<boolean> = this.store.select(getAllUnselected);

  constructor(private store: Store<TableState>) {}

  getVideos(): void {
    this.store.dispatch(new GetVideos());
  }

  selectionChanged(count: number): void {
    this.store.dispatch(new SelectionChanged(count));
  }

  toggleSelectionMode(): void {
    this.store.dispatch(new SelectionModeChanged());
  }

  toggleOverallSelection(): void {
    this.store.dispatch(new ToggleOverallSelection());
  }

  toggleOverallDeselection(): void {
    this.store.dispatch(new ToggleOverallDeselection());
  }
}
