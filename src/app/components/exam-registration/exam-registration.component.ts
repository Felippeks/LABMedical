import { Component } from '@angular/core';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';

@Component({
  selector: 'app-exam-registration',
  standalone: true,
  templateUrl: './exam-registration.component.html',
  styleUrl: './exam-registration.component.scss',
  imports: [ToolbarComponent, SidebarComponent],
})
export class ExamRegistrationComponent {}
