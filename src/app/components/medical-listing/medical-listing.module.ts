import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientMedicalListingComponent } from './patient-listing/patient-listing.component';
import { MedicalRecordListingComponent } from './medical-listing.component';

const medicalRecordRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MedicalRecordListingComponent },
      { path: ':patientListing', component: PatientMedicalListingComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(medicalRecordRoutes)],
})
export class medicalListingModule {}
