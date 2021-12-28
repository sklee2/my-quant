import { AfterViewInit, ViewChild,Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { TradeData } from '../TradeData';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tradedata-search',
  templateUrl: './tradedata-search.component.html',
  styleUrls: ['./tradedata-search.component.css']
})
export class TradedataSearchComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['symbol', 'trading_date', 'close', 'volume'];
 // tradeData: TradeData[] = [];
  model: string;
  dataSource = new MatTableDataSource<TradeData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  constructor(public rest: RestService
    ) { }

  ngOnInit(): void {
    //this.getTradeData();
  }

  getTradeData(): void {
    this.rest.getTradeData(this.model).subscribe((resp: any) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }


}
