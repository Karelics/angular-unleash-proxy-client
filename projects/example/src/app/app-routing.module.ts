import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './components/a.component';
import { BComponent } from './components/b.component';
import { CComponent } from './components/c.component';
import { featureDisabled, featureEnabled } from 'angular-unleash-proxy-client';
import { TOGGLE_NAMES } from './example-params';
import { DComponent } from './components/d.component';

const routes: Routes = [
  // Single flag examples
  {
    path: 'single-enabled',
    component: AComponent,
    canActivate: [featureEnabled(TOGGLE_NAMES.FEATURE_A)]
  },
  {
    path: 'single-disabled',
    component: BComponent,
    canActivate: [featureDisabled(TOGGLE_NAMES.FEATURE_B)]
  },
  // Multiple flags with OR
  {
    path: 'multi-or',
    component: CComponent,
    canActivate: [featureEnabled([TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_B])]
  },
  // Multiple flags with AND
  {
    path: 'multi-and',
    component: AComponent,
    canActivate: [featureEnabled([TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_C], 'and')]
  },
  // Multiple flags with redirect
  {
    path: 'multi-redirect',
    component: BComponent,
    canActivate: [featureEnabled([TOGGLE_NAMES.FEATURE_B, TOGGLE_NAMES.FEATURE_C], 'and', '/redirect')]
  },
  // Multiple flags disabled with OR
  {
    path: 'multi-disabled-or',
    component: CComponent,
    canActivate: [featureDisabled([TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_B])]
  },
  {
    path: 'redirect',
    component: DComponent
  },
  {
    path: '',
    redirectTo: 'single-enabled',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
