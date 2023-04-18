import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensersReadingsService {
  auth_token = localStorage.getItem('access_token');

  private _data = new Subject();
  data$: any = this._data.asObservable();
  sendData(data: any) {
    this._data.next(data);
    //this.data$ = data;
  }

  constructor(private http: HttpClient) {}

  getLastData(towerId: String) {
    const params = new HttpParams().set('towerId', towerId.toString());

    return this.http.get('http://192.168.1.14:3000/sensor/getLastReadings', {
      params: params,
    });
  }

  getSenserData(startDate: Date, endDate: Date, towerId: String) {
    console.log('getSenserData');
    let response;
    const headers = new HttpHeaders({ authenticationToken: 'füpdkf' });
    const id = towerId;
    const params = new HttpParams()
      .set('startDate', startDate.toDateString())
      .set('endDate', endDate.toDateString())
      .set('towerId', towerId.toString());

    this.sendData(
      this.http.get('http://192.168.1.14:3000/sensor/getReadings', {
        params: params,
      })
    );
    //this.sendData(data);
  }
  async getSenserDataUpdate(startDate: Date, endDate: Date, towerId: String) {
    if (this.data$) {
      let response;
      const headers = new HttpHeaders({ authenticationToken: 'füpdkf' });
      const id = towerId;
      const params = new HttpParams()
        .set('startDate', startDate.toDateString())
        .set('endDate', endDate.toDateString())
        .set('towerId', towerId.toString());

      const res = await this.http.get(
        'http://192.168.1.14:3000/sensor/getReadings',
        {
          params: params,
        }
      );
      res.subscribe((val) => {
        this.sendData(val);
        console.log('dd');
        console.log(this.data$);
      });
    }
  }
}
