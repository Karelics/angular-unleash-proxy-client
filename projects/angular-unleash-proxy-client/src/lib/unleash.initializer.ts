import { APP_INITIALIZER, EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { UnleashService } from './unleash.service';
import { take, tap } from 'rxjs';
import { IConfig as UnleashConfig } from 'unleash-proxy-client';

export const UNLEASH_CONFIG = new InjectionToken<UnleashConfig>('Unleash config');

export function provideUnleashProxy(
  config: UnleashConfig,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: UNLEASH_CONFIG, useValue: config },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const unleashService = inject(UnleashService);
        return () => unleashService.initialized$.pipe(
          take(1),
          tap(() => unleashService.unleash.start())
        );
      },
      multi: true,
    },
  ]);
}
