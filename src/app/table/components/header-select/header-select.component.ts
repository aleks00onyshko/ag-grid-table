import { Component, OnInit } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';

import { TableFacade } from '../../store';

@Component({
  selector: 'app-table-header-select',
  templateUrl: 'header-select.component.html',
})
export class HeaderSelectComponent implements IHeaderAngularComp {
  constructor(public tableFacade: TableFacade) {}

  agInit() {}

  toggleOverallSelection(): void {
    this.tableFacade.toggleOverallSelection();
  }
}
