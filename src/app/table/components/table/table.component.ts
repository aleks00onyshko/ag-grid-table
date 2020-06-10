import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import {
  ColDef,
  ICellRendererParams,
  GetContextMenuItemsParams,
  SideBarDef,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
import { Observable, Subscription, of } from 'rxjs';
import { map, concatMap, withLatestFrom } from 'rxjs/operators';

import { Thumbnail, YoutubeItem } from '../../models';
import { TableFacade } from '../../store';
import { HeaderSelectComponent } from '../header-select';
import { ToolbarComponent } from '../toolbar';
import { ContextParams } from 'ag-grid-community/dist/lib/context/context';

interface RowData {
  thumbnail: Thumbnail;
  publishedAt: string;
  title: {
    title: string;
    videoId: string;
  };
  description: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnDestroy {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData$: Observable<RowData[]> = this.createRowData();
  columnDefs: ColDef[] = this.createColumnDefs(false);
  sideBar: SideBarDef = this.createSideBar();
  modules: Module[] = AllModules;
  frameworkComponents = {
    customStatsToolPanel: ToolbarComponent,
  };

  private selectionModeSubscription$: Subscription;
  private selectionState$: Subscription;

  constructor(public tableFacade: TableFacade) {}

  ngOnDestroy() {
    this.selectionModeSubscription$.unsubscribe();
    this.selectionState$.unsubscribe();
  }

  onGridReady(): void {
    this.selectionModeSubscription$ = this.tableFacade.selectionMode$.subscribe(
      (selectionMode: boolean) => {
        this.agGrid.api.setColumnDefs(this.createColumnDefs(selectionMode));
        this.agGrid.api.deselectAll();
      }
    );

    this.selectionState$ = this.tableFacade.allSelected$
      .pipe(
        concatMap((allSelected: boolean) =>
          of(allSelected).pipe(
            withLatestFrom(
              this.tableFacade.selectionCount$,
              this.tableFacade.videos$
            )
          )
        )
      )
      .subscribe(([allSelected, selectionCount, videos]) => {
        allSelected
          ? this.agGrid.api.selectAll()
          : selectionCount === videos.length && this.agGrid.api.deselectAll();
      });
  }

  onSelectionChanged(): void {
    const rows = this.agGrid.api.getSelectedRows();

    this.tableFacade.selectionChanged(rows.length);
  }

  getContextMenuItems(params: GetContextMenuItemsParams): any[] {
    return params.column.getColDef().headerName === 'Video Title'
      ? [
          'copy',
          'copyWithHeaders',
          'paste',
          'export',
          {
            name: 'Open in new tab',
            action: function () {
              window.open(
                `https://www.youtube.com/watch?v=${params.value.videoId}`
              );
            },
          },
        ]
      : ['copy', 'copyWithHeaders', 'paste', 'export'];
  }

  private createColumnDefs(selectionMode: boolean): ColDef[] {
    return [
      {
        headerName: '',
        field: 'thumbnail',
        headerComponentFramework: selectionMode ? HeaderSelectComponent : null,
        cellRenderer: this.thumbnailCellRenderer,
        suppressSizeToFit: true,
        checkboxSelection: selectionMode,
        width: 150,
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        width: 150,
      },
      {
        headerName: 'Video Title',
        cellRenderer: this.videoTitleCellRenderer,
        field: 'title',
        width: 400,
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 400,
      },
    ];
  }

  private createRowData(): Observable<RowData[]> {
    return this.tableFacade.videos$.pipe(
      map((videos: YoutubeItem[]) =>
        videos.map((video) => ({
          thumbnail: video.snippet.thumbnails.default,
          publishedAt: video.snippet.publishedAt,
          title: { title: video.snippet.title, videoId: video.id.videoId },
          description: video.snippet.description,
        }))
      )
    );
  }

  private createSideBar(): SideBarDef {
    return {
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
    };
  }

  private thumbnailCellRenderer(rowParams: ICellRendererParams): string {
    return `<img src=${rowParams.value.url} >`;
  }

  private videoTitleCellRenderer(rowParams: ICellRendererParams): string {
    const { videoId, title } = rowParams.value;

    return `<a href="https://www.youtube.com/watch?v=${videoId}">${title}</a>`;
  }
}
