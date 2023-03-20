import { Component } from '@angular/core';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  showFiller = false;
  faHouse = faHouse;
  faUser = faUser;
}
