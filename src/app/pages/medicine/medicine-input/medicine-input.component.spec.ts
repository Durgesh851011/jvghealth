import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineInputComponent } from './medicine-input.component';

describe('MedicineInputComponent', () => {
  let component: MedicineInputComponent;
  let fixture: ComponentFixture<MedicineInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
