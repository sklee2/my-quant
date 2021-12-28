import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
    // this.router.navigate(['login']);
  }
}
