import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'; // Added import
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

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

  routeNames: { [key: string]: string } = {
    '/home': 'Estatísticas e Informações',
    '/appointments': 'Cadastro de Consultas',
    '/exam': 'Cadastro de Exames',
    '/medicalListing': 'Listagem de Prontuários',
    '/medicalListing/patientListing': 'Prontuário do Paciente',
    '/patientRegistration': 'Cadastro de Pacientes',
  };

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const currentUserItem = localStorage.getItem('currentUser');
    if (currentUserItem) {
      const currentUser = JSON.parse(currentUserItem);
      if (currentUser) {
        this.userName = currentUser.name;
        this.userEmail = currentUser.email;
      }
    }
  
    this.document.addEventListener('click', this.closeMenu.bind(this));
  }

  get currentRouteName() {
    return this.routeNames[this.router.url];
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
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
