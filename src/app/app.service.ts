import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private isDarkTheme = new BehaviorSubject(false);
  currentisDarkTheme = this.isDarkTheme.asObservable();

  constructor() {}
  updateIsDarkTheme(i: boolean) {
    this.isDarkTheme.next(i);
  }
}
