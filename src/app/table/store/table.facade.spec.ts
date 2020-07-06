import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { TableFacade } from './table.facade';
import { TableState } from '../models';
import { initialState } from './reducers';

interface TestSchema {
  table: TableState;
}

describe('TableFacade', () => {
  let store: Store<TestSchema>;
  let tableFacade: TableFacade;
  let mocks = {
    getVideosAction: {
      type: '[Table] Get Videos',
    },
    selectionChangedAction: {
      type: '[Table] Selection Changed',
      selectionCount: 1,
    },
    toggleSelectionModeAction: {
      type: '[Table] Selection Mode Toggled',
    },
    toggleOverallSelection: {
      type: '[Table] Toggle Overall Selection',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableFacade, provideMockStore({ initialState })],
    });

    store = TestBed.inject(MockStore);
    tableFacade = TestBed.inject(TableFacade);
  });

  it('should initialize TableFacade', () => {
    expect(tableFacade).toBeTruthy();
  });

  it('should dispatch get videos action to the store', () => {
    spyOn(store, 'dispatch');

    tableFacade.getVideos();

    expect(store.dispatch).toHaveBeenCalledWith(mocks.getVideosAction);
  });

  it('should dispatch selection changed action to the store', () => {
    spyOn(store, 'dispatch');

    tableFacade.selectionChanged(1);

    expect(store.dispatch).toHaveBeenCalledWith(mocks.selectionChangedAction);
  });

  it('should dispatch toggle selection mode action to the store', () => {
    spyOn(store, 'dispatch');

    tableFacade.toggleSelectionMode();

    expect(store.dispatch).toHaveBeenCalledWith(
      mocks.toggleSelectionModeAction
    );
  });

  it('should dispatch toggle overall selection action to the store', () => {
    spyOn(store, 'dispatch');

    tableFacade.toggleOverallSelection();

    expect(store.dispatch).toHaveBeenCalledWith(mocks.toggleOverallSelection);
  });
});
