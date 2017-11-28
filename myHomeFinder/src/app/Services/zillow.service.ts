import { HttpClient, HttpEvent, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ZillowService {
    baseUrl: string = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=';
    zillowId: string = 'X1-ZWz1bd18cvjsaz_8p8sy';
    ZillowHeader: HttpHeaders = new HttpHeaders();
    proxyUrl: string = "https://cors-anywhere.herokuapp.com/";
    

    constructor(private http: HttpClient) { 
        this.ZillowHeader.append('Access-Control-Allow-Headers', 'Content-Type');
        this.ZillowHeader.append('Access-Control-Allow-Methods', 'GET');
        this.ZillowHeader.append('Access-Control-Allow-Origin', '*');
    }

    getHomeInfoUsingAddress (address: string, cityStateZip: string): Observable<any> {
        return this.http.get<any>(`${this.proxyUrl}${this.baseUrl}${this.zillowId}&address=${address}&citystatezip=${cityStateZip}`,
        {headers: this.ZillowHeader, observe: 'response', responseType: 'text' as 'json', withCredentials: false});
    }

}