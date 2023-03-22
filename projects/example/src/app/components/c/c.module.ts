import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CComponent } from './c.component';

const PUBLIC_DECLARATIONS = [CComponent];

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
export class CModule { }
