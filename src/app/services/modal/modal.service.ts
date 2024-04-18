import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private message = new BehaviorSubject<string>('');
  currentMessage = this.message.asObservable();

  constructor() { }

  setMessage(message: string) {
    this.message.next(message);
  }

  clearMessage() {
    this.message.next('');
  }
}