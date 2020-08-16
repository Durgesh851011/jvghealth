import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInputComponent } from './doctor-input.component';

describe('DoctorInputComponent', () => {
  let component: DoctorInputComponent;
  let fixture: ComponentFixture<DoctorInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
