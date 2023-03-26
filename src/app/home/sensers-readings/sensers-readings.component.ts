import { Component } from '@angular/core';

import { FormControl } from '@angular/forms';

import { HomeService } from '../home.service';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sensers-readings',
  templateUrl: './sensers-readings.component.html',
  styleUrls: ['./sensers-readings.component.scss'],
  providers: [HomeService],
})
export class SensersReadingsComponent {
  minDate: Date = new Date('2023-03-18');
  maxDate: Date = new Date('2023-03-18');

  id: string = 'EC:94:CB:4B:54:F0';
  data?: any;
  lastData!: any;
  constructor(
    private homeService: HomeService,
    activatedRoute: ActivatedRoute
  ) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = this.getTomorrowDate();
    //this.getData();

    // activatedRoute.params.subscribe((params) => {
    //   this.homeService.getLastData(this.id);
    //   this.homeService.lastData$.subscribe((i: any) => {
    //     this.lastData = i;
    //   });
    // });
  }

  getTomorrowDate(): Date {
    // Get today's date
    let today = new Date();
    // Change the date by adding 1 to it (today + 1 = tomorrow)
    today.setDate(today.getDate() + 1);
    // return yyyy-mm-dd format
    let todayString = today.toISOString().split('T')[0];

    return new Date(todayString);
  }

  ngOnInit() {
    this.homeService.getSenserData(this.minDate, this.maxDate, this.id);
    this.homeService.data$.subscribe((i: any) => (this.data = i));

    this.homeService.getLastData(this.id);
    this.homeService.lastData$.subscribe((i: any) => {
      this.lastData = i;
    });
  }

  async getData() {
    //console.log('Getting');
    this.homeService.getSenserData(this.minDate, this.maxDate, this.id);
    // .subscribe((data) => {
    //   this.data = data;
    // });

    // .pipe(tap((data) => (this.data = data)))
    // .toPromise()
    // .then((data) => {
    //   //console.log(this.data);
    // });
  }

  dataToShow = new FormControl('');
  dataList: string[] = [
    'inner temperature',
    'inner humidity',
    'water temperature',
    'environment temperature',
    'environment humidity',
    'UV light',
  ];
}
