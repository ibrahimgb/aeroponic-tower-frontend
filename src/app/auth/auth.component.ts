import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  signIn: boolean = true;

  signUpForm!: FormGroup;
  logInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const auth_token = localStorage.getItem('access_token');

    if (auth_token) {
      this.authService.getCurrentUser().subscribe((value) => {
        console.log(value);
        if (value) {
          this.router.navigate([`home/readings`]);
        }
      });
    }

    this.logInForm = this.fb.group({
      email: '',
      password: '',
    });

    this.signUpForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  }

  login() {
    const logIn = this.logInForm.getRawValue();

    if (!logIn.email) {
      this.openSnackBar('Please provide a valid email');
    } else {
      //console.log(logIn);
      this.authService.logIn(logIn);
    }
  }

  async singUp() {
    // this.signIn = false;

    const singUp = this.signUpForm.getRawValue();
    if (!singUp.firstName) {
      this.openSnackBar('Please provide your firsName');
    } else if (!singUp.lastName) {
      this.openSnackBar('Please provide your lastName');
    } else if (!singUp.email) {
      this.openSnackBar('Please provide a valid email');
    } else if (singUp.password != singUp.passwordConfirm) {
      this.openSnackBar('Password not match, Try again');
      return;
    } else if (singUp.password.length < 1) {
      this.openSnackBar('Password is Weak, Try more complex password');
    } else {
      delete singUp.passwordConfirm;
      //console.log(singUp);

      const res = await this.authService.singUp(singUp).subscribe({
        next: (token: any) => {
          this.authService.setSession(token);
          if (token.access_token) {
            this.router.navigateByUrl('home/readings');
            this.openSnackBar('Hi there!, you are logged in now');
            return;
          }
          this.openSnackBar('Error try again');
          return;
        },
        error: (err) => {
          if (err.status === 403) {
            this.openSnackBar('looks like the email already sign in');
            return;
          }
          this.openSnackBar('Error try again');
          return;
        },
      });
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 800,
    });
  }
}
