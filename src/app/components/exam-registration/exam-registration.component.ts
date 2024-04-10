import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-exam-registration',
    standalone: true,
    templateUrl: './exam-registration.component.html',
    styleUrl: './exam-registration.component.scss',
    imports: [ToolbarComponent, SidebarComponent]
})
export class ExamRegistrationComponent {

}
