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
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  SignUpForm: FormGroup | any;

  constructor(private router: Router, private apiService: ApiService) {
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
    this.apiService.create('userData', formData).subscribe(() => { 
      alert('Usuário cadastrado com sucesso!');
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
      alert('Ocorreu um erro ao cadastrar o usuário!');
    });
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}
