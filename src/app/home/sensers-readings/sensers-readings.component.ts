import { Component } from '@angular/core';

import { FormControl } from '@angular/forms';

import { HomeService } from '../home.service';

import { ActivatedRoute } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SensersReadingsService } from './sensers-readings.service';

import { interval } from 'rxjs';
@Component({
  selector: 'app-sensers-readings',
  templateUrl: './sensers-readings.component.html',
  styleUrls: ['./sensers-readings.component.scss'],
  providers: [HomeService],
})
export class SensersReadingsComponent {
  minDate: Date = new Date('2023-03-18');
  maxDate: Date = new Date('2023-03-18');
  picker: Date = new Date();

  async changeDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.picker = event.value;
    }
    // console.log(this.picker);
    // console.log('dafdasfdsfdsfefe');

    const res = await this.sensersReadingsService
      .getSenserDataUpdate(
        this.getDateCustom(this.picker),
        this.getTomorrowDateCustom(this.picker),
        this.id
      )
      .then(() => {
        console.log(this.data);
      });

    this.data = this.sensersReadingsService.data$;
    console.log('dddd');
    console.log(this.data);
  }

  id: string = 'EC:94:CB:4B:54:F0';
  data?: any;
  lastData!: any;

  towers: any;
  selectedTower: any;

  constructor(
    private homeService: HomeService,
    private sensersReadingsService: SensersReadingsService,
    activatedRoute: ActivatedRoute
  ) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = this.getTomorrowDate();
    //this.getData();
    this.sensersReadingsService.getLastData(this.id).subscribe((data) => {
      this.lastData = data;
    });

    // activatedRoute.params.subscribe((params) => {

    // this.homeService.lastData$.subscribe((i: any) => {
    //   this.lastData = i;
    // });
    // });

    interval(30000).subscribe((x) => {
      // will execute every 30 seconds
      this.sensersReadingsService.getLastData(this.id).subscribe((data) => {
        this.lastData = data;
      });
    });
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

  getTomorrowDateCustom(day: Date): Date {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let todayString = today.toISOString().split('T')[0];
    return new Date(todayString);
  }
  getDateCustom(day: Date): Date {
    let todayString = day.toISOString().split('T')[0];
    return new Date(todayString);
  }

  clickMenuItem(item: any) {
    this.selectedTower = item;
  }

  ngOnInit() {
    this.sensersReadingsService.getSenserDataUpdate(
      this.minDate,
      this.maxDate,
      this.id
    );
    this.sensersReadingsService.data$.subscribe((i: any) => {
      this.data = i;
      console.log('updated');
    });

    this.homeService.getAllAeroponicTower();
    this.homeService.allAeroponicTower$.subscribe((i: any) => {
      this.towers = i;
      this.selectedTower = i[0];
    });

    // this.homeService.getLastData(this.id);
    // this.homeService.lastData$.subscribe((i: any) => {
    //   this.lastData = i;
    // });
  }

  async getData() {
    //console.log('Getting');
    //this.homeService.getSenserData1(this.minDate, this.maxDate, this.id);
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
