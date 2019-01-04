import { ModuleWithProviders, NgModule } from '@angular/core';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { CustomRouterStateSerializer } from './router-state-serialiser';

export const stateKey = 'router';

@NgModule()
export class RouterStoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      // tslint:disable-next-line:no-use-before-declare
      ngModule: RootRouterStoreModule,
    };
  }
}

@NgModule({
  imports: [
    RouterStoreModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterStateSerializer,
      stateKey,
    }),
    StoreModule.forFeature(stateKey, routerReducer),
  ],
})
export class RootRouterStoreModule {}
