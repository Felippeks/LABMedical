import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { ModalComponent } from '../shareds_components/modal/modal.component';
import { ModalService } from '../../services/modal/modal.service';
import { ResetPasswordModalComponent } from '../shareds_components/reset-password-modal-component/reset-password-modal-component.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule, ModalComponent, ResetPasswordModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  message: string | undefined;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false; 

  constructor(private router: Router, private apiService: ApiService, private modalService: ModalService, private cdr: ChangeDetectorRef) {}

  async onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      const userData = await this.apiService.getAll('userData');
      const user = userData.find((user: any) => user.email === email && user.password === password);
  
      if (user) {
        this.router.navigate(['/home']);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        this.modalService.setMessage('Usuário ou senha inválidos');
        this.message = 'Usuário ou senha inválidos';
      }
    } else {
      this.modalService.setMessage('Por favor, preencha todos os campos corretamente!');
      this.message = 'Por favor, preencha todos os campos corretamente!';
    }
  }

  async onForgotPassword() {
    const email = this.loginForm.get('email')?.value;
  
    if (!email) {
      this.modalService.setMessage('Por favor, insira um e-mail');
      this.message = 'Por favor, insira um e-mail';
      this.cdr.detectChanges();
      return;
    }
  
    const userData = await this.apiService.getAll('userData');
    const user = userData.find((user: any) => user.email === email);
  
    if (user) {
      this.modalService.setEmail(email);
      this.modalService.setResetPassword(true);
    } else {
      this.modalService.setMessage('Email não encontrado');
    }
  }

  onRegister() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/sign-up']).then(() => {
        this.loading = false;
      });
    }, 1000);
  }
}