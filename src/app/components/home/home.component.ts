import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ToolbarComponent, SidebarComponent]
})
export class HomeComponent {

}
