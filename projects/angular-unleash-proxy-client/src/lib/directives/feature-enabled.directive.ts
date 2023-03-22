import { Directive, Input, TemplateRef } from '@angular/core';
import { FeatureDirective } from './feature.directive';
import { NgIfContext } from '@angular/common';

@Directive({
  selector: '[featureEnabled]',
  standalone: true,
})
export class FeatureEnabledDirective extends FeatureDirective {
  @Input('featureEnabled') set toggleName(val: string) {
    this.setToggleName(val);
  }

  @Input('featureEnabledElse')
  set else(templateRef: TemplateRef<NgIfContext<boolean>> | null) {
    super.ngIfElse = templateRef;
  }

  protected toggleState$ = this.unleashService.isEnabled$.bind(this.unleashService);
}
