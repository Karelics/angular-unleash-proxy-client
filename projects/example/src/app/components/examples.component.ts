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
    <div *featureEnabled="[TOGGLE_NAMES.FEATURE_B, TOGGLE_NAMES.FEATURE_C]; else notEnabled">
      Either Feature B OR Feature C is enabled
    </div>
    <ng-template #notEnabled>
      Neither Feature B nor Feature C is enabled
    </ng-template>

    <!-- Multiple flags with AND and else template -->
    <div *featureEnabled="[TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_B] operator 'and'; else notBothEnabled">
      Both Feature A AND Feature B are enabled
    </div>
    <ng-template #notBothEnabled>
      Not all required features are enabled
    </ng-template>

    <!-- Multiple flags disabled with OR -->
    <div *featureDisabled="[TOGGLE_NAMES.FEATURE_A, TOGGLE_NAMES.FEATURE_B]">
      Either Feature A OR Feature B is disabled
    </div>

    <!-- Multiple flags disabled with AND -->
    <div *featureDisabled="[TOGGLE_NAMES.FEATURE_B, TOGGLE_NAMES.FEATURE_C] operator 'and'">
      Both Feature B AND Feature C are disabled
    </div>
  `
})
export class ExamplesComponent {
  readonly TOGGLE_NAMES = TOGGLE_NAMES;
}
