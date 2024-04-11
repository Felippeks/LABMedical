import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterModule,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SidebarService } from '../../services/sidebar-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  isOpen$: Observable<boolean> | undefined;
  menuItems = [
    {
      route: '/home',
      text: 'Estatísticas e Informações',
      icon: 'assets/home-icon.svg',
      selected: false,
    },
    {
      route: '/patientRegistration',
      text: 'Cadastro de Paciente',
      icon: 'assets/registerUser-icon.svg',
      selected: false,
    },
    {
      route: '/appointments',
      text: 'Cadastro de Consulta',
      icon: 'assets/appointments-icon.svg',
      selected: false,
    },
    {
      route: '/exam',
      text: 'Cadastro de Exame',
      icon: 'assets/exam-icon.svg',
      selected: false,
    },
    {
      route: '/medicalListing',
      text: 'Listagem de Prontuário',
      icon: 'assets/medicalListing-icon.svg',
      selected: false,
    },
    {
      route: '/patientListing',
      text: 'Prontuário de Paciente',
      icon: 'assets/patientListing-icon.svg',
      selected: false,
    },
    { route: '/login', text: 'Sair', icon: 'assets/logout-icon.svg' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sidebarService: SidebarService,
  ) {}

  ngOnInit(): void {
    this.isOpen$ = this.sidebarService.isOpen$;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        this.menuItems.forEach((item) => {
          item.selected = this.router.url === item.route;
        });
      });
  }

  navigate(route: string): void {
    if (route === '/login') {
      localStorage.setItem('isLoggedIn', 'false');
    }
    this.router.navigate([route]);
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
