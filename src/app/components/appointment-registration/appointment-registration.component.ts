import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-appointment-registration',
  standalone: true,
  templateUrl: './appointment-registration.component.html',
  styleUrl: './appointment-registration.component.scss',
  imports: [SidebarComponent, ToolbarComponent],
})
export class AppointmentRegistrationComponent {}
