import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustDashboardComponent } from './cust-dashboard.component';

describe('CustDashboardComponent', () => {
  let component: CustDashboardComponent;
  let fixture: ComponentFixture<CustDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustDashboardComponent]
    });
    fixture = TestBed.createComponent(CustDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
