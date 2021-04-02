"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignInPage = void 0;
var registration_1 = require("../registration/registration");
var home_1 = require("../home/home");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forgot_password_1 = require("../forgot-password/forgot-password");
var SignInPage = /** @class */ (function () {
    function SignInPage(navCtrl, webService, translate, events, fb) {
        this.navCtrl = navCtrl;
        this.webService = webService;
        this.translate = translate;
        this.events = events;
        this.fb = fb;
        //mail.bestfreelancer
        //arunangshupradhan17
        this.homePage = home_1.HomePage;
        this.registrationPage = registration_1.RegistrationPage;
        this.account = {
            username: '',
            password: ''
        };
        this.validation_messages = {
            'username': [
                { type: 'required', message: this.translate.instant("lbl_username_required") }
            ],
            'password': [
                { type: 'required', message: this.translate.instant("lbl_password_required") }
            ]
        };
        this.loginForm = this.fb.group({
            'username': ['subuser1', forms_1.Validators.compose([forms_1.Validators.required])],
            'password': ['phpdev@123#', forms_1.Validators.compose([forms_1.Validators.required])]
        });
    }
    // Attempt to login in through our User service
    SignInPage.prototype.doLogin = function () {
        var _this = this;
        this.webService.login(this.account).subscribe(function (data) {
            console.log(data);
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                window.localStorage.setItem('user_id', data.data.userData.id);
                window.localStorage.setItem('token', data.data.userData.token);
                window.localStorage.setItem('firstname', data.data.userData.fname);
                window.localStorage.setItem('lastname', data.data.userData.lname);
                window.localStorage.setItem('profileImage', data.data.userData.image);
                window.localStorage.setItem('emailpreference', data.data.userData.email_preference);
                window.localStorage.setItem('parentid', data.data.userData.parent_id);
                window.localStorage.setItem('roleid', data.data.userData.role_id);
                var language = void 0;
                switch (data.data.userData.language) {
                    case 'English':
                        language = 'en';
                        break;
                    case 'French':
                        language = 'fr';
                        break;
                    case 'Italian':
                        language = 'it';
                        break;
                    case 'German':
                        language = 'de';
                        break;
                    default:
                        language = 'de';
                        break;
                }
                window.localStorage.setItem('language', language);
                _this.translate.setDefaultLang(language);
                _this.translate.use(language);
                _this.events.publish('user:after-login', data.data.userData.fname, data.data.userData.lname, data.data.userData.image);
                _this.navCtrl.setRoot(home_1.HomePage);
            }
            else {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.loading.dismiss();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
    };
    ;
    SignInPage.prototype.forgotPass = function () {
        this.navCtrl.push(forgot_password_1.ForgotPasswordPage).then(function () { })["catch"](function (Err) { console.log(Err); });
    };
    ;
    SignInPage = __decorate([
        core_1.Component({
            templateUrl: "signIn.html",
            selector: "page-signin"
        })
    ], SignInPage);
    return SignInPage;
}());
exports.SignInPage = SignInPage;
