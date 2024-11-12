import { Component } from '@angular/core';

@Component({
  selector: 'app-a',
  template: `<h3>Component A</h3>
    <p>This component is protected by feature flag(s)</p>`,
  standalone: true
})
export class AComponent {}
