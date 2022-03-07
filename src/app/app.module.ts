import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { components, services } from './declaration';

@NgModule({
  declarations: [
    AppComponent,
    ...components
  ],
  imports: [
    BrowserModule
  ],
  providers: services,
  bootstrap: [AppComponent]
})
export class AppModule { }
