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
import { ModalService } from '../../../services/modal/modal.service';
import { ModalComponent } from '../../shareds_components/modal/modal.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ModalComponent,
  ],
})
export class SignUpComponent {
  SignUpForm: FormGroup | any;
  message: string | undefined;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private modalService: ModalService,
  ) {
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
  async SignUp() {
    if (this.SignUpForm.valid) {
      if (this.passwordsMatch()) {
        await this.storeUserData();
      } else {
        this.modalService.setMessage('As senhas não correspondem!');
        this.message = 'As senhas não correspondem!';
      }
    } else {
      this.modalService.setMessage(
        'Por favor, preencha todos os campos corretamente!',
      );
      this.message = 'Por favor, preencha todos os campos corretamente!';
    }
  }
  passwordsMatch(): boolean {
    return (
      this.SignUpForm.value.password === this.SignUpForm.value.confirmPassword
    );
  }
  async storeUserData() {
    let formData = { ...this.SignUpForm.value };
    try {
      await this.apiService.create('userData', formData);
      this.modalService.setMessage('Usuário cadastrado com sucesso!');
      this.message = 'Usuário cadastrado com sucesso!';
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      this.modalService.setMessage('Ocorreu um erro ao cadastrar o usuário!');
      this.message = 'Ocorreu um erro ao cadastrar o usuário!';
    }
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}
