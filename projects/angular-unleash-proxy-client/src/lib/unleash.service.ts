import { Inject, Injectable } from '@angular/core';
import { EVENTS, IConfig as UnleashConfig, UnleashClient } from 'unleash-proxy-client';
import { UNLEASH_CONFIG } from './unleash.initializer';
import { fromEvent, shareReplay } from 'rxjs';
import { ImpressionEvent } from './events/impression';

@Injectable({
  providedIn: 'root',
})
export class UnleashService {
  readonly unleash = new UnleashClient(this.config);

  readonly initialized$ = fromEvent<void>(this.unleash, EVENTS.INIT).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  readonly error$ = fromEvent<unknown>(this.unleash, EVENTS.ERROR).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  readonly ready$ = fromEvent<void>(this.unleash, EVENTS.READY).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  readonly update$ = fromEvent<void>(this.unleash, EVENTS.UPDATE).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  readonly impression$ = fromEvent<ImpressionEvent>(this.unleash, EVENTS.IMPRESSION).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  constructor(
    @Inject(UNLEASH_CONFIG) private readonly config: UnleashConfig,
  ) { }

  isEnabled(featureFlag: string): boolean {
    return this.unleash.isEnabled(featureFlag);
  }
}
