# Angular Unleash Proxy Client

Angular implementation of the [unleash-proxy-client](https://github.com/Unleash/unleash-proxy-client-js).

## Installation

```bash
npm install @karelics/angular-unleash-proxy-client
```

Install [unleash-proxy-client](https://github.com/Unleash/unleash-proxy-client-js) if it is not installed yet.

```bash
npm install unleash-proxy-client
```

## Setup

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

## Usage

### Directives

You can use directives to conditionally show/hide content based on feature flag states:

#### Single Feature Flag
```html
<!-- Show content when feature is enabled -->
<div *featureEnabled="'myFeature'">
  Feature is enabled
</div>

<!-- Show content when feature is disabled -->
<div *featureDisabled="'myFeature'">
  Feature is disabled
</div>

<!-- With else template -->
<div *featureEnabled="'myFeature'; else disabled">
  Feature is enabled
</div>
<ng-template #disabled>
  Feature is disabled
</ng-template>
```

#### Multiple Feature Flags
```html
<!-- Show when ANY feature is enabled (OR) -->
<div *featureEnabled="['feature1', 'feature2']">
  Either feature1 OR feature2 is enabled
</div>

<!-- Show when ALL features are enabled (AND) -->
<div *featureEnabled="['feature1', 'feature2'] operator 'and'">
  Both feature1 AND feature2 are enabled
</div>

<!-- With else template -->
<div *featureEnabled="['feature1', 'feature2'] operator 'and'; else notAllEnabled">
  All features are enabled
</div>
<ng-template #notAllEnabled>
  Not all features are enabled
</ng-template>

<!-- Similar usage for featureDisabled -->
<div *featureDisabled="['feature1', 'feature2'] operator 'or'">
  Either feature1 OR feature2 is disabled
</div>
```

### Route Guards

You can protect routes using feature flags:

#### Single Feature Flag
```typescript
const routes: Routes = [
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [featureEnabled('myFeature')]
  },
  {
    path: 'protected-with-redirect',
    component: ProtectedComponent,
    canActivate: [featureEnabled('myFeature', '/access-denied')]
  }
];
```

#### Multiple Feature Flags
```typescript
const routes: Routes = [
  // Route accessible when ANY feature is enabled
  {
    path: 'protected-or',
    component: ProtectedComponent,
    canActivate: [featureEnabled(['feature1', 'feature2'])]
  },
  // Route accessible when ALL features are enabled
  {
    path: 'protected-and',
    component: ProtectedComponent,
    canActivate: [featureEnabled(['feature1', 'feature2'], 'and')]
  },
  // With redirect URL
  {
    path: 'protected-with-redirect',
    component: ProtectedComponent,
    canActivate: [featureEnabled(['feature1', 'feature2'], 'and', '/access-denied')]
  },
  // Similar usage for featureDisabled
  {
    path: 'disabled-features',
    component: DisabledComponent,
    canActivate: [featureDisabled(['feature1', 'feature2'], 'or', '/dashboard')]
  }
];
```

### Service

You can also use the **UnleashService** directly. **UnleashService** has the following logic around original unleash proxy client service:

- wraps original service events into observables
- provides **isEnabled/isDisabled** methods to check current toggle state
- provides **isEnabled$/isDisabled$** methods returning observable to be informed about toggle state changes

Other unleash service features can be accessed with **unleash** property.

```typescript
import { UnleashService } from '@karelics/angular-unleash-proxy-client';

@Injectable()
export class MyService {
  private unleashService = inject(UnleashService);

  checkFeature() {
    // Synchronous check
    if (this.unleashService.isEnabled('myFeature')) {
      // Feature is enabled
    }

    // Reactive check (don't forget to unsubscribe)
    this.unleashService.isEnabled$('feature_name').pipe(
      tap(...),
    ).subscribe();
  }

  updateContext(): void {
    this.unleashService.unleash.updateContext(...);
  }
}
```
## Updates

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

## License

MIT
