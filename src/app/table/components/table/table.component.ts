import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import {
  ColDef,
  ICellRendererParams,
  GetContextMenuItemsParams,
  SideBarDef,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Thumbnail, YoutubeItem } from '../../models';
import { TableFacade } from '../../store';
import { HeaderSelectComponent } from '../header-select';
import { ToolbarComponent } from '../toolbar';

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
export class TableComponent implements OnDestroy, AfterViewInit {
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

  ngAfterViewInit() {
    // *I put subscription to this hook because I need to get access to agGrid

    this.selectionModeSubscription$ = this.tableFacade.selectionMode$.subscribe(
      (selectionMode: boolean) => {
        this.agGrid.api.setColumnDefs(this.createColumnDefs(selectionMode));
        this.agGrid.api.deselectAll();
      }
    );

    this.selectionState$ = combineLatest(
      this.tableFacade.allSelected$,
      this.tableFacade.allUnselected$
    ).subscribe(([allSelected, allUnselected]) => {
      allSelected
        ? this.agGrid.api.selectAll()
        : allUnselected
        ? this.agGrid.api.deselectAll()
        : null;
    });
  }

  ngOnDestroy() {
    this.selectionModeSubscription$.unsubscribe();
    this.selectionState$.unsubscribe();
  }

  onSelectionChanged(): void {
    const rows = this.agGrid.api.getSelectedRows();

    this.tableFacade.selectionChanged(rows.length);
  }

  getContextMenuItems(params: GetContextMenuItemsParams) {
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
        field: 'thumbnail',
        headerName: '',
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
