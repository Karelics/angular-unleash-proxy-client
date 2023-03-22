[![License: MIT][license-mit-badge]][license-mit]
[![npm version][npm-version-badge]][npm]

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

```html
<div *featureEnabled="'feature_name'"></div>
<div *featureDisabled="'feature_name'"></div>
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

**UnleashService** wraps only original service events into observables and **isEnabled** method. Other unleash service features can be accessed with **unleash** property.

```typescript
import { UnleashService } from '@karelics/angular-unleash-proxy-client';

@Injectable()
export class MyService {
  constructor(
    private unleashService: UnleashService,
  ) { }
  
  methodA(): void {
    if (this.unleashService.isEnabled('feature_name')) {
      ...
    }
  }

  methodB(): void {
    this.unleashService.unleash.updateContext(...);
  }
}
```
