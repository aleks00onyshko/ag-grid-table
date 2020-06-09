import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './components';
import { TableResolver } from './core/resolvers';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    resolve: {
      tableResolver: TableResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
