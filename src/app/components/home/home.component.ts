import { Component } from '@angular/core';
import { ToolbarComponent } from '../shareds_components/toolbar/toolbar.component';
import { SidebarComponent } from '../shareds_components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ToolbarComponent, SidebarComponent],
})
export class HomeComponent {}
