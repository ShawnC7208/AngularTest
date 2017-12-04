import { Component, OnInit } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader, AgmMarker } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';
import { Observable } from "rxjs/Observable";
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Imarker, IlocationData } from '../Shared/Interfaces'
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
  clickedMarker: Imarker = { lat: this.lat, lng: this.lng };
  StreetAddress: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  CityStateZip: string = '';
  ZestimateValue: number = 0;
  ZestimateValueHigh: number = 0;
  ZestimateValueLow: number = 0;
  test: string = 'testing';
  locationData: IlocationData[] = [];

  constructor(private gMapsService: GMapsService, private zillowService: ZillowService) { }

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
    let that = this;
    let zillowResponse = this.gMapsService.getAddressUsingCoordinates(this.lat, this.lng)
      .pipe(mergeMap(res => {
        console.log(res.body.results[0]);
        this.StreetAddress = res.body.results[0].address_components[0].long_name + ' ' + res.body.results[0].address_components[1].long_name;
        this.city = res.body.results[0].formatted_address.split(',')[1];
        this.state = res.body.results[0].formatted_address.split(',')[2].split(' ')[1];
        this.zip = res.body.results[0].formatted_address.split(',')[2].split(' ')[2];
        this.CityStateZip = this.city + ', ' + this.state;
        return this.zillowService.getHomeInfoUsingAddress(this.StreetAddress, this.CityStateZip)
      })
      ).subscribe(response => {
        parseString(response.body, function (err, result) {
          that.ZestimateValue = Number(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._);
          that.ZestimateValueHigh = Number(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].valuationRange[0].high[0]._);
          that.ZestimateValueLow = Number(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].valuationRange[0].low[0]._);
          that.locationData.push({ 'address': that.StreetAddress, 'cityStateZip': that.CityStateZip, 
                                  'zestimate': that.ZestimateValue, 'zestimateLow': that.ZestimateValueLow, 'zestimateHigh': that.ZestimateValueHigh,
                                  'monthlyRent': (that.ZestimateValue * .1)/12, 'yearlyRent': (that.ZestimateValue * .1), 
                                  'taxInsurance': (that.ZestimateValue * .027), 'HOA': (that.ZestimateValue * .013)
                                 });
        });
      });
  }

  search() {
    this.CityStateZip = this.city + ', ' + this.state;
    let that = this;
    this.zillowService.getHomeInfoUsingAddress(this.StreetAddress, this.CityStateZip)
      .subscribe(response => {
        console.log((response.body));
        parseString(response.body, function (err, result) {
          console.log(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._);
          that.ZestimateValue = Number(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].amount[0]._);
          that.ZestimateValueHigh = Number(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].valuationRange[0].high[0]._);
          that.ZestimateValueLow = Number(result["SearchResults:searchresults"].response[0].results[0].result[0].zestimate[0].valuationRange[0].low[0]._);
          that.locationData.push({ 'address': that.StreetAddress, 'cityStateZip': that.CityStateZip, 
                                  'zestimate': that.ZestimateValue, 'zestimateLow': that.ZestimateValueLow, 'zestimateHigh': that.ZestimateValueHigh,
                                  'monthlyRent': (that.ZestimateValue * .1)/12, 'yearlyRent': (that.ZestimateValue * .1), 
                                  'taxInsurance': (that.ZestimateValue * .027), 'HOA': (that.ZestimateValue * .013)
                                });
        })
      });
  }
}
