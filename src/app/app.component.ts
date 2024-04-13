import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/shareds_components/spinner/spinner.component';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LoginComponent, SpinnerComponent],
})
export class AppComponent {
  title = 'LabMedical';
  constructor(
    private router: Router,
    private loadingService: LoadingService,
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
}
