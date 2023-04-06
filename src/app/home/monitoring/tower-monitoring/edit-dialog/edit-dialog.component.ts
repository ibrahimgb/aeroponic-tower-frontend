import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
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

  image: any;

  //for the cropper

  uploading = false;
  imageBase64String: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = true;
  transform: ImageTransform = {};

  pumpIntervalsList!: any;

  selectedPumpIntervalsId = null;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private homeService: HomeService,
    private sanitizer: DomSanitizer
  ) {
    this.tower = this.data.tower;
    const pumpIntervalsList = this.data.pumpIntervalsList;

    this.pumpIntervalsList = pumpIntervalsList.map((i: any) => {
      return {
        value: i.id,
        viewValue: `${i.timeOn} mim on and ${i.timeOff} min off`,
      };
    });
    console.log('this.data');
    console.log(this.pumpIntervalsList);
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

    if (this.selectedValue) {
      this.homeService
        .setTowerPumpInterval(this.selectedValue, this.tower.id)
        .subscribe((data: any) => {
          console.log('responce data');
          console.log(data);
        });
    }

    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.homeService.getTowerImage(this.tower.id).subscribe((blob: any) => {
      let objectURL = URL.createObjectURL(blob);
      this.image = blob;
      console.log('Image geteed');
    });
    console.log('inisilasing ');
    this.homeService.getTower(this.tower.id).subscribe((data) => {
      this.myForm.patchValue({
        name: data.name,
        content: data.content,
        size: data.size,
      });
    });

    this.myForm = this.fb.group({
      name: '',
      content: '',
      size: '',
    });

    this.myForm.valueChanges.subscribe(() => {
      //
      if (
        this.myForm.getRawValue().name !== this.tower.name ||
        this.myForm.getRawValue().content !== this.tower.content ||
        this.myForm.getRawValue().size !== this.tower.size ||
        !this.selectedValue
      ) {
        this.submitIsDisabled = false;
      } else {
        this.submitIsDisabled = true;
        return;
      }

      console.log('this.selectedValue');
      console.log(this.selectedValue);
    });

    this.homeService.getAllPumpIntervalObs().subscribe((i: any) => {
      // this.pumpIntervals = i;

      const pumpIntervalsList = JSON.parse(JSON.stringify(i));
    });

    //getAllPumpInterval
  }

  enableSubmit() {
    this.submitIsDisabled = false;
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

  getBase64FromImg = async (data: any) => {
    //const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //console.log(event, base64ToFile(event.base64));
    //console.log(this.croppedImage);
    console.log('imageCropped');
    //console.log(this.image);
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  base64ToFile = (url: string) => {
    let arr = url.split(',');
    // console.log(arr)
    let mime = arr[0].match(/:(.*?);/)![1];
    let data = arr[1];

    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);

    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }

    let file = new File([dataArr], 'File.png', { type: mime });

    return file;
  };

  saveImage() {
    if (this.croppedImage) {
      this.uploading = true;
      //this.homeService.saveProfileImage(this.croppedImage);

      let img = this.croppedImage;
      let file = this.base64ToFile(img);
      console.log('file');
      console.log(file);

      // const img = this.dataURItoBlob(this.croppedImage);
      // console.log(img);
      this.homeService.setTowerImage(file, this.tower.id);
      this.uploading = false;
      this.homeService.updateTowerImage(file);

      console.log('done');
    }
    this.dialogRef.close();
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready');
  }

  loadImageFailed() {
    console.log('Load failed');
  }
}
