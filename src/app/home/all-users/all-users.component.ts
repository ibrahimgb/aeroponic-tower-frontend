import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormControl, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { HomeService } from '../home.service';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})

// constructor(private homeService: HomeService) {}

//   ngOnInit() {
//     this.homeService.getAllGroupUsers().subscribe((users) => {
//       this.users = users;
//       console.log(this.users);
//     });
//   }
export class AllUsersComponent {
  //getAllGroupUsers
  dataToDisplay: any;

  dataSource: any;

  displayedColumns: string[] = [
    'firstName',
    'LastName',
    'email',
    'role',
    'remove',
  ];

  emailInput: string = '';

  constructor(
    private homeService: HomeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.homeService.getAllMyGroupUsers();
    this.homeService.getAllMyGroupUsers$.subscribe((users: any) => {
      this.dataToDisplay = users;
      this.dataSource = new UsersDataSource(this.dataToDisplay);
      console.log(this.dataToDisplay);
    });
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  revoke(id: number) {
    this.homeService.removeUserFromGroup(id).subscribe((data: any) => {
      console.log(data);
      this.homeService.getAllMyGroupUsers();
    });
  }

  addUser() {
    console.log(this.emailInput);
    if (this.emailInput) {
      this.homeService.addUserToGroup(this.emailInput).subscribe((i) => {
        this.openSnackBar();
        this.homeService.getAllMyGroupUsers();
      });
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
    });
  }
}

class UsersDataSource extends DataSource<any> {
  private _dataStream = new ReplaySubject<any[]>();

  constructor(initialData: any[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<any[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: any[]) {
    this._dataStream.next(data);
  }
}
