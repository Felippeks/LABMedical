import { Component } from '@angular/core';
import { SidebarComponent } from '../../shareds_components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../shareds_components/toolbar/toolbar.component';

@Component({
  selector: 'app-patient-medical-listing',
  standalone: true,
  templateUrl: './patient-listing.component.html',
  styleUrl: './patient-listing.component.scss',
  imports: [SidebarComponent, ToolbarComponent],
})
export class PatientMedicalListingComponent {}
