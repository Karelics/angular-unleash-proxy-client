import { Component } from '@angular/core';
import { TOGGLE_NAMES } from './example-params';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [''],
  standalone: false,
})
export class AppComponent {
  TOGGLE_NAMES = TOGGLE_NAMES;
}
