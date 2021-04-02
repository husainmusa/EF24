import { MyCornerPage } from '../pages/myCorner/myCorner';
import { SignInPage } from '../pages/signIn/signIn';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { AddAdvertisementPage } from '../pages/addAdvertisement/addAdvertisement';
import { RegistrationPage } from '../pages/registration/registration';
import { HowItWorksPage } from '../pages/howItWorks/howItWorks';
import { SellVehiclePage } from '../pages/sellVehicle/sellVehicle';
import { ContactUsPage } from '../pages/contactUs/contactUs';
import { AboutUsPage } from '../pages/aboutUs/aboutUs';
import { SearchOptionPage } from '../pages/searchOption/searchOption';
import { PreviewVehiclePage } from '../pages/preview-vehicle/preview-vehicle';
import { WebService } from '../providers/web-service';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
declare var cordova :any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage: any;
  pages: Array<{ title: string, component: any, icon: string }>;
  firstname: string;
  lastname: string;
  profileImage: string;
  lang: any;

  pageHome:string;
  pageAddAdvertisement:string;
  pageHowItWorks:string;
  pageRegistration:string;
  pageSellVehicle:string;
  pageContactUs:string;
  pageAboutUs:string;
  pageSearchOption:string;
  pageMyCorner:string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private webService: WebService,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    private storage: Storage,
    public events: Events,
    public translate: TranslateService
  ) {

    // this.lang = 'de';
    //this.translate.setDefaultLang('de');
    //translate.use('de');
    //translate.setDefaultLang('de');

    this.initializeApp();

    

    events.subscribe('user:after-login', (firstName, LastName, profilePic) => {
      console.log("Fire!!!!" + profilePic );
      this.firstname = firstName;
      this.lastname = LastName;
      if(profilePic != null  ){
        this.profileImage = profilePic;
      } else {
        this.profileImage = 'assets/images/no-user.png';
      }
    });

    
    //console.log('web service' + this.webService.getLangByLabel('lbl_home') );

    

    // this.translate.get('lbl_home').subscribe(
    //   value => {
    //     this.pageHome = value;
    //     // value is our translated string
    //     console.log( 'translated ' + value);
    //   }
    // );

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'lbl_home' , component: HomePage, icon: 'home' },
      { title: 'lbl_add_advertisement', component: AddAdvertisementPage, icon: 'plus' },
      { title: 'lbl_how_it_works', component: HowItWorksPage, icon: 'gear' },
      //{ title: 'lbl_registration', component: RegistrationPage, icon: 'user-plus' },
      // { title: 'lbl_sell_vehicle', component: SellVehiclePage, icon: 'car' },
      { title: 'lbl_contact_us', component: ContactUsPage, icon: 'phone' },
      { title: 'lbl_about_us', component: AboutUsPage, icon: 'info-circle' },
      { title: 'lbl_search_options', component: SearchOptionPage, icon: 'search' },
      { title: 'lbl_my_corner', component: MyCornerPage, icon: 'user-circle' }
    ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.translate.setDefaultLang('de');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(true);
      if(this.platform.is('cordova')){
        (<any>window).open = (<any>cordova).InAppBrowser.open;
      }
      this._initTranslate();
    });
  }

  private _initTranslate() {
    let defaultLang;
    if( window.localStorage.getItem('language') != 'undefined' && window.localStorage.getItem('language') !== null ){
      defaultLang = window.localStorage.getItem('language');
    } else {
      //defaultLang = 'de';
      defaultLang = 'en';
    } 
    // console.log('this.formateLaguageToStandard(defaultLang)',this.formateLaguageToStandard(defaultLang));
    this.translate.setDefaultLang(this.formateLaguageToStandard(defaultLang) );
    this.translate.use(this.formateLaguageToStandard(defaultLang) );
    console.log( typeof(window.localStorage.getItem('profileImage')));
    if( window.localStorage.getItem('profileImage') != 'null'  ){
      // console.log("asdasdasd dasdadas aasda d!!!!");
      this.profileImage = window.localStorage.getItem('profileImage');
    } else {
      // console.log("**************************************");
      this.profileImage = 'assets/images/no-user.png';
    }

    this.firstname = window.localStorage.getItem('firstname');
    this.lastname = window.localStorage.getItem('lastname');

    if (window.localStorage.getItem('token')) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = SignInPage;
    }


  }

  formateLaguageToStandard(lang){
    if(lang=='de'){
      return 'deu';
    }else if(lang=='fr'){
      return 'fra'
    }else if(lang =='it'){
      return 'ita';
    }else if(lang =='en'){
      return 'en';
    }else{
      return lang;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('firstname');
    window.localStorage.removeItem('lastname');
    window.localStorage.removeItem('profileImage');
    window.localStorage.removeItem('language');
    this.nav.setRoot(SignInPage);
  }

  deletePhoto() {

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
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
      this.webService.presentToast('Error while selecting image.');
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
      headers: { 'token': this.webService.token }
    };

    console.log(options);
    console.log(this.webService.token);
    const fileTransfer: TransferObject = this.transfer.create();
    //    this.webService.loading.present();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      console.log(data);
      var responseData = JSON.parse(data.response);
      if (responseData.success == true) {
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
      this.webService.presentToast('Error while storing file.');
    });
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }

}
