import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningDevReportComponent } from './learning-dev-report.component';

describe('LearningDevReportComponent', () => {
  let component: LearningDevReportComponent;
  let fixture: ComponentFixture<LearningDevReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningDevReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningDevReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
