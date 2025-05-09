import { Component } from '@angular/core';
import { TOGGLE_NAMES } from '../example-params';

@Component({
  selector: 'app-examples',
  template: `
    <h2>Feature Flag Examples</h2>

    <!-- Single flag examples -->
    <div *featureEnabled="TOGGLE_NAMES.FEATURE_A">
      Feature A is enabled
    </div>

    <div *featureDisabled="TOGGLE_NAMES.FEATURE_B">
      Feature B is disabled
    </div>

    <!-- Multiple flags with OR -->
    <div *featureEnabled="[TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_B]">
      Either Feature A OR Feature B is enabled
    </div>

    <!-- Multiple flags with AND -->
    <div *featureEnabled="[TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_C] operator 'and'">
      Both Feature A AND Feature C are enabled
    </div>

    <!-- Multiple flags with OR and else template -->
    <div *featureEnabled="[TOGGLE_NAMES.FEATURE_B, TOGGLE_NAMES.FEATURE_D]; else notEnabled">
      Either Feature B OR Feature D is enabled
    </div>
    <ng-template #notEnabled>
      <div>
        Both Feature B AND Feature D are not enabled
      </div>
    </ng-template>

    <!-- Multiple flags with AND and else template -->
    <div *featureEnabled="[TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_B] operator 'and'; else notBothEnabled">
      Both Feature A AND Feature B are enabled
    </div>
    <ng-template #notBothEnabled>
      <div>
        Not all required features are enabled (A, B)
      </div>
    </ng-template>

    <!-- Multiple flags disabled with OR -->
    <div *featureDisabled="[TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_B]">
      Either Feature A OR Feature B is disabled
    </div>

    <!-- Multiple flags disabled with AND -->
    <div *featureDisabled="[TOGGLE_NAMES.FEATURE_B, TOGGLE_NAMES.FEATURE_D] operator 'and'">
      Both Feature B AND Feature D are disabled
    </div>

    <!-- Multiple flags disabled with AND and else template -->
    <div *featureDisabled="[TOGGLE_NAMES.FEATURE_C, TOGGLE_NAMES.FEATURE_B] operator 'and'; else notBothDisabled">
      Both Feature C AND Feature B are disabled
    </div>
    <ng-template #notBothDisabled>
      <div>
        Not all required features are disabled (C, B)
      </div>
    </ng-template>
  `,
  standalone: false
})
export class ExamplesComponent {
  readonly TOGGLE_NAMES = TOGGLE_NAMES;
}
