import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  public isDesktop = new BehaviorSubject<boolean>(window.innerWidth > 960);

  constructor() {
    window.onresize = () => {
      this.isDesktop.next(window.innerWidth > 960);
    };
    
  }

}
