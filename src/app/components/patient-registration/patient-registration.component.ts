import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ToolbarComponent } from "../toolbar/toolbar.component";

@Component({
    selector: 'app-patient-registration',
    standalone: true,
    templateUrl: './patient-registration.component.html',
    styleUrl: './patient-registration.component.scss',
    imports: [SidebarComponent, ToolbarComponent]
})
export class PatientRegistrationComponent {

}
