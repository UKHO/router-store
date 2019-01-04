import { selectRouterState } from './router-state-selector';

describe('selectRouterState', () => {
  it('should select the router state', () => {
    const state = {
      router: 'test',
    };

    expect(selectRouterState(state)).toEqual('test');
  });
});
