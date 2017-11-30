import { HttpClient, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { map, catchError } from 'rxjs/operators';
import { IlocationData } from "../Shared/Interfaces";

@Injectable()
export class GMapsService {
    baseUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    key: string = 'AIzaSyCl0ndlU6c7iUMHIBtlsrV2QE8Rr1ym59s'
    
    constructor(private http: HttpClient) { }

    getAddressUsingCoordinates(lat:number, lng:number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}${lat},${lng}&key=${this.key}`, 
        { observe: 'response' });
    }
}