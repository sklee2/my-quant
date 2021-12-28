import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradedataSearchComponent } from './tradedata-search.component';

describe('TradedataSearchComponent', () => {
  let component: TradedataSearchComponent;
  let fixture: ComponentFixture<TradedataSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradedataSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradedataSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
