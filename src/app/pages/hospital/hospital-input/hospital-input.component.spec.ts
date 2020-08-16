import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalInputComponent } from './hospital-input.component';

describe('HospitalInputComponent', () => {
  let component: HospitalInputComponent;
  let fixture: ComponentFixture<HospitalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
