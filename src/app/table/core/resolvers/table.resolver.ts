import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { TableFacade } from '../../store';

@Injectable({ providedIn: 'root' })
export class TableResolver implements Resolve<any> {
  constructor(private tableFacade: TableFacade) {}

  resolve(): void {
    this.tableFacade.getVideos();
  }
}
