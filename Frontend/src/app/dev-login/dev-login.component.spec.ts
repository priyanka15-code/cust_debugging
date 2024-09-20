import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevLoginComponent } from './dev-login.component';

describe('DevLoginComponent', () => {
  let component: DevLoginComponent;
  let fixture: ComponentFixture<DevLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevLoginComponent]
    });
    fixture = TestBed.createComponent(DevLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
