import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from '@ag-grid-community/angular';
import 'ag-grid-enterprise';

import { TableCoreModule } from '../core';

import { TableComponent } from './table';
import { HeaderSelectComponent } from './header-select';

const COMPONENTS = [TableComponent, HeaderSelectComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    TableCoreModule,
    AgGridModule.withComponents([HeaderSelectComponent]),
  ],
  exports: [...COMPONENTS],
})
export class TableComponentsModule {}
