import { EmailPreferencePage } from '../pages/emailPreference/emailPreference';
import { ChangePasswordPage } from '../pages/changePassword/changePassword';
import { ChangeProfileDataPage } from '../pages/changeProfileData/changeProfileData';
import { tab2 } from '../pages/searchOption/tab2/tab2';
import { tab1 } from '../pages/searchOption/tab1/tab1';
import { VehicleDetailsPage } from '../pages/vehicleDetails/vehicleDetails';
import { SignInPage } from '../pages/signIn/signIn';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddAdvertisementPage } from '../pages/addAdvertisement/addAdvertisement';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegistrationPage } from '../pages/registration/registration';
import { HowItWorksPage } from '../pages/howItWorks/howItWorks';
import { SellVehiclePage } from '../pages/sellVehicle/sellVehicle';
import { SearchOptionPage } from '../pages/searchOption/searchOption';
import { ContactUsPage } from '../pages/contactUs/contactUs';
import { AboutUsPage } from '../pages/aboutUs/aboutUs';
import { MyCornerPage } from '../pages/myCorner/myCorner';
import { SearchResultsPage } from '../pages/searchResults/searchResults';
import { WebService } from '../providers/web-service';
import { HttpModule, Http } from '@angular/http';
import { SecureStorage } from '@ionic-native/secure-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StepOnePage} from '../pages/step-one/step-one';
import {StepTwoPage} from '../pages/step-two/step-two';
import {StepThreePage} from '../pages/step-three/step-three';
import {PreviewVehiclePage} from '../pages/preview-vehicle/preview-vehicle';
import {InvoicePage} from '../pages/invoice/invoice';
import {VehicleDamageModalPage} from '../pages/vehicle-damage-modal/vehicle-damage-modal';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';

import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ComponentsModule } from './../components/components.module';
import { SharedHeaderComponent } from '../components/shared-header/shared-header';
import { UsernameValidator } from './validators/username';
import { VehicleSearchModalPage } from '../pages/vehicle-search-modal/vehicle-search-modal';
import { SubUsersPage } from './../pages/sub-users/sub-users';
import { AddSubUserPage } from '../pages/add-sub-user/add-sub-user';

import { CallNumber } from '@ionic-native/call-number';

import { AlertModalPage } from '../pages/alert-modal/alert-modal';

// import { CountdownModule  , Config  } from 'ngx-countdown';
import { CarGaragePage } from '../pages/cargarage/cargarage';

import { CurrencyPipe } from '@angular/common';

import { GarageDetailPage } from '../pages/garageDetail/garageDetail';

import { CountdownTimer } from "../pages/countdown-timer.component";
import { HttpClient } from '@angular/common/http';
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { AppConstaints } from '../config/AppConstaints';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddAdvertisementPage,
    HowItWorksPage,
    RegistrationPage,
    SellVehiclePage,
    ContactUsPage,
    AboutUsPage,
    SearchOptionPage,
    MyCornerPage,
    SignInPage,
    VehicleDetailsPage,
    tab1,
    tab2,
    SearchResultsPage,
    ChangeProfileDataPage,
    ChangePasswordPage,
    EmailPreferencePage,
    StepOnePage,
    StepTwoPage,
    StepThreePage,
    PreviewVehiclePage,
    InvoicePage,
    VehicleDamageModalPage,
    VehicleSearchModalPage,
    SubUsersPage,
    AddSubUserPage,
    ForgotPasswordPage,
    AlertModalPage,
    CarGaragePage,
    GarageDetailPage,
    CountdownTimer

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp,  {
      tabsHideOnSubPages: true,
      scrollAssist: false,
      autoFocusAssist: false,
      mode:'md'
      // scrollPadding:true
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
      
    }),
    ComponentsModule
    // CountdownModule 
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddAdvertisementPage,
    HowItWorksPage,
    RegistrationPage,
    SellVehiclePage,
    ContactUsPage,
    AboutUsPage,
    SearchOptionPage,
    MyCornerPage,
    SignInPage,
    VehicleDetailsPage,
    tab1,
    tab2,
    SearchResultsPage,
    ChangeProfileDataPage,
    ChangePasswordPage,
    EmailPreferencePage,
    StepOnePage,
    StepTwoPage,
    StepThreePage,
    PreviewVehiclePage,
    InvoicePage,
    VehicleDamageModalPage,
    SharedHeaderComponent,
    VehicleSearchModalPage,
    SubUsersPage,
    AddSubUserPage,
    ForgotPasswordPage,
    AlertModalPage,
    CarGaragePage,
    GarageDetailPage,
  
  ],
  providers: [
    StatusBar,
    WebService,
    SplashScreen,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Transfer,
    Camera,
    FilePath,
    FileTransfer,
    CallNumber,
    CurrencyPipe,
    //UsernameValidator,
    AppConstaints,
    ImageResizer
  ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}
