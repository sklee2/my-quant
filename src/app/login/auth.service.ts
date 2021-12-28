import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private router: Router){}

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(100),
      tap(val => this.isLoggedIn = true)
    );
  }



  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);

  }
}
