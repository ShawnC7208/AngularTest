import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { GmapsComponent } from './gmaps.component';
import { AgmCoreModule } from '@agm/core';
import { GMapsService } from '../Services/gmasp.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    SharedModule,
    AgmCoreModule,
    FormsModule
  ],
  exports: [GmapsComponent, DataTableModule],
  declarations: [GmapsComponent]
})
export class GmapsModule { }
