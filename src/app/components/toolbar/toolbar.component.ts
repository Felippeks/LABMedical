import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'; // Added import
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [MatMenuModule, MatToolbarModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  userName: string | undefined;
  userEmail: string | undefined;
  userIcon: string | undefined = './assets/user-icon.png';
  showMenu = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    if (userData) {
      this.userName = userData.name;
      this.userEmail = userData.email;
    }
    this.document.addEventListener('click', this.closeMenu.bind(this));
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  closeMenu(): void {
    this.showMenu = false;
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}