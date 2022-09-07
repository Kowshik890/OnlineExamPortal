import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWelcomeComponent } from './admin-welcome.component';

describe('AdminWelcomeComponent', () => {
  let component: AdminWelcomeComponent;
  let fixture: ComponentFixture<AdminWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
