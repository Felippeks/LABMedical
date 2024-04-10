import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false;

  constructor(private router: Router) {}

  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      if (email && userData.email === email && userData.password === password) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        alert('Usuário ou senha inválidos');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente!');
    }
  }

  onForgotPassword() {
    const email = this.loginForm.get('email')?.value;

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (email && userData.email === email) {
      userData.password = '1q2w3e@!';
      localStorage.setItem('userData', JSON.stringify(userData));

      alert(
        'Sua senha foi alterada para a senha padrão: 1q2w3e@!. Por favor, prossiga utilizando essa senha.',
      );
    } else {
      alert('Email não encontrado');
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
