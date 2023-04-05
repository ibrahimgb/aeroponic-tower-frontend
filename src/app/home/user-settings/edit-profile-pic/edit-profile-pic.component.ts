import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
//import { convertBase64ToFile, saveAs } from 'file-saver';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-edit-profile-pic',
  templateUrl: './edit-profile-pic.component.html',
  styleUrls: ['./edit-profile-pic.component.scss'],
})
export class EditProfilePicComponent {
  uploading = false;
  imageBase64String: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = true;
  transform: ImageTransform = {};
  user: any;

  @Output() closeDialog = new EventEmitter<boolean>();

  avatar!: any;
  avatar1 = this.sanitizer.bypassSecurityTrustUrl(
    this.homeService.getAvatarBase64()
  );

  constructor(
    private homeService: HomeService,
    private _sanitizer: DomSanitizer,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<EditProfilePicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.homeService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.homeService.getUserAvatarObs().subscribe((blob: any) => {
      let objectURL = URL.createObjectURL(blob);
      this.avatar = blob;
      //this.avatar = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // console.log(this.avatar);
      // this.blobToBase64(blob).then((res: any) => {
      //   // do what you wanna do

      //   console.log('res is base64 now');
      //   //console.log(res); // res is base64 now
      //   this.homeService.setAvatarBase64(res);
      //   this.avatar = this.sanitizer.bypassSecurityTrustUrl(res);
      // });
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

  // ngAfterViewInit (): void {
  //   this.getBase64FromFile('../../assets/image.jpg');
  // }

  // getBase64(imgUrl: any) {
  //        const self = this;
  //        var xhr = new XMLHttpRequest();
  //        xhr.open("get", imgUrl, true);
  //        // Essential
  //        xhr.responseType = "blob";
  //        xhr.onload = function () {
  //          if (this.status == 200) {
  //            //Get a blob objects
  //            var blob = this.response;
  //            console.log("blob", blob)
  //            //  Essential
  //            let oFileReader = new FileReader();
  //            oFileReader.onloadend = function (e) {
  //              let base64 = e.target;
  //              self.base64String = (<any>base64).result;
  //              console.log("method one"""""""""", base64)
  //            };
  //            oFileReader.readAsDataURL(blob);
  //            //==== In order to display the picture on the page, you can delete ====
  //            // var img = document.createElement("img");
  //            // img.onload = function (e) {
  //            //   window.URL.revokeObjectURL(img.src); //  Clear release
  //            // };
  //            // let src = window.URL.createObjectURL(blob);
  //            // img.src = src
  //            // document.getElementById("container1").appendChild(img);
  //            //==== In order to display the picture on the page, you can delete ====

  //          }
  //      }
  //        xhr.send();
  //      }

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
    console.log(this.croppedImage);
    console.log('dassfsdfs<');
    console.log(this.avatar);
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
      console.log(file);

      // const img = this.dataURItoBlob(this.croppedImage);
      // console.log(img);
      this.homeService.saveProfileImage(file);
      this.uploading = false;
      this.homeService.updateUserAvatar(file);

      console.log('done');
    }
    this.dialogRef.close();
    console.log('done');
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }
}
