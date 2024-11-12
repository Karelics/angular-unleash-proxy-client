import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamplesComponent } from './components/examples.component';
import { FeatureDisabledDirective, FeatureEnabledDirective, provideUnleashProxy } from 'angular-unleash-proxy-client';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EXAMPLE_CONFIG } from './example-params';

@NgModule({
  declarations: [
    AppComponent,
    ExamplesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatureEnabledDirective,
    FeatureDisabledDirective
  ],
  providers: [
    provideUnleashProxy(EXAMPLE_CONFIG),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
