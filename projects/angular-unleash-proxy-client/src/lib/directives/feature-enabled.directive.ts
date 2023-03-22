import { Directive, Input } from '@angular/core';
import { FeatureDirective } from './feature.directive';

@Directive({
  selector: '[featureEnabled]',
  standalone: true,
})
export class FeatureEnabledDirective extends FeatureDirective {
  @Input('featureEnabled') set toggleName(val: string) {
    this.setToggleName(val);
  }

  protected stateValue(): boolean {
    return this.unleashService.isEnabled(this.getToggleName());
  }
}
