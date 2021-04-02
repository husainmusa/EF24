"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.createTranslateLoader = void 0;
var emailPreference_1 = require("../pages/emailPreference/emailPreference");
var changePassword_1 = require("../pages/changePassword/changePassword");
var changeProfileData_1 = require("../pages/changeProfileData/changeProfileData");
var tab2_1 = require("../pages/searchOption/tab2/tab2");
var tab1_1 = require("../pages/searchOption/tab1/tab1");
var vehicleDetails_1 = require("../pages/vehicleDetails/vehicleDetails");
var signIn_1 = require("../pages/signIn/signIn");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var app_component_1 = require("./app.component");
var home_1 = require("../pages/home/home");
var addAdvertisement_1 = require("../pages/addAdvertisement/addAdvertisement");
var status_bar_1 = require("@ionic-native/status-bar");
var splash_screen_1 = require("@ionic-native/splash-screen");
var registration_1 = require("../pages/registration/registration");
var howItWorks_1 = require("../pages/howItWorks/howItWorks");
var sellVehicle_1 = require("../pages/sellVehicle/sellVehicle");
var searchOption_1 = require("../pages/searchOption/searchOption");
var contactUs_1 = require("../pages/contactUs/contactUs");
var aboutUs_1 = require("../pages/aboutUs/aboutUs");
var myCorner_1 = require("../pages/myCorner/myCorner");
var searchResults_1 = require("../pages/searchResults/searchResults");
var web_service_1 = require("../providers/web-service");
var http_1 = require("@angular/http");
var secure_storage_1 = require("@ionic-native/secure-storage");
var forms_1 = require("@angular/forms");
var ngx_countdown_timer_1 = require("ngx-countdown-timer");
var step_one_1 = require("../pages/step-one/step-one");
var step_two_1 = require("../pages/step-two/step-two");
var step_three_1 = require("../pages/step-three/step-three");
var preview_vehicle_1 = require("../pages/preview-vehicle/preview-vehicle");
var invoice_1 = require("../pages/invoice/invoice");
var vehicle_damage_modal_1 = require("../pages/vehicle-damage-modal/vehicle-damage-modal");
var forgot_password_1 = require("../pages/forgot-password/forgot-password");
var file_1 = require("@ionic-native/file");
var transfer_1 = require("@ionic-native/transfer");
var file_path_1 = require("@ionic-native/file-path");
var file_transfer_1 = require("@ionic-native/file-transfer");
var camera_1 = require("@ionic-native/camera");
var storage_1 = require("@ionic/storage");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var components_module_1 = require("./../components/components.module");
var shared_header_1 = require("../components/shared-header/shared-header");
var vehicle_search_modal_1 = require("../pages/vehicle-search-modal/vehicle-search-modal");
var sub_users_1 = require("./../pages/sub-users/sub-users");
var add_sub_user_1 = require("../pages/add-sub-user/add-sub-user");
var call_number_1 = require("@ionic-native/call-number");
var alert_modal_1 = require("../pages/alert-modal/alert-modal");
var ngx_countdown_1 = require("ngx-countdown");
var cargarage_1 = require("../pages/cargarage/cargarage");
var common_1 = require("@angular/common");
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                home_1.HomePage,
                addAdvertisement_1.AddAdvertisementPage,
                howItWorks_1.HowItWorksPage,
                registration_1.RegistrationPage,
                sellVehicle_1.SellVehiclePage,
                contactUs_1.ContactUsPage,
                aboutUs_1.AboutUsPage,
                searchOption_1.SearchOptionPage,
                myCorner_1.MyCornerPage,
                signIn_1.SignInPage,
                vehicleDetails_1.VehicleDetailsPage,
                tab1_1.tab1,
                tab2_1.tab2,
                searchResults_1.SearchResultsPage,
                changeProfileData_1.ChangeProfileDataPage,
                changePassword_1.ChangePasswordPage,
                emailPreference_1.EmailPreferencePage,
                step_one_1.StepOnePage,
                step_two_1.StepTwoPage,
                step_three_1.StepThreePage,
                preview_vehicle_1.PreviewVehiclePage,
                invoice_1.InvoicePage,
                vehicle_damage_modal_1.VehicleDamageModalPage,
                vehicle_search_modal_1.VehicleSearchModalPage,
                sub_users_1.SubUsersPage,
                add_sub_user_1.AddSubUserPage,
                forgot_password_1.ForgotPasswordPage,
                alert_modal_1.AlertModalPage,
                cargarage_1.CarGaragePage,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, {
                    tabsHideOnSubPages: true,
                    scrollAssist: false,
                    autoFocusAssist: false
                }),
                ngx_countdown_timer_1.CountdownTimerModule.forRoot(),
                storage_1.IonicStorageModule.forRoot(),
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [http_1.Http]
                    }
                }),
                components_module_1.ComponentsModule,
                ngx_countdown_1.CountdownModule
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                home_1.HomePage,
                addAdvertisement_1.AddAdvertisementPage,
                howItWorks_1.HowItWorksPage,
                registration_1.RegistrationPage,
                sellVehicle_1.SellVehiclePage,
                contactUs_1.ContactUsPage,
                aboutUs_1.AboutUsPage,
                searchOption_1.SearchOptionPage,
                myCorner_1.MyCornerPage,
                signIn_1.SignInPage,
                vehicleDetails_1.VehicleDetailsPage,
                tab1_1.tab1,
                tab2_1.tab2,
                searchResults_1.SearchResultsPage,
                changeProfileData_1.ChangeProfileDataPage,
                changePassword_1.ChangePasswordPage,
                emailPreference_1.EmailPreferencePage,
                step_one_1.StepOnePage,
                step_two_1.StepTwoPage,
                step_three_1.StepThreePage,
                preview_vehicle_1.PreviewVehiclePage,
                invoice_1.InvoicePage,
                vehicle_damage_modal_1.VehicleDamageModalPage,
                shared_header_1.SharedHeaderComponent,
                vehicle_search_modal_1.VehicleSearchModalPage,
                sub_users_1.SubUsersPage,
                add_sub_user_1.AddSubUserPage,
                forgot_password_1.ForgotPasswordPage,
                alert_modal_1.AlertModalPage,
                cargarage_1.CarGaragePage,
            ],
            providers: [
                status_bar_1.StatusBar,
                web_service_1.WebService,
                splash_screen_1.SplashScreen,
                secure_storage_1.SecureStorage,
                { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
                file_1.File,
                transfer_1.Transfer,
                camera_1.Camera,
                file_path_1.FilePath,
                file_transfer_1.FileTransfer,
                call_number_1.CallNumber,
                common_1.CurrencyPipe
                //UsernameValidator,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
