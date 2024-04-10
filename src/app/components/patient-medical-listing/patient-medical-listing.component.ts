import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-patient-medical-listing',
  standalone: true,
  templateUrl: './patient-medical-listing.component.html',
  styleUrl: './patient-medical-listing.component.scss',
  imports: [SidebarComponent, ToolbarComponent],
})
export class PatientMedicalListingComponent {}
