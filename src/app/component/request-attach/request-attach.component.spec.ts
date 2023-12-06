import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAttachComponent } from './request-attach.component';

describe('RequestAttachComponent', () => {
  let component: RequestAttachComponent;
  let fixture: ComponentFixture<RequestAttachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAttachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAttachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
