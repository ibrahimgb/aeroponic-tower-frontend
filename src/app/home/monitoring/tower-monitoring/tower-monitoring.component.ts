import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../home.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
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
  pumpIntervalsList: any;

  constructor(private homeService: HomeService, public dialog: MatDialog) {}

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

      this.homeService.getAllPumpIntervalObs().subscribe((i: any) => {
        // this.pumpIntervals = i;

        this.pumpIntervalsList = JSON.parse(JSON.stringify(i));
      });

      //console.log(i);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { tower: this.tower, pumpIntervalsList: this.pumpIntervalsList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      //this.tower = result;
    });
  }
}
