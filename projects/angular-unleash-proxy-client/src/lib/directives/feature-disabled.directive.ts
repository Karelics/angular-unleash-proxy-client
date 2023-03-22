import { Directive, Input, TemplateRef } from '@angular/core';
import { FeatureDirective } from './feature.directive';
import { NgIfContext } from '@angular/common';

@Directive({
  selector: '[featureDisabled]',
  standalone: true,
})
export class FeatureDisabledDirective extends FeatureDirective {
  @Input('featureDisabled') set toggleName(val: string) {
    this.setToggleName(val);
  }

  @Input('featureDisabledElse')
  set else(templateRef: TemplateRef<NgIfContext<boolean>> | null) {
    super.ngIfElse = templateRef;
  }

  protected toggleState$ = this.unleashService.isDisabled$.bind(this.unleashService);
}
