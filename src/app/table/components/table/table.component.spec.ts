import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';
import { AllModules } from '@ag-grid-enterprise/all-modules';

import { TableFacade } from '../../store';
import { YoutubeItem } from '../../models';

import { HeaderSelectComponent } from '../header-select';
import { ToolbarComponent } from '../toolbar';
import { TableComponent } from './table.component';
import { BrowserModule } from '@angular/platform-browser';

class MockTableFacade {
  toggleSelectionMode() {}

  videos$: Observable<YoutubeItem[]> = of([
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
  ]);
  selectionMode$: Observable<boolean> = of(true);
  allSelected$: Observable<boolean> = of(false);
  selectionCount$: Observable<number> = of(1);
  selectionChanged(count: number) {}
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let tableFacade: MockTableFacade;
  let mocks = {
    rowData$: [
      {
        thumbnail: {
          url: 'string',
          width: 0,
          height: 0,
        },
        publishedAt: 'string',
        title: { title: 'string', videoId: 'string' },
        description: 'string',
      },
    ],
    columnDefs: [
      {
        headerName: '',
        field: 'thumbnail',
        headerComponentFramework: null,
        cellRenderer: (params) => {},
        suppressSizeToFit: true,
        checkboxSelection: false,
        width: 150,
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        width: 150,
      },
      {
        headerName: 'Video Title',
        cellRenderer: (params) => {},
        field: 'title',
        width: 400,
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 400,
      },
    ],
    sideBar: {
      toolPanels: [
        {
          id: 'customStats',
          labelDefault: 'Custom Stats',
          labelKey: 'customStats',
          iconKey: 'custom-stats',
          toolPanel: 'customStatsToolPanel',
        },
      ],
      defaultToolPanel: 'customStats',
    },
    frameworkComponents: {
      customStatsToolPanel: ToolbarComponent,
    },
    videoTitleContextMenuItems: [
      'copy',
      'copyWithHeaders',
      'paste',
      'export',
      {
        name: 'Open in new tab',
        action: function () {
          window.open(`https://www.youtube.com/watch?v=`);
        },
      },
    ],
    defaultContextMenuItems: ['copy', 'copyWithHeaders', 'paste', 'export'],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        AgGridModule.withComponents([HeaderSelectComponent, ToolbarComponent]),
      ],
      declarations: [TableComponent, HeaderSelectComponent, ToolbarComponent],
      providers: [{ provide: TableFacade, useClass: MockTableFacade }],
    }).compileComponents();

    tableFacade = TestBed.inject(TableFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    mocks.columnDefs[0].cellRenderer = component['thumbnailCellRenderer'];
    mocks.columnDefs[2].cellRenderer = component['videoTitleCellRenderer'];
  });

  it('should create the TableComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly assign config data for ag-frid-table', () => {
    expect(component.columnDefs).toEqual(mocks.columnDefs);
    expect(component.sideBar).toEqual(mocks.sideBar);
    expect(component.modules).toEqual(AllModules);
    expect(component.frameworkComponents).toEqual(mocks.frameworkComponents);
  });

  it('should correctly assign row data', (done: DoneFn) => {
    component.rowData$.subscribe((rowData) => {
      expect(rowData).toEqual(mocks.rowData$);
      done();
    });
  });

  it('should call ag-grid initializing function', () => {
    spyOn(component, 'onGridReady');

    component.agGrid.gridReady.emit();

    fixture.detectChanges();

    expect(component.onGridReady).toHaveBeenCalled();
  });

  describe('Get context menu items', () => {
    it('should return custom items if cell is "Video Title" ', () => {
      const incomeParams = {
        column: {
          getColDef: () => ({ headerName: 'Video Title' }),
        },
      };

      const items = component.getContextMenuItems(incomeParams as any);

      // I can't set a function here to math,
      // because method incapsulates original function, and it ibviously contains differens references
      expect(JSON.stringify(items)).toBe(
        JSON.stringify(mocks.videoTitleContextMenuItems)
      );
    });
    it('should return default items if is in not "Video Title" cell', () => {
      const incomeParams = {
        column: {
          getColDef: () => ({ headerName: 'some othe' }),
        },
      };

      const items = component.getContextMenuItems(incomeParams as any);

      expect(items).toEqual(mocks.defaultContextMenuItems);
    });
  });

  it('should call appropriate method in facade when selection count was changed', () => {
    spyOn(tableFacade, 'selectionChanged');

    component.onSelectionChanged();

    expect(tableFacade.selectionChanged).toHaveBeenCalledWith(0);
  });
});
