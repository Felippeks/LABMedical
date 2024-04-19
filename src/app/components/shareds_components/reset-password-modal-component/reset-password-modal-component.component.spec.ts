import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordModalComponentComponent } from './reset-password-modal-component.component';

describe('ResetPasswordModalComponentComponent', () => {
  let component: ResetPasswordModalComponentComponent;
  let fixture: ComponentFixture<ResetPasswordModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetPasswordModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
