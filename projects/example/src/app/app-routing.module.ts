import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { CComponent } from './components/c/c.component';
import { featureDisabled, featureEnabled } from 'angular-unleash-proxy-client';
import { TOGGLE_NAME } from './example-params';

const routes: Routes = [
  {
    path: 'a',
    canActivate:[
      featureEnabled(TOGGLE_NAME),
    ],
    component: AComponent,
  },
  {
    path: 'b',
    canActivate:[
      featureDisabled(TOGGLE_NAME, 'c'),
    ],
    component: BComponent,
  },
  {
    path: 'c',
    component: CComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
