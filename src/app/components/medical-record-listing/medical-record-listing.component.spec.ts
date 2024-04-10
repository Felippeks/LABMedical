import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordListingComponent } from './medical-record-listing.component';

describe('MedicalRecordListingComponent', () => {
  let component: MedicalRecordListingComponent;
  let fixture: ComponentFixture<MedicalRecordListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalRecordListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalRecordListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
