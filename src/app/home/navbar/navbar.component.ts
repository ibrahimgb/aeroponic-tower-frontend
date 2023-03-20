import { Component } from '@angular/core';
import { faCaretDown , faShare , faDownload } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faCaretDown =faCaretDown;
  faShare=faShare;
  faDownload=faDownload;
}
