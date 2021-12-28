import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';  // 매우 중요(필수)
import { Observable,throwError } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { PKey } from './PKey';
import { SSOInfo } from './SSOInfo';

import { LoginEncParam } from './LoginEncParam';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const restUrl = 'http://localhost:2632';
const ezhubUrl = 'https://portal.hanyang.ac.kr/sso/lgnp.do';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginGb = 1;
  systemGb = "LIBRARY";

  constructor(private http: HttpClient) { }

  getPKey(): Observable <PKey>{
    return this.http.get<PKey>(`${restUrl}/tokenkey`)
    .pipe(catchError(this.handleErrorObservable));
  } 

  //cors 오류가 나서 사용하지 않음
  getEzhubData_o(userId:string, password:string, keyNm:string): Observable <SSOInfo>{
    return this.http.get<SSOInfo>(`${ezhubUrl}?loginGb=${this.loginGb}&systemGb=${this.systemGb}&userId=${userId}&password=${password}&keyNm=${keyNm}`)
    .pipe(catchError(this.handleErrorObservable));

  }
  
  //get 방식 로그인
  getEzhubData(userId:string, password:string, keyNm:string): Observable <SSOInfo>{
    return this.http.get<SSOInfo>(`${restUrl}/sso?encryptId=${userId}&encryptPassword=${password}&keyName=${keyNm}`)
    .pipe(catchError(this.handleErrorObservable));

  }
  //post 방식 로그인
  getEzhubData_post(loginEncParam:LoginEncParam): Observable <SSOInfo>{
    return this.http.post<SSOInfo>(`${restUrl}/sso2`,loginEncParam, httpOptions)
    .pipe(catchError(this.handleErrorObservable));

  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return throwError(error.message || error);
 }

 

}
