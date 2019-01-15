import { CustomRouterStoreState, stateKey } from '@ukho/router-store';

const emptyRouterState = {
  url: '',
  params: {},
  queryParams: {},
};

export class RouterFeatureStateBuilder {
  constructor(private readonly _routerState: CustomRouterStoreState = emptyRouterState) {}

  public get routerState(): CustomRouterStoreState {
    return this._routerState;
  }

  public withActivatedRoute(
    route: Partial<CustomRouterStoreState> & Pick<CustomRouterStoreState, 'params'>,
  ): RouterFeatureStateBuilder {
    this._routerState.params = route.params;
    return this;
  }

  public build(): { [id: string]: { state: CustomRouterStoreState } } {
    return { [stateKey]: { state: this.routerState } };
  }
}
