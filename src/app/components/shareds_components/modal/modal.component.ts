// modal.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ModalService } from '../../../services/modal/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy {
  message: string | undefined;
  private subscription: Subscription | undefined;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription = this.modalService.currentMessage.subscribe(
      (message) => (this.message = message),
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  close() {
    this.modalService.setMessage('');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalElement = document.querySelector('.modal');
    if (event.target === modalElement) {
      this.close();
    }
  }
}
