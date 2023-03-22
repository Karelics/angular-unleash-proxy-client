import { Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export function redirectResult(redirectUrl?: string | UrlTree): UrlTree | Promise<boolean> | boolean {
  if (redirectUrl) {
    if (typeof redirectUrl === 'string') {
      const router = inject(Router);
      return router.navigateByUrl(redirectUrl);
    } else {
      return redirectUrl;
    }
  }
  return false;
}
