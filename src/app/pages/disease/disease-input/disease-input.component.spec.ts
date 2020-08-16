import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseInputComponent } from './disease-input.component';

describe('DiseaseInputComponent', () => {
  let component: DiseaseInputComponent;
  let fixture: ComponentFixture<DiseaseInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
