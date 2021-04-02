import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WebService } from '../../providers/web-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: "changeProfileData.html",
  selector: "page-changeprofiledata"
})

export class ChangeProfileDataPage {

  profileImage: string;

  ProfileForm : FormGroup;
  public validation_messages:any;

   viewOne : boolean = true ;
    viewTwo : boolean = false ;

  public company: {
    name: string,
    addition: string,
    street: string,
    pob: string,
    postcode: number,
    town: string,
    country: string,
    commercial_register:string,
    
  } = {
    name: "",
    addition: "",
    street: "",
    pob: "",
    postcode: null,
    town: "",
    country: "",
    commercial_register:""
  };

  user: {
    username:string,
    prefix_name:string,
    fname:string,
    lname:string,
    email:string,
    phone_code:string,
    phone:number,
    mobile_code:number,
    mobile:number,
    language:string,
    site_reference:string
  } = {
    username: "",
    prefix_name:"",
    fname:"",
    lname:"",
    email:"",
    phone_code:"",
    phone:null,
    mobile_code:41,
    mobile:null,
    language:"English",
    site_reference:"FLEET"
  };
  countyList: any;

  constructor(
    public navCtrl: NavController,
    private webService: WebService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public platform: Platform,
    public fb: FormBuilder,
    public translate: TranslateService
  ) {

    // if( window.localStorage.getItem('profileImage') == 'null' ){
    //   this.profileImage = 'assets/images/no-user.png';
    // } else {
    //   this.profileImage = window.localStorage.getItem('profileImage');
    // }

    this.webService.getProfileData().subscribe(
      data => {
        console.log("Company Informatipon !!!! ") ;

        console.log(data);

        if (data.success == true) {

          console.log("Here success Data !!! Will Change");
          this.company = data.data.userData.Company;
          this.user = data.data.userData.User;
          this.profileImage = data.data.userData.User.image;
          this.getCountryList();
          this.webService.loading.dismiss();


          console.log(this.company);
        } else {

          console.log("Here Error Data !!! Will Change");
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
        }
      },
      err => {
        this.webService.loading.dismiss();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
      }
    );

    this.validation_messages = {
      'company_name': [
          { type: 'required', message: this.translate.instant('lbl_company_name_required') }
      ],
      'company_pob': [
          { type: 'required', message: this.translate.instant('lbl_company_pob_required') }
      ],
      'company_postcode': [
        { type: 'required', message: this.translate.instant('lbl_company_post_code_required') }
      ],
      'company_town': [
          { type: 'required', message: this.translate.instant('lbl_company_town_required') }
      ],
      'company_country': [
          { type: 'required', message: this.translate.instant('lbl_company_country_required') }
      ],
      'user_fname': [
          { type: 'required', message: this.translate.instant('lbl_user_first_name_required') }
      ],
      'user_lname': [
          { type: 'required', message: this.translate.instant('lbl_user_last_name_required') }
      ],
      'user_phone': [
          { type: 'required', message: this.translate.instant('lbl_user_phone_required') }
      ]
      // 'user_username': [
      //     { type: 'required', message: 'Username is required.' }
      // ],
      // 'user_password': [
      //     { type: 'required', message: 'Password is required.' }
      // ],
      // 'user_repassword': [
      //     { type: 'required', message: 'Confirm password is required.' }
      // ]  
  };

    this.ProfileForm = this.fb.group({
      'company_name' : [null, Validators.compose([Validators.required])],
      //'company_addition' : [null],
      'company_CC' : [null, Validators.compose([Validators.required])],
      'company_street' : [null],
      'company_pob' : [null],
      'company_postcode': [null, Validators.compose([Validators.required])],
      'company_town' : [null, Validators.compose([Validators.required])],
      'company_country' : [null, Validators.compose([Validators.required])],
      'user_username': [null],
      'user_prefix_name' : [null, Validators.compose([Validators.required])],
      'user_fname' : [null, Validators.compose([Validators.required])],
      'user_lname': [null, Validators.compose([Validators.required])],
      'user_email': [null],
      'user_phone_code': [null, Validators.compose([Validators.required])],
      'user_phone': [null, Validators.compose([Validators.required])],
      'user_mobile_code': [null],
      'user_mobile': [null],
      'user_language': [null],
      'user_site_reference': [null, Validators.compose([Validators.required])]
});

  }

  save() {
    this.webService.updateProfileData(this.company, this.user).subscribe(
      data => {
        //console.log(data);
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
          this.navCtrl.pop();
        } else {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
        }
      },
      err => {
        this.webService.loading.dismiss();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log(err);
      }
    );
    //this.navCtrl.pop();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translate.instant('lbl_select_image_source'),
      buttons: [
        {
          text: this.translate.instant('lbl_load_from_library'),
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: this.translate.instant('lbl_user_camera'),
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: this.translate.instant('lbl_cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG
    };
    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.webService.presentToast( this.translate.instant('lbl_selecting_image_error') );
    });
  }

  public uploadImage(image) {


    // Destination URL
    var url = this.webService.baseUrl + "api/uploadProfilePic";

    // File for Upload
    var targetPath = this.pathForImage(image);

    // File name only
    var filename = image;

    var options = {
      fileKey: "data[User][image]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename },
      headers: { 'token': window.localStorage.getItem('token') }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    //    this.webService.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {

      var responseData = JSON.parse(data.response);
      if (responseData.success == true) {
        //console.log(responseData.data.imageUrl);
        this.profileImage = responseData.data.imageUrl;
        window.localStorage.setItem('profileImage', responseData.data.imageUrl);
      }
      //this.webService.loading.dismissAll()
      //this.webService.presentToast('Image succesful uploaded.');
    }, err => {
      //this.webService.loading.dismissAll()
      //this.webService.presentToast('Error while uploading file.');
    });

    //this.navCtrl.setRoot(StepThreePage);
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.uploadImage(newFileName);
    }, error => {
      this.webService.presentToast( this.translate.instant('lbl_file_storing_error') );
    });
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  };


  whichView(type : any){
    switch(type){
        case 'next' :{

          this.viewOne = false ;
          this.viewTwo = true ;

            break;
        }
        case 'previous' : {
          
          this.viewOne = true ;
          this.viewTwo = false ;

        break;
        }

      
        case 'submit' : {

          this.save();

        break;
        }

        default :{

            break;
        }
    }

};

getCountryList(){

  this.webService.getCountry(false).subscribe((serverResponse:any)=>{

      console.log(serverResponse);

      if(serverResponse.success){
          this.countyList= serverResponse.data.Country
          // if(this.webService.loading) this.webService.loading.dismiss();
      }

  },(Err)=>{
    // if(this.webService.loading) this.webService.loading.dismiss();
      console.log(Err)
  });

};


  
}