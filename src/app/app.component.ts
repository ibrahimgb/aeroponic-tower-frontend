import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular101';
  isDarkTheme!: boolean;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.currentisDarkTheme.subscribe(
      (msg) => (this.isDarkTheme = msg)
    );
  }
}
