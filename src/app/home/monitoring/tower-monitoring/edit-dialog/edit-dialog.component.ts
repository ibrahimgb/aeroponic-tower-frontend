import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  tower!: any;
  myForm!: FormGroup;
  user!: any;
  submitIsDisabled = true;

  selectedValue!: any;

  pumpIntervals!: Observable<Array<any>>;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.tower = this.data;
  }

  submit() {
    const res = this.homeService
      .setAeroponicTower({
        ...this.myForm.getRawValue(),
        id: this.tower.id,
      })
      .subscribe((val) => {
        this.tower = val;
      });

    this.homeService.getAllAeroponicTower();

    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: this.tower.name,
      content: this.tower.content,
      size: this.tower.size,
    });
    this.myForm.valueChanges.subscribe(() => {
      //
      if (this.myForm.getRawValue().name !== this.tower.name) {
        this.submitIsDisabled = false;
      } else if (this.myForm.getRawValue().content !== this.tower.content) {
        this.submitIsDisabled = false;
      } else if (this.myForm.getRawValue().size !== this.tower.size) {
        this.submitIsDisabled = false;
      } else {
        this.submitIsDisabled = true;
        return;
      }
    });

    this.homeService.getAllPumpInterval();
    this.homeService.pumpInterval$.subscribe((i: any) => {
      // this.pumpIntervals = i;

      this.pumpIntervals = i.map(() => {
        return {
          value: i.id,
          viewValue: `${i.timeOn} mim on and ${i.timeOff} min off`,
        };
      });
    });

    //getAllPumpInterval
  }
}
