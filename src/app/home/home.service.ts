import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  private _data = new Subject();
  data$: any; // = this._data.asObservable();
  sendData(data: any) {
    this._data.next(data);
    this.data$ = data;
  }

  private _lastData = new Subject();
  lastData$: any; // = this._data.asObservable();
  sendLastData(data: any) {
    this._lastData.next(data);
    this.lastData$ = data;
  }

  getLastData(towerId: String) {
    const params = new HttpParams().set('towerId', towerId.toString());

    this.sendLastData(
      this.http.get('http://192.168.1.14:3000/sensor/getLastReadings', {
        params: params,
      })
    );
  }

  getLastData2(towerId: String) {
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
}
