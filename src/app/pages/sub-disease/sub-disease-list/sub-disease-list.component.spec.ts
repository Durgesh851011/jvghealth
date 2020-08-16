import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDiseaseListComponent } from './sub-disease-list.component';

describe('SubDiseaseListComponent', () => {
  let component: SubDiseaseListComponent;
  let fixture: ComponentFixture<SubDiseaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDiseaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDiseaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
