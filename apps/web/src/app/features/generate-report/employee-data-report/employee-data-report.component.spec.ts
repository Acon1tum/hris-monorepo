import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataReportComponent } from './employee-data-report.component';

describe('EmployeeDataReportComponent', () => {
  let component: EmployeeDataReportComponent;
  let fixture: ComponentFixture<EmployeeDataReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDataReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
