import { HttpClient, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ZillowService {
    baseUrl: string = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=';
    zillowId: string = 'X1-ZWz1bd18cvjsaz_8p8sy';

    constructor(private http: HttpClient) { }

    getHomeInfoUsingAddress (address: string, cityStateZip: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}<${this.zillowId}>&address=${address}&citystatezip=${cityStateZip}`, 
        { observe: 'response' });
    }

}