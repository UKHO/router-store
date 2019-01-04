import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface CustomRouterStoreState {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<CustomRouterStoreState> {
  public serialize(routerState: RouterStateSnapshot): CustomRouterStoreState {
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = this.findFirstChild(routerState.root);

    return { url, params, queryParams };
  }

  private findFirstChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.findFirstChild(route.firstChild) : route;
  }
}
