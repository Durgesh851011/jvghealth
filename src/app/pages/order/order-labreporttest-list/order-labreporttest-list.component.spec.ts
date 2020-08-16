import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLabreporttestListComponent } from './order-labreporttest-list.component';

describe('OrderLabreporttestListComponent', () => {
  let component: OrderLabreporttestListComponent;
  let fixture: ComponentFixture<OrderLabreporttestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLabreporttestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLabreporttestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
