import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GmapsComponent } from './gmaps/gmaps.component';

import { GMapsService } from './Services/gmasp.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    GmapsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCl0ndlU6c7iUMHIBtlsrV2QE8Rr1ym59s'
    })
  ],
  providers: [GMapsService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
