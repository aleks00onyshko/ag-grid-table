import { ReplaySubject } from 'rxjs';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { TableEffects } from './table.effects';
import { initialState } from '../reducers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableService } from '../../core';

import {
  getVideos,
  selectionChanged,
  getVideosSuccess,
  toggleSelectionMode,
} from '../actions';
import { Store } from '@ngrx/store';
import { TableState } from '../../models';
import { getVideosSelector } from 'src/app/table/store/selectors';
import { take, skip } from 'rxjs/operators';

interface TestSchema {
  table: TableState;
}

describe('RouterHistoryEffects', () => {
  let actions: ReplaySubject<any>;
  let tableEffects: TableEffects;
  let store: MockStore<TableState>;
  let tableService: TableService;

  let mockedGetVideosSelector;

  let mocks = {
    videos: [
      {
        etag: 'etag',
        kind: 'king',

        snippet: {
          channelId: 'string',
          channelTitle: 'string',
          description: 'string',
          liveBroadcastContent: 'string',
          publishTime: 'string',
          publishedAt: 'string',
          thumbnails: {
            default: {
              url: 'string',
              width: 0,
              height: 0,
            },
            high: {
              url: 'string',
              width: 0,
              height: 0,
            },
            medium: {
              url: 'string',
              width: 0,
              height: 0,
            },
          },
          title: 'string',
        },
        id: {
          kind: 'string',
          videoId: 'string',
        },
      },
      {
        etag: 'etag',
        kind: 'king',

        snippet: {
          channelId: 'string',
          channelTitle: 'string',
          description: 'string',
          liveBroadcastContent: 'string',
          publishTime: 'string',
          publishedAt: 'string',
          thumbnails: {
            default: {
              url: 'string',
              width: 0,
              height: 0,
            },
            high: {
              url: 'string',
              width: 0,
              height: 0,
            },
            medium: {
              url: 'string',
              width: 0,
              height: 0,
            },
          },
          title: 'string',
        },
        id: {
          kind: 'string',
          videoId: 'string',
        },
      },
      {
        etag: 'etag',
        kind: 'king',

        snippet: {
          channelId: 'string',
          channelTitle: 'string',
          description: 'string',
          liveBroadcastContent: 'string',
          publishTime: 'string',
          publishedAt: 'string',
          thumbnails: {
            default: {
              url: 'string',
              width: 0,
              height: 0,
            },
            high: {
              url: 'string',
              width: 0,
              height: 0,
            },
            medium: {
              url: 'string',
              width: 0,
              height: 0,
            },
          },
          title: 'string',
        },
        id: {
          kind: 'string',
          videoId: 'string',
        },
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TableEffects,
        TableService,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
      ],
    });

    tableEffects = TestBed.inject(TableEffects);
    tableService = TestBed.inject(TableService);
    store = TestBed.get(Store);

    mockedGetVideosSelector = store.overrideSelector(
      getVideosSelector,
      mocks.videos
    );
  });

  it('should be created', async () => {
    expect(tableEffects).toBeTruthy();
  });

  it('#getVideos$ should dispatch getVideosSuccess with a videos payload', async(async () => {
    actions = new ReplaySubject(1);
    actions.next(getVideos());

    tableEffects.getVideos$.subscribe((action) => {
      expect((action as any).videos).toEqual({ videos: mocks.videos });
    });
  }));

  it('#selectionChanged$ should dispatch toggleOverallSelection with overall selected state', async(async () => {
    actions = new ReplaySubject(1);
    actions.next(selectionChanged({ selectionCount: 2 }));

    tableEffects.selectionChanged$.subscribe((action) => {
      expect((action as any).allSelected).toBeFalsy();
    });
  }));

  it('#selectionModeToggled$ should dispatch selectionChanged and toggleOverallSelection', async(async () => {
    actions = new ReplaySubject(1);
    actions.next(toggleSelectionMode({ selectionMode: true }));

    tableEffects.selectionModeToggled$.pipe(take(1)).subscribe((action) => {
      console.log('from first last effect', action);
      expect((action as any).selectionCount).toEqual(0);
    });

    tableEffects.selectionModeToggled$.pipe(skip(1)).subscribe((action) => {
      console.log('from second last effect', action);
      expect((action as any).allSelected).toBeFalsy();
    });
  }));
});
