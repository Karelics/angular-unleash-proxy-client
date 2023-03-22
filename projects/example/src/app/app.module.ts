import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureEnabledDirective, provideUnleashProxy } from 'angular-unleash-proxy-client';
import { EXAMPLE_CONFIG } from './example-params';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatureEnabledDirective,
  ],
  providers: [
    provideUnleashProxy(EXAMPLE_CONFIG),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
