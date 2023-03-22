import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { UnleashService } from '../unleash.service';
import { redirectResult } from './utils';

export function featureEnabled(toggleName: string, redirectUrl?: string | UrlTree): CanActivateFn {
  return () => {
    const unleashService = inject(UnleashService);
    return unleashService.isEnabled(toggleName) || redirectResult(redirectUrl);
  };
}
