import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-medical-record-listing',
  standalone: true,
  templateUrl: './medical-record-listing.component.html',
  styleUrl: './medical-record-listing.component.scss',
  imports: [SidebarComponent, ToolbarComponent],
})
export class MedicalRecordListingComponent {}
