import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

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

  constructor(private router: Router, private apiService: ApiService) {}

  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.apiService.getAll('userData').subscribe(userData => { 
        const user = userData.find((user: any) => user.email === email && user.password === password);

        if (user) {
          this.router.navigate(['/home']);
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          alert('Usuário ou senha inválidos');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente!');
    }
  }

  onForgotPassword() {
    const email = this.loginForm.get('email')?.value;
  
    this.apiService.getAll('userData').subscribe(userData => {
      const user = userData.find((user: any) => user.email === email);
  
      if (user) {
        user.password = '1q2w3e@!';
        user.confirmPassword = '1q2w3e@!';
  
        this.apiService.update('userData', user.id, user).subscribe(updatedUser => {
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          alert(
            'Sua senha foi alterada para a senha padrão: 1q2w3e@!. Por favor, prossiga utilizando essa senha.',
          );
        });
      } else {
        alert('Email não encontrado');
      }
    });
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
