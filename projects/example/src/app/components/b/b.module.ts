import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BComponent } from './b.component';

const PUBLIC_DECLARATIONS = [BComponent];

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
export class BModule { }
