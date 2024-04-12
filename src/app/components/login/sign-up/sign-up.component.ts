import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  SignUpForm: FormGroup | any;

  constructor(private router: Router) {
    this.initializeForm();
  }
  initializeForm() {
    this.SignUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  SignUp() {
    if (this.SignUpForm.valid) {
      if (this.passwordsMatch()) {
        this.storeUserData();
        alert('Usuário cadastrado com sucesso!');
      } else {
        alert('As senhas não correspondem!');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente!');
    }
  }
  passwordsMatch(): boolean {
    return (
      this.SignUpForm.value.password === this.SignUpForm.value.confirmPassword
    );
  }
  storeUserData() {
    let formData = { ...this.SignUpForm.value };
    localStorage.setItem('userData', JSON.stringify(formData));
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}
