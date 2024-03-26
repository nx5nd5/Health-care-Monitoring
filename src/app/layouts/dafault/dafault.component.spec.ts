import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafaultComponent } from './dafault.component';

describe('DafaultComponent', () => {
  let component: DafaultComponent;
  let fixture: ComponentFixture<DafaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafaultComponent]
    });
    fixture = TestBed.createComponent(DafaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
