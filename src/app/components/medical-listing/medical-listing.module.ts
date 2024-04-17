import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRecordListingComponent } from './medical-listing.component';

const medicalRecordRoutes: Routes = [
  {
    path: '',
    children: [{ path: '', component: MedicalRecordListingComponent }],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(medicalRecordRoutes)],
})
export class medicalListingModule {}
