# @ukho/router-store

This project provides an `@ngrx/router-store` implementation including a custom state serialiser and an `@ngrx/store` selector.

## Usage

Import the NgModule from this library, and call the `forRoot()` method in the imports of your NgModule where you want to provide the router-store implementation.

For example:

```typescript
import { RouterStoreModule } from '@ukho/router-store';

...

@NgModule({
  imports: [
    ...
    RouterStoreModule.forRoot(),
  ],
  ...
})
export class AppModule {}
```
