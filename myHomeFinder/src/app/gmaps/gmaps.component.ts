import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader, AgmMarker } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {
  lat: number = 32.776664;
  lng: number = -96.796988;

  constructor() { 
    //let geocoder = new google.maps.Geocoder();
  }

  ngOnInit() {
  }

  clickedMarker(lat: number, lng: number) {
    console.log(lat);
  }

  mapClicked($event: any) {
      this.lat = $event.coords.lat;
      this.lng = $event.coords.lng;
      console.log(this.lat);
      console.log(this.lng);
  }
}
