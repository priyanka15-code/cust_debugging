import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustLayoutComponent } from './cust-layout.component';

describe('CustLayoutComponent', () => {
  let component: CustLayoutComponent;
  let fixture: ComponentFixture<CustLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustLayoutComponent]
    });
    fixture = TestBed.createComponent(CustLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
