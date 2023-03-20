import { Component } from '@angular/core';
import { faChartLine , faUser , faExclamationCircle , faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons"
import { faWatchmanMonitoring  } from "@fortawesome/free-brands-svg-icons"

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  faChartLine = faChartLine;
  faUser = faUser;
  faExclamationCircle=faExclamationCircle;
  faMagnifyingGlass = faMagnifyingGlass;
  faWatchmanMonitoring = faWatchmanMonitoring;
}
