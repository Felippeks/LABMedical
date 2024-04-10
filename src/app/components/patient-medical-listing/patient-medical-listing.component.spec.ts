import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalListingComponent } from './patient-medical-listing.component';

describe('PatientMedicalListingComponent', () => {
  let component: PatientMedicalListingComponent;
  let fixture: ComponentFixture<PatientMedicalListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientMedicalListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientMedicalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
