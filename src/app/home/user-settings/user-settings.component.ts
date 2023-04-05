import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from '../home.service';
import { EditProfilePicComponent } from './edit-profile-pic/edit-profile-pic.component';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  myForm!: FormGroup;
  user!: any;
  submitIsDisabled = true;
  avatar!: any;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfilePicComponent, {
      data: { name: this.user.firstName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.ex = result;
    });
  }

  deleteAvatar() {
    this.homeService.deleteUserAvatar();
    console.log('The dialog was closed');
  }

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

    this.homeService.getUserAvatar();
    this.homeService.userAvatar$.subscribe((blob: any) => {
      let objectURL = URL.createObjectURL(blob);
      //this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // console.log(this.avatar);

      this.blobToBase64(blob).then((res: any) => {
        // do what you wanna do

        console.log(res); // res is base64 now

        this.homeService.setAvatarBase64(res);

        this.avatar = this.sanitizer.bypassSecurityTrustUrl(res);
      });
    });
  }

  blobToBase64(blob: any) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  }
}
