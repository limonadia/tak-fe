import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetEmailPage } from './reset-email.page';

describe('ResetEmailPage', () => {
  let component: ResetEmailPage;
  let fixture: ComponentFixture<ResetEmailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
