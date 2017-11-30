import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { GmapsComponent } from './gmaps.component';
import { AgmCoreModule } from '@agm/core';
import { GMapsService } from '../Services/gmasp.service';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    SharedModule
  ],
  exports: [GmapsComponent, DataTableModule],
  declarations: [GmapsComponent]
})
export class GmapsModule { }
