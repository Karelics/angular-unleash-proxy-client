import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AComponent } from './a.component';

const PUBLIC_DECLARATIONS = [AComponent];

@NgModule({
  declarations: [
    ...PUBLIC_DECLARATIONS
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...PUBLIC_DECLARATIONS,
  ]
})
export class AModule { }
