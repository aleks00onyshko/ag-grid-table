import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';

import { TableFacade } from '../../store';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements IHeaderAngularComp {
  constructor(public tableFacade: TableFacade) {}

  agInit() {}

  toggleSelectionMode(): void {
    this.tableFacade.toggleSelectionMode();
  }
}
