import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/shareds_components/spinner/spinner.component';
import { LoadingService } from './services/loading/loading.service';
import { ApiService } from './services/api/api.service';
import { StateManagementService } from './services/StateManagementService/state-management.service';
import { Paciente } from './components/home/medical.interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LoginComponent, SpinnerComponent],
})
export class AppComponent implements OnInit {
  title = 'LabMedical';
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private apiService: ApiService,
    private stateManagementService: StateManagementService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.setLoading(true);
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loadingService.setLoading(false);
        }, 1000);
      }
    });
  }

  async ngOnInit() {
    try {
      const pacientes: Paciente[] = await this.apiService.getAll('pacientes');
      this.stateManagementService.setPacientes(pacientes);
    } catch (error) {
      console.error('Erro ao buscar pacientes', error);
    }
  }
}
