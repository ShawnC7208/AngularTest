import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GmapsComponent } from './gmaps/gmaps.component';

import { GMapsService } from './Services/gmasp.service';
import { HttpClientModule } from '@angular/common/http';
import { ZillowService } from './Services/zillow.service';
import { ContextMenuModule, MenuItem, DataTableModule, DataTable, SharedModule, InputTextModule, ButtonModule, Button } from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    GmapsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ContextMenuModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCl0ndlU6c7iUMHIBtlsrV2QE8Rr1ym59s'
    })
  ],
  providers: [GMapsService, HttpClient, ZillowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
