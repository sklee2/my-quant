import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  htmlContent:string;
  constructor() { }

  ngOnInit(): void {
    this.htmlContent = "Hello!!";
  }

}
