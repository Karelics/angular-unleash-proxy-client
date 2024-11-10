import { Component } from '@angular/core';

@Component({
  selector: 'app-b',
  template: `<h3>Component B</h3>
    <p>This component is protected by feature flag(s)</p>`,
  standalone: true
})
export class BComponent {}
