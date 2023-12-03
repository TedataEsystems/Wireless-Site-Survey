import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingVendorComponent } from './pending-vendor.component';

describe('PendingVendorComponent', () => {
  let component: PendingVendorComponent;
  let fixture: ComponentFixture<PendingVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
