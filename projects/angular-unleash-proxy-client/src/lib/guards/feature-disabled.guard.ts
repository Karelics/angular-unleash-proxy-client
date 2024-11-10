import { inject } from '@angular/core';
import { CanActivateFn, UrlTree } from '@angular/router';
import { UnleashService } from '../unleash.service';
import { redirectResult } from './utils';
import { JoinOperator } from '../directives/join-operator';

export function featureDisabled(toggleName: string, redirectUrl?: string | UrlTree): CanActivateFn;
export function featureDisabled(toggleNames: string[], operator?: JoinOperator, redirectUrl?: string | UrlTree): CanActivateFn;
export function featureDisabled(
  toggleNames: string | string[],
  operatorOrRedirectUrl?: JoinOperator | string | UrlTree,
  redirectUrl?: string | UrlTree
): CanActivateFn {
  return () => {
    const unleashService = inject(UnleashService);

    const effectiveToggleNames = Array.isArray(toggleNames) ? toggleNames : [toggleNames];
    const effectiveOperator = Array.isArray(toggleNames) ? (operatorOrRedirectUrl ?? 'and') as JoinOperator : 'and';
    const effectiveRedirectUrl = Array.isArray(toggleNames) ? redirectUrl : operatorOrRedirectUrl as (string | UrlTree);

    const states = effectiveToggleNames.map(toggle => unleashService.isDisabled(toggle));
    const disabledState = effectiveOperator === 'and' ? states.every(Boolean) : states.some(Boolean);

    return disabledState || redirectResult(effectiveRedirectUrl);
  };
}
