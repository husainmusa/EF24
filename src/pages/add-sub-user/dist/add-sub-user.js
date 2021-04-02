"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddSubUserPage = void 0;
var sub_users_1 = require("./../sub-users/sub-users");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var changePassword_1 = require("../../pages/changePassword/changePassword");
/**
 * Generated class for the AddSubUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddSubUserPage = /** @class */ (function () {
    function AddSubUserPage(navCtrl, navParams, webService, translate, fb) {
        //console.log( ' Edit subuser ID: ' + this.navParams.get('subUserId') );
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.webService = webService;
        this.translate = translate;
        this.fb = fb;
        this.isEdit = false;
        this.user = {
            prefix_name: "",
            fname: "",
            lname: "",
            email: "",
            phone: "",
            mobile: "",
            language: "",
            username: "",
            password: "",
            repassword: "",
            site_reference: "",
            biodata: "",
            status: "",
            subUserId: null
        };
        if (typeof (this.navParams.get('subUserId')) != 'undefined' && this.navParams.get('subUserId') != '') {
            this.subUserId = this.navParams.get('subUserId');
            this.webService.getUserData(this.subUserId).subscribe(function (data) {
                if (data.success == true) {
                    _this.user = data.data.userData.User;
                    //this.usernames = data.userData.User.fname;
                    //console.log(data[0].User.fname);
                    _this.webService.loading.dismiss();
                }
                else {
                    _this.webService.loading.dismiss();
                    _this.webService.presentToast(data.message);
                }
            }, function (err) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            });
            this.isEdit = true;
        }
        this.validation_messages = {
            'user_fname': [
                { type: 'required', message: this.translate.instant('lbl_user_first_name_required') }
            ],
            'user_lname': [
                { type: 'required', message: this.translate.instant('lbl_user_last_name_required') }
            ],
            'user_phone': [
                { type: 'required', message: this.translate.instant('lbl_user_phone_required') }
            ],
            'user_username': [
                { type: 'required', message: this.translate.instant('lbl_username_required') }
            ],
            'user_password': [
                { type: 'required', message: this.translate.instant('lbl_password_required') }
            ],
            'user_repassword': [
                { type: 'required', message: this.translate.instant('lbl_confirm_password_required') }
            ]
        };
        this.AddSubUserForm = this.fb.group({
            // 'user_prefix_name' : [null, Validators.compose([Validators.required])],
            'user_fname': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_lname': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_email': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            //'user_phone_code': [null, Validators.compose([Validators.required])],
            'user_phone': [null],
            //'user_mobile_code': [null, Validators.compose([Validators.required])],
            'user_mobile': [null],
            'user_language': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_username': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            // 'user_password': [null, Validators.compose([ !this.subUserId ? Validators.required : null ])],
            'user_password': [null, !this.subUserId ? forms_1.Validators.compose([forms_1.Validators.required]) : null],
            'user_repassword': [null, !this.subUserId ? forms_1.Validators.compose([forms_1.Validators.required]) : null],
            'user_site_reference': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_biodata': [null],
            'user_status': [null, forms_1.Validators.compose([forms_1.Validators.required])]
        }, { validator: this.matchingPasswords('user_password', 'user_repassword') });
        this.getName();
    }
    AddSubUserPage.prototype.getName = function () {
        this.usernames = localStorage.getItem("firstname");
    };
    AddSubUserPage.prototype.matchingPasswords = function (passwordKey, confirmPasswordKey) {
        return function (group) {
            var password = group.controls[passwordKey];
            var confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    };
    AddSubUserPage.prototype.save = function () {
        var _this = this;
        if (this.subUserId) {
            this.user.subUserId = this.subUserId;
        }
        this.webService.addUpdateUser(this.user).subscribe(function (data) {
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                _this.navCtrl.setRoot(sub_users_1.SubUsersPage);
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
    AddSubUserPage.prototype.changepassword = function () {
        this.navCtrl.push(changePassword_1.ChangePasswordPage, {
            subUserId: this.subUserId
        });
    };
    AddSubUserPage = __decorate([
        core_1.Component({
            selector: 'page-add-sub-user',
            templateUrl: 'add-sub-user.html'
        })
    ], AddSubUserPage);
    return AddSubUserPage;
}());
exports.AddSubUserPage = AddSubUserPage;
