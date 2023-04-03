import { Component, Input } from '@angular/core';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-tower-monitoring',
  templateUrl: './tower-monitoring.component.html',
  styleUrls: ['./tower-monitoring.component.scss'],
})
export class TowerMonitoringComponent {
  @Input() tower: any;

  waterNeedsRefilling: any;
  pumpIsWorking: any;
  daysLeftToHarvest: number = 0;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getLastData(this.tower.id).subscribe((i: any) => {
      this.waterNeedsRefilling = i[1].waterNeedsRefilling;
      this.pumpIsWorking = i[1].pumpIsWorking;

      const date: any = new Date();
      const dateCreated: any = new Date(this.tower.dayStarted);
      const diffTime = Math.abs(date - dateCreated);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.daysLeftToHarvest = this.tower.daysToHarvest - diffDays;
      console.log(diffTime + ' milliseconds');
      console.log(diffDays + ' days');

      //console.log(i);
    });
  }
}
