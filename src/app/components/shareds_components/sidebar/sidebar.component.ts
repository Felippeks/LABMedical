import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../../../services/Screen-size/screen-size.service';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterModule,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SidebarService } from '../../../services/siderBar/sidebar.service';
import { Observable } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('sidebarAnimation', [
      state(
        'open',
        style({
          width: '256px',
        }),
      ),
      state(
        'closed',
        style({
          width: '{{sidebarWidth}}',
        }),
        { params: { sidebarWidth: '160px' } },
      ),
      transition('open <=> closed', [animate('0.7s')]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  sidebarWidth = '160px';
  isOpen$: Observable<boolean> | undefined;
  isClosed$: Observable<boolean> | undefined;
  menuItems = [
    {
      route: '/home',
      text: 'Estatísticas e Informações',
      icon: 'assets/home-icon.svg',
      selected: false,
    },
    {
      route: '/patientRegistration',
      text: 'Cadastro de Pacientes',
      icon: 'assets/registerUser-icon.svg',
      selected: false,
    },
    {
      route: '/appointments',
      text: 'Cadastro de Consultas',
      icon: 'assets/appointments-icon.svg',
      selected: false,
    },
    {
      route: '/exam',
      text: 'Cadastro de Exames',
      icon: 'assets/exam-icon.svg',
      selected: false,
    },
    {
      route: '/medicalListing',
      text: 'Listagem de Prontuários',
      icon: 'assets/medicalListing-icon.svg',
      selected: false,
    },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sidebarService: SidebarService,
    private screenSizeService: ScreenSizeService,
  ) {}

  ngOnInit(): void {
    this.screenSizeService.isDesktop.subscribe((isDesktop) => {
      this.sidebarWidth = isDesktop ? '160px' : '80px';
    });
    this.isOpen$ = this.sidebarService.isOpen$;
    this.isClosed$ = this.isOpen$.pipe(map((isOpen) => !isOpen));
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

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }
}
