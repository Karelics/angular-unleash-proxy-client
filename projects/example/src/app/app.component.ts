import { Component } from '@angular/core';
import { TOGGLE_NAME } from './example-params';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent {
  TOGGLE_NAME = TOGGLE_NAME;
}
