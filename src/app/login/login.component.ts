import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';
import { LoginEncParam } from './LoginEncParam';
import { PKey } from './PKey';
import { SSOInfo } from './SSOInfo';

declare var fnRSAEnc: any;
declare var _public_key_nm: any;
declare var _public_key: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ssoInfo: SSOInfo = new SSOInfo();
  message: string;
  memberNo: string;
  memberPassword: string;
  pKey: PKey = new PKey();
  loginEncParam :LoginEncParam = new LoginEncParam();

  constructor(public authService: AuthService, public router: Router, public loginService: LoginService) {
    this.setMessage();
  }

  ngOnInit(): void {
    this.getKey();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  getKey(): void {
    this.loginService.getPKey().subscribe(data => {
      this.pKey = data;
      _public_key_nm = this.pKey.kName;
      _public_key = this.pKey.kData;
      console.log(_public_key_nm);
      console.log(_public_key);
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  loginCkeck() {


    this.loginService.getEzhubData(fnRSAEnc(this.memberNo), fnRSAEnc(this.memberPassword), _public_key_nm)
      .subscribe(data => {
        this.ssoInfo = data;

        if ((this.ssoInfo.rCode == 200) || (this.ssoInfo.rCode == 504)) {
          this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
              let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';


              let navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
                preserveFragment: true
              };

              this.router.navigate([redirect], navigationExtras);
            }
          });
        }
      })
    // console.log(fnRSAEnc(this.memberNo));
    // console.log(fnRSAEnc(this.memberPassword));
    // console.log(_public_key_nm);
  }

  loginCkeck2() {


  
    this.loginEncParam.encryptId =  fnRSAEnc(this.memberNo);
    this.loginEncParam.encryptPassword = fnRSAEnc(this.memberPassword);
    this.loginEncParam.keyName = _public_key_nm;

    console.log(this.loginEncParam.encryptId);
    console.log(this.loginEncParam.encryptPassword);
    console.log(this.loginEncParam.keyName);


    this.loginService.getEzhubData_post(this.loginEncParam)
      .subscribe(data => {
        this.ssoInfo = data;

        if ((this.ssoInfo.rCode == 200) || (this.ssoInfo.rCode == 504)) {
          this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
              let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';


              let navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
                preserveFragment: true
              };

              this.router.navigate([redirect], navigationExtras);
            }
          });
        }
      })

  }

}
