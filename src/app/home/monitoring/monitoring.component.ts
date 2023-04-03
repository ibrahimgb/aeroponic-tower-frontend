import { Component } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent {
  towers: any;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getAllAeroponicTower();
    this.homeService.allAeroponicTower$.subscribe((i: any) => {
      this.towers = i;
      console.log(i);
    });
  }
}
