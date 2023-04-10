import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  singUp(data: object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestOptions = { headers: headers };

    return this.http
      .post('http://192.168.1.14:3000/auth/signup', data, requestOptions)
      .subscribe((token: any) => {
        this.setSession(token);
      });
  }

  logIn(data: object) {
    return this.http
      .post('http://192.168.1.14:3000/auth/signin', data)
      .subscribe((token: any) => {
        this.setSession(token);
      });
  }

  private setSession(authResult: any) {
    localStorage.setItem('access_token', authResult.access_token);
  }
}
