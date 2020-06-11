import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from '@ag-grid-community/angular';
import 'ag-grid-enterprise';

import { TableCoreModule } from '../core';

import { TableComponent } from './table';
import { HeaderSelectComponent } from './header-select';
import { ToolbarComponent } from './toolbar';

const COMPONENTS = [TableComponent, HeaderSelectComponent, ToolbarComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    AgGridModule.withComponents([HeaderSelectComponent, ToolbarComponent]),
  ],
  exports: [...COMPONENTS],
})
export class TableComponentsModule {}
