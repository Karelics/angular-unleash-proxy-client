import { Directive, Input } from '@angular/core';
import { FeatureDirective } from './feature.directive';

@Directive({
  selector: '[featureDisabled]',
  standalone: true,
})
export class FeatureDisabledDirective extends FeatureDirective {
  @Input('featureDisabled') set toggleName(val: string) {
    this.setToggleName(val);
  }

  protected stateValue(): boolean {
    return !this.unleashService.isEnabled(this.getToggleName());
  }
}
