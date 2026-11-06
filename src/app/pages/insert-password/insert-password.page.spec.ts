import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertPasswordPage } from './insert-password.page';

describe('InsertPasswordPage', () => {
  let component: InsertPasswordPage;
  let fixture: ComponentFixture<InsertPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
