import { Directive, Input, TemplateRef } from '@angular/core';
import { FeatureDirective } from './feature.directive';
import { NgIf, NgIfContext } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { JoinOperator } from './join-operator';

@Directive({
  selector: '[featureDisabled]',
  standalone: true,
  hostDirectives: [NgIf],
})
export class FeatureDisabledDirective extends FeatureDirective {
  @Input('featureDisabled') set toggleNames(val: string | string[]) {
    this.setToggleNames(Array.isArray(val) ? val : [val]);
  }

  @Input('featureDisabledOperator') set operator(val: JoinOperator) {
    this._operator = val.toLowerCase() as JoinOperator;
  }

  @Input('featureDisabledElse') set else(templateRef: TemplateRef<NgIfContext<boolean>> | null) {
    this.setElseTemplate(templateRef);
  }

  private _operator: JoinOperator = 'or';

  protected toggleState$ = (toggleNames: string[]) => {
    return combineLatest(
      toggleNames.map(name => this.unleashService.isDisabled$(name))
    ).pipe(
      map(states =>
        this._operator === 'and'
          ? states.every(state => state)
          : states.some(state => state)
      ),
    );
  };
}
