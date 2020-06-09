import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TableRoutingModule } from './table-routing.module';
import { TableComponentsModule } from './components';
import { TableStoreModule } from './store';
import { TableCoreModule } from './core';

@NgModule({
  imports: [
    HttpClientModule,
    TableRoutingModule,
    TableComponentsModule,
    TableStoreModule,
    TableCoreModule,
  ],
})
export class TableModule {}
