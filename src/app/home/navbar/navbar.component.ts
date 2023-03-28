import { Component } from '@angular/core';
import {
  faCaretDown,
  faDownload,
  faShare,
} from '@fortawesome/free-solid-svg-icons';

import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isDarkTheme!: boolean;

  faCaretDown = faCaretDown;
  faShare = faShare;
  faDownload = faDownload;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.currentisDarkTheme.subscribe(
      (msg) => (this.isDarkTheme = msg)
    );
  }

  toggleTheme() {
    this.appService.updateIsDarkTheme(!this.isDarkTheme);
  }
}
