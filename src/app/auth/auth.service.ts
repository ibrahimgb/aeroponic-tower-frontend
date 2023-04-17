import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

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
}