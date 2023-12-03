import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPresalesComponent } from './pending-presales.component';

describe('PendingPresalesComponent', () => {
  let component: PendingPresalesComponent;
  let fixture: ComponentFixture<PendingPresalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPresalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPresalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
