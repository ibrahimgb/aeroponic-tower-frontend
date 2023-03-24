import { Component } from '@angular/core';

@Component({
  selector: 'app-sensers-readings',
  templateUrl: './sensers-readings.component.html',
  styleUrls: ['./sensers-readings.component.scss']
})
export class SensersReadingsComponent {
  minDate: Date;
  maxDate: Date;

  constructor() {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }
}
