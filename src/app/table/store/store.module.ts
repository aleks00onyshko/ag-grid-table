import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TableEffects } from './effects';
import { tableReducer } from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('table', tableReducer),
    EffectsModule.forFeature([TableEffects]),
  ],
})
export class TableStoreModule {}
