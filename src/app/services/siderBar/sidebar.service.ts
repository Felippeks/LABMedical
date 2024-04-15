import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public isOpen$ = new BehaviorSubject<boolean>(true); // Supondo que este seja o estado inicial do sidebar

  constructor() {}

  toggleSidebar(): void {
    this.isOpen$.next(!this.isOpen$.value);
  }

  closeSidebar(): void {
    this.isOpen$.next(false);
  }
}
