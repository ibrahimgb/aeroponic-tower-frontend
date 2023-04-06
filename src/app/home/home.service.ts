import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  auth_token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWJpci5ndW91YWwuYkBnbWFpbC5jb20iLCJpYXQiOjE2ODA2NTMwNTksImV4cCI6MTY4MTU1MzA1OX0.TVe1mk4R1v2mPM3bUyv6XmzC25-D_9t44IVtM78XeaE';
  constructor(private http: HttpClient) {}

  private _data = new Subject();
  data$: any = this._data.asObservable();
  sendData(data: any) {
    this._data.next(data);
    //this.data$ = data;
  }

  private _allAeroponicTower = new Subject();
  allAeroponicTower$: any = this._allAeroponicTower.asObservable();
  updateAllAeroponicTower(data: any) {
    this._allAeroponicTower.next(data);
    this.allAeroponicTower$ = data;
  }

  private _lastData = new Subject();
  lastData$: any; // = this._data.asObservable();
  sendLastData(data: any) {
    this._lastData.next(data);
    this.lastData$ = data;
  }

  private _user = new Subject();
  user$: any; // = this._data.asObservable();
  updateUser(data: any) {
    this._user.next(data);
    this.user$ = data;
  }

  private _avatar = new Subject();
  avatar$: any; // = this._data.asObservable();
  updateAvatar(data: any) {
    this._avatar.next(data);
    this.avatar$ = data;
  }

  private _pumpInterval = new Subject();
  pumpInterval$: any = this._pumpInterval.asObservable();
  updatePumpInterval(data: any) {
    this._pumpInterval.next(data);
    this.pumpInterval$ = data;
  }

  private _userAvatar = new Subject();
  userAvatar$: any = this._userAvatar.asObservable();
  updateUserAvatar(data: any) {
    this._userAvatar.next(data);
    this.userAvatar$ = data;
  }

  private _towerImage = new Subject();
  towerImage$: any = this._towerImage.asObservable();
  updateTowerImage(data: any) {
    this._towerImage.next(data);
    this.towerImage$ = data;
  }

  private _userAvatarBase64 = new Subject();
  userAvatarBase64$: any = this._userAvatarBase64.asObservable();
  setAvatarBase64(data: any) {
    this._userAvatarBase64.next(data);
    this.userAvatarBase64$ = data;
  }

  private avatarBase64: any;

  getAvatarBase64() {
    return this.userAvatarBase64$;
  }

  // getLastData(towerId: String) {
  //   const params = new HttpParams().set('towerId', towerId.toString());

  //   this.sendLastData(
  //     this.http.get('http://192.168.1.14:3000/sensor/getLastReadings', {
  //       params: params,
  //     })
  //   );
  // }

  //http://192.168.1.14:3000/aeroponic-tower/all

  saveProfileImage(img: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.auth_token}`,
    });

    const requestOptions = { headers: headers };

    const data = new FormData();
    data.append('file', img);
    console.log(img);

    return this.http
      .post('http://192.168.1.14:3000/user/uploadAvatar', data, requestOptions)
      .subscribe((avatar: any) => {
        this.updateAvatar(avatar);
      });
  }

  getAvatar(name: string) {
    const res = this.http.get(
      `http://192.168.1.14:3000/user/profile-image/${name}`
    );

    res.subscribe((val: any) => {
      this.updateAvatar(val);
      console.log(val);
    });
  }
  getUserAvatar() {
    // const headers = new HttpHeaders({
    //   // 'Content-Type': 'multipart/form-data',
    //   Authorization: `Bearer ${this.auth_token}`,
    // });
    // const requestOptions = { headers: headers };

    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
      responseType: 'blob',
    };

    const res = this.http.get(
      `http://192.168.1.14:3000/user/profile-image/`,
      HTTPOptions
    );

    res.subscribe((val) => {
      this.updateUserAvatar(val);
    });
  }

  getUserAvatarObs(): Observable<any> {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
      responseType: 'blob',
    };

    return this.http.get(
      `http://192.168.1.14:3000/user/profile-image/`,
      HTTPOptions
    );
  }

  deleteUserAvatar() {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };

    const res = this.http.delete(
      `http://192.168.1.14:3000/user/profile-image/`,
      HTTPOptions
    );
    res.subscribe(() => {});
  }

  getCurrentUser() {
    //

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });

    const requestOptions = { headers: headers };

    const res = this.http.get(
      'http://192.168.1.14:3000/user/me',
      requestOptions
    );

    res.subscribe((val: any) => {
      this.updateUser(val);
      console.log(val);

      if (val.avatar) {
        this.getUserAvatar();
      }
    });

    return res;
  }

  editUser(edit: any) {
    const res = this.http.patch('http://192.168.1.14:3000/user', {
      ...edit,
    });
    res.subscribe((val) => {
      this.updateUser(val);
      console.log(val);
    });
  }

  getAllAeroponicTower() {
    const res = this.http.get('http://192.168.1.14:3000/aeroponic-tower/all');

    res.subscribe((val) => {
      this.updateAllAeroponicTower(val);
      console.log('dd');
      console.log(this.allAeroponicTower$);
    });
  }

  getTowerImage(id: string): Observable<any> {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
      responseType: 'blob',
    };

    return this.http.get(
      `http://192.168.1.14:3000/aeroponic-tower/towerImage/${id}`,
      HTTPOptions
    );
  }

  getTower(id: string): Observable<any> {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };

    return this.http.get(
      `http://192.168.1.14:3000/aeroponic-tower/get/${id}`,
      HTTPOptions
    );
  }

  setTowerPumpInterval(pumpIntervalId: number, towerId: string) {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth_token}`,
      }),
    };

    let body = {
      pumpIntervalId: pumpIntervalId,
      towerId: towerId,
    };
    console.log('body');
    console.log(body);

    return this.http.post(
      `http://192.168.1.14:3000/aeroponic-tower/updatePumpInterval`,
      body,
      HTTPOptions
    );
  }

  setTowerImage1(img: any, id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.auth_token}`,
    });

    const requestOptions = { headers: headers };

    const data = new FormData();
    data.append('file', img);
    console.log(img);

    return this.http
      .post(
        `http://192.168.1.14:3000/aeroponic-tower/uploadtowerImage/${id}`,
        data,
        requestOptions
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  setTowerImage(img: any, id: string) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${this.auth_token}`,
    });

    const requestOptions = { headers: headers };

    const data = new FormData();
    data.append('file', img);
    console.log(img);

    return this.http
      .post(
        'http://192.168.1.14:3000/aeroponic-tower/uploadtowerImage/' + id,
        data,
        requestOptions
      )
      .subscribe((avatar: any) => {
        this.updateAvatar(avatar);
      });
  }

  getLastData(towerId: String) {
    const params = new HttpParams().set('towerId', towerId.toString());

    return this.http.get('http://192.168.1.14:3000/sensor/getLastReadings', {
      params: params,
    });
  }

  setAeroponicTower(tower: any) {
    return this.http.post(
      'http://192.168.1.14:3000/aeroponic-tower/editTower',
      tower
    );
  }

  getAllPumpInterval() {
    const res = this.http.get(
      'http://192.168.1.14:3000/aeroponic-tower/allPumpIntervals'
    );

    res.subscribe((val) => {
      this.updatePumpInterval(val);
      console.log(val);
    });
  }

  getAllPumpIntervalObs() {
    return this.http.get(
      'http://192.168.1.14:3000/aeroponic-tower/allPumpIntervals'
    );
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
