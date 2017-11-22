import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core'

import { AppComponent } from './app.component';
import { GmapsComponent } from './gmaps/gmaps.component';


@NgModule({
  declarations: [
    AppComponent,
    GmapsComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCl0ndlU6c7iUMHIBtlsrV2QE8Rr1ym59s'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
