import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new Subject();
  user$: any; // = this._data.asObservable();
  updateUser(data: any) {
    this._user.next(data);
    this.user$ = data;
  }

  auth_token: String | null;
  constructor(private http: HttpClient, private router: Router) {
    this.auth_token = localStorage.getItem('access_token');
  }

  singUp(data: object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestOptions = { headers: headers };

    return this.http.post(
      'http://192.168.1.14:3000/auth/signup',
      data,
      requestOptions
    );
  }

  logIn(data: object) {
    return this.http
      .post('http://192.168.1.14:3000/auth/signin', data)
      .subscribe((token: any) => {
        this.setSession(token);
        if (token.access_token) {
          this.router.navigateByUrl('home/readings');
        }
      });
  }

  setSession(authResult: any) {
    localStorage.setItem('access_token', authResult.access_token);
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
    });

    return res;
  }
}
