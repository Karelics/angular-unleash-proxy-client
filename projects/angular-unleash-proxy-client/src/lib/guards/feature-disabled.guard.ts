import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { UnleashService } from '../unleash.service';
import { redirectResult } from './utils';

export function featureDisabled(toggleName: string, redirectUrl?: string | UrlTree): CanActivateFn {
  return () => {
    const unleashService = inject(UnleashService);
    return !unleashService.unleash.isEnabled(toggleName) || redirectResult(redirectUrl);
  };
}
