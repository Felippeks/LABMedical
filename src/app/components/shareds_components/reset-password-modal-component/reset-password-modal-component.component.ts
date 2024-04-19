import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';
import { ApiService } from '../../../services/api/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password-modal-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password-modal-component.component.html',
  styleUrl: './reset-password-modal-component.component.scss'
})
export class ResetPasswordModalComponent implements OnInit, OnDestroy {
  resetPassword = false;
  email: string | undefined;
  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  private resetPasswordSubscription: Subscription | undefined;
  private emailSubscription: Subscription | undefined;

  constructor(private modalService: ModalService, private apiService: ApiService) { }

  ngOnInit() {
    this.resetPasswordSubscription = this.modalService.currentResetPassword.subscribe(resetPassword => this.resetPassword = resetPassword);
    this.emailSubscription = this.modalService.currentEmail.subscribe(email => this.email = email);
  }

  async onSubmitResetPassword() {
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.get('password')?.value;
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
  
      if (password === confirmPassword) {
        const userData = await this.apiService.getAll('userData');
        const user = userData.find((user: any) => user.email === this.email);
  
        if (user) {
          user.password = password;
          user.confirmPassword = confirmPassword;
  
          const updatedUser = await this.apiService.update('userData', user.id, user);
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          this.modalService.setMessage('Senha alterada com sucesso!');
          this.resetPassword = false;
        } else {
          this.modalService.setMessage('Email não encontrado');
        }
      } else {
        alert('As senhas não coincidem');
      }
    } else {
      this.modalService.setMessage('Por favor, preencha todos os campos corretamente!');
    }
  }

  ngOnDestroy() {
    if (this.resetPasswordSubscription) { 
      this.resetPasswordSubscription.unsubscribe();
    }
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }
  }
  close() {
    this.modalService.setResetPassword(false);
    this.resetPasswordForm.setValue({
      password: '',
      confirmPassword: ''
    });
  }
}