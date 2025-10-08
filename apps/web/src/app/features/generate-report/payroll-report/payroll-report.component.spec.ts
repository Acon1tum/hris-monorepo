import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayrollReportComponent } from './payroll-report.component';

describe('PayrollReportComponent', () => {
  let component: PayrollReportComponent;
  let fixture: ComponentFixture<PayrollReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with payroll reports', () => {
    expect(component.reports.length).toBeGreaterThan(0);
  });

  it('should call generateReport when button is clicked', () => {
    spyOn(component, 'generateReport');
    
    // Simulate calling the method
    component.generateReport(1);
    
    expect(component.generateReport).toHaveBeenCalledWith(1);
  });
});