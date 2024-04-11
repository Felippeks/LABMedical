import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private router: Router) {}

  appointments(): void {
    this.router.navigate(['/appointments']);
  }
  exam(): void {
    this.router.navigate(['/exam']);
  }
  medicalListing(): void {
    this.router.navigate(['/medicalListing']);
  }
  patientListing(): void {
    this.router.navigate(['/patientListing']);
  }
  patientRegistration(): void {
    this.router.navigate(['/patientRegistration']);
  }

  home(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}
