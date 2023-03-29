import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  myForm!: FormGroup;
  user!: any;
  submitIsDisabled = true;

  constructor(private fb: FormBuilder, private homeService: HomeService) {}

  submit() {
    const res = this.homeService.editUser({
      ...this.myForm.getRawValue(),
      id: this.user.id,
    });
    console.log(res);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    });
    this.myForm.valueChanges.subscribe(() => {
      //
      if (this.myForm.getRawValue().firstName !== this.user.firstName) {
        this.submitIsDisabled = false;
      } else if (this.myForm.getRawValue().lastName !== this.user.lastName) {
        this.submitIsDisabled = false;
      } else if (this.myForm.getRawValue().email !== this.user.email) {
        this.submitIsDisabled = false;
      } else if (
        this.myForm.getRawValue().phoneNumber !== this.user.phoneNumber
      ) {
        this.submitIsDisabled = false;
      } else {
        this.submitIsDisabled = true;
        return;
      }
    });

    this.homeService.getCurrentUser().subscribe((i: any) => {
      this.user = i;
      console.log(this.user);
      console.log('sdf');
      this.myForm.patchValue({
        firstName: i.firstName,
        lastName: i.lastName,
        email: i.email,
        phoneNumber: i.phoneNumber,
      });
      console.log('sdf');
    });
  }
}
