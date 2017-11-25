import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader, AgmMarker } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';
import { Observable } from "rxjs/Observable";
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Imarker } from '../Shared/Interfaces'
import { GMapsService } from '../Services/gmasp.service'
import { ZillowService } from '../Services/zillow.service';
import { Parser, parseString } from "xml2js";

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {
  lat: number = 32.882957;
  lng: number = -97.15937500000001;
  clickedMarker: Imarker = {lat:this.lat,lng:this.lng};
  StreetAddress: any = [];
  CityStateZip: any = [];
  ZestimateValue: any = [];

  constructor(private gMapsService: GMapsService, private zillowService: ZillowService) { 
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

      this.gMapsService.getAddressUsingCoordinates(this.lat, this.lng)
      .subscribe(res => { 
        console.log(res.body.results[0]);
        this.StreetAddress = res.body.results[0].address_components[0].long_name + ' ' + res.body.results[0].address_components[1].long_name;
        let city = res.body.results[0].formatted_address.split(',')[1];
        let state = res.body.results[0].formatted_address.split(',')[2].split(' ')[1];
        let zip = res.body.results[0].formatted_address.split(',')[2].split(' ')[2];
        this.CityStateZip = city + ', ' + state;

        });

        this.zillowService.getHomeInfoUsingAddress(this.StreetAddress, this.CityStateZip).subscribe(res => {
          console.log((res.body));
          parseString(res.body, function(err, result) { 
            console.dir(result["SearchResults:searchresults"].response[0].results[0].result[0]);
            console.dir(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._);
            console.log(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._);
            this.ZestimateValue = 0;
            this.ZestimateValue = String(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._);
          })
      });
  }


}
