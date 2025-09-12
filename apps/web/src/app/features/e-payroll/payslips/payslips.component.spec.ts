import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipsComponent } from './payslips.component';

describe('PayslipsComponent', () => {
  let component: PayslipsComponent;
  let fixture: ComponentFixture<PayslipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayslipsComponent]
    });
    fixture = TestBed.createComponent(PayslipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
