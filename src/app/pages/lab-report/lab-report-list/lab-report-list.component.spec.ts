import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabReportListComponent } from './lab-report-list.component';

describe('LabReportListComponent', () => {
  let component: LabReportListComponent;
  let fixture: ComponentFixture<LabReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
