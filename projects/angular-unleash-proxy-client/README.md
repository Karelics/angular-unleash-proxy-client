# @karelics/angular-unleash-proxy-client

Angular wrapper for [unleash-proxy-client](https://github.com/Unleash/unleash-proxy-client-js).

## Usage

### 1. Configure unleash proxy

[Unleash proxy server](https://docs.getunleash.io/reference/unleash-proxy) should be run and configured.

### 2. Install

Install @karelics/angular-unleash-proxy-client from NPM.

```bash
npm install @karelics/angular-unleash-proxy-client
```

Install [unleash-proxy-client](https://github.com/Unleash/unleash-proxy-client-js) if it is not installed yet.

```bash
npm install unleash-proxy-client
```

### 3. Initialize

karelics/angular-unleash-proxy-client should be initialized once in AppModule (or bootstrap standalone component).

```typescript
import { provideUnleashProxy } from '@karelics/angular-unleash-proxy-client';

providers: [
  provideUnleashProxy({
    url: unleash_proxy_url,
    clientKey: client_key,
    appName: app_name,
  }),
]
```

### 4. Use

#### Directive

You can define **else** template similar to ***ngIf** directive.

```html
<div *featureEnabled="'feature_name'; else disabledTmpl">enabled</div>

<ng-template #disabledTmpl>disabled</ng-template>

<div *featureDisabled="'feature_name'">disabled</div>
```

#### Guard

Optionally you can define route to redirect if feature toggle condition was not met.

```typescript
const routes: Routes = [
  {
    path: 'a',
    canActivate:[
      featureEnabled('feature_name'),
    ],
    component: AComponent,
  },
  {
    path: 'b',
    canActivate:[
      featureDisabled('feature_name', 'c'),
    ],
    component: BComponent,
  },
  {
    path: 'c',
    component: CComponent,
  }
];
```

#### Service

**UnleashService** has the following logic around original unleash proxy client service:

- wraps original service events into observables
- provides **isEnabled/isDisabled** methods to check current toggle state
- provides **isEnabled$/isDisabled$** methods returning observable to be informed about toggle state changes

Other unleash service features can be accessed with **unleash** property.

```typescript
import { UnleashService } from '@karelics/angular-unleash-proxy-client';

@Injectable()
export class MyService {
  constructor(
    private unleashService: UnleashService,
  ) {
    // don't forget to unsubscribe
    this.unleashService.isEnabled$('feature_name').pipe(
      tap(...),
    ).subscribe();
  }
  
  methodA(): void {
    if (this.unleashService.isDisabled('feature_name')) {
      ...
    }
  }

  methodB(): void {
    this.unleashService.unleash.updateContext(...);
  }
}
```

#### Updates

Feature toggles state is requested from unleash proxy each time on page load, but by default unleash proxy client every 30 seconds requests updates from unleash proxy to perform runtime changes.
If requesting state on page load if enough in your case, you can disable updates using unleash configuration:

```typescript
import { provideUnleashProxy } from '@karelics/angular-unleash-proxy-client';

providers: [
  provideUnleashProxy({
    ... // other options
    disableRefresh: true,
    disableMetrics: true,
  }),
]
```
