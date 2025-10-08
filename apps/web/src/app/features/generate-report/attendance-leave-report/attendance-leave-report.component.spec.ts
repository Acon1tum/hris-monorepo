import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLeaveReportComponent } from './attendance-leave-report.component';

describe('AttendanceLeaveReportComponent', () => {
  let component: AttendanceLeaveReportComponent;
  let fixture: ComponentFixture<AttendanceLeaveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceLeaveReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceLeaveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
