import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private messageSource = new BehaviorSubject<string | undefined>(undefined);
  currentMessage = this.messageSource.asObservable();

  private resetPasswordSource = new BehaviorSubject<boolean>(false);
  currentResetPassword = this.resetPasswordSource.asObservable();

  private emailSource = new BehaviorSubject<string | undefined>(undefined);
  currentEmail = this.emailSource.asObservable();

  setMessage(message: string) {
    this.messageSource.next(message);
  }

  setResetPassword(resetPassword: boolean) {
    this.resetPasswordSource.next(resetPassword);
  }

  setEmail(email: string) {
    this.emailSource.next(email);
  }
}