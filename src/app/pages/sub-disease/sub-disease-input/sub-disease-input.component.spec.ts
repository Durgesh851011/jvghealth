import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDiseaseInputComponent } from './sub-disease-input.component';

describe('SubDiseaseInputComponent', () => {
  let component: SubDiseaseInputComponent;
  let fixture: ComponentFixture<SubDiseaseInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDiseaseInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDiseaseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
