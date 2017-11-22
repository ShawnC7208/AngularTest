import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader, AgmMarker } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';

import { Imarker } from '../Shared/Interfaces'
import { GMapsService } from '../Services/gmasp.service'

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {
  lat: number = 32.776664;
  lng: number = -96.796988;
  clickedMarker: Imarker = {lat:this.lat,lng:this.lng};
  StreetAddress: any = [];
  CityStateZip: any = [];

  constructor(private gMapsService: GMapsService) { 
    //let geocoder = new google.maps.Geocoder();
  }

  ngOnInit() {
    this.clickedMarker.lat = this.lat;
    this.clickedMarker.lng = this.lng;
  }

  mapClicked($event: any) {
      this.lat = $event.coords.lat;
      this.lng = $event.coords.lng;
      this.clickedMarker.lat = this.lat;
      this.clickedMarker.lng = this.lng;
      console.log(this.lat);
      console.log(this.lng);

      this.gMapsService.getAddressUsingCoordinates(this.lat, this.lng).subscribe(res => { 
        console.log(res.body.results[0]);
        console.log(res.body.results[0].formatted_address.split(','));
        this.StreetAddress = res.body.results[0].address_components[0].long_name + ' ' + res.body.results[0].address_components[1].long_name;
        let city = res.body.results[0].formatted_address.split(',')[1];
        let state = res.body.results[0].formatted_address.split(',')[2].split(' ')[1];
        let zip = res.body.results[0].formatted_address.split(',')[2].split(' ')[2];
        this.CityStateZip = city + ', ' + state;
      });

      //Call zillow API using StreetAddress and city/state/zip

  }


}
