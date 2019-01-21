import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

import { CustomRouterStoreState } from './router-state-serialiser';
import { stateKey } from './router-store.module';

export const selectRouterState = createFeatureSelector<RouterReducerState<CustomRouterStoreState>>(stateKey);
