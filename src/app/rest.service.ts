import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { TradeData } from './TradeData';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const restUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  getTradeData(symbol:string): Observable <TradeData[]>{
    return this.http.get<TradeData[]>(`${restUrl}/tradeData?symbol=${symbol}`)
    .pipe(catchError(this.handleErrorObservable));

  } 

  // private handleError(error: HttpErrorResponse): any {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return throwError(error.message || error);
 }
}