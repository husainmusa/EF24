"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyCornerPage = void 0;
var sub_users_1 = require("./../sub-users/sub-users");
var emailPreference_1 = require("../emailPreference/emailPreference");
var changePassword_1 = require("../changePassword/changePassword");
var changeProfileData_1 = require("../changeProfileData/changeProfileData");
var searchResults_1 = require("../searchResults/searchResults");
var core_1 = require("@angular/core");
var invoice_1 = require("../invoice/invoice");
var signIn_1 = require("../signIn/signIn");
var cargarage_1 = require("../cargarage/cargarage");
var add_sub_user_1 = require("../add-sub-user/add-sub-user");
var MyCornerPage = /** @class */ (function () {
    function MyCornerPage(navCtrl, navParams, webService, translate, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.webService = webService;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        // changeProfileDataPage = ChangeProfileDataPage;
        this.changePasswordPage = changePassword_1.ChangePasswordPage;
        this.emailPreferencePage = emailPreference_1.EmailPreferencePage;
        this.invoicePage = invoice_1.InvoicePage;
        this.subUserPage = sub_users_1.SubUsersPage;
        this.showCard = true;
        this.getInfo();
    }
    MyCornerPage.prototype.searchResultsPage = function (pageTitle, anotherTitle) {
        this.navCtrl.push(searchResults_1.SearchResultsPage, {
            title: pageTitle,
            subTitle: anotherTitle
        });
    };
    ;
    MyCornerPage.prototype.getInfo = function () {
        this.parentid = parseInt(localStorage.getItem("parentid"));
        this.roleid = parseInt(localStorage.getItem("roleid"));
        if (this.parentid > 0) {
            this.showCard = false;
        }
    };
    ;
    MyCornerPage.prototype.next = function () {
        this.navCtrl.push(cargarage_1.CarGaragePage);
    };
    ;
    MyCornerPage.prototype.deleteUser = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Account',
            message: 'Are you sure you want to delete your account? Doing so means that you will lose all the account information and sub user accounts.',
            cssClass: 'alertCustomWraper',
            buttons: [
                {
                    text: 'No',
                    cssClass: 'alertCustomBtnLeft',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    cssClass: 'alertCustomBtnRight',
                    handler: function () {
                        console.log('Delete clicked');
                        _this.webService.deleteUser().subscribe(function (data) {
                            if (data.success == true) {
                                _this.webService.loading.dismiss();
                                _this.webService.presentToast(data.message);
                                window.localStorage.removeItem('token');
                                window.localStorage.removeItem('firstname');
                                window.localStorage.removeItem('lastname');
                                window.localStorage.removeItem('profileImage');
                                window.localStorage.removeItem('language');
                                _this.navCtrl.setRoot(signIn_1.SignInPage);
                                //this.navCtrl.setRoot(this.navCtrl.getActive().component);
                            }
                            else {
                                _this.webService.loading.dismiss();
                                _this.webService.presentToast(data.message);
                            }
                        }, function (err) {
                            _this.webService.loading.dismiss();
                            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ;
    MyCornerPage.prototype.changeData = function () {
        //[navPush]="changeProfileDataPage"
        console.log(localStorage.getItem('parentid'));
        var userId = localStorage.getItem('parentid');
        // let userId : any =  29 ;
        if (userId == 0) {
            this.navCtrl.push(changeProfileData_1.ChangeProfileDataPage);
        }
        else {
            this.navCtrl.push(add_sub_user_1.AddSubUserPage, {
                subUserId: localStorage.getItem('user_id')
            });
        }
    };
    ;
    MyCornerPage = __decorate([
        core_1.Component({
            templateUrl: "myCorner.html",
            selector: "page-mycorner"
        })
    ], MyCornerPage);
    return MyCornerPage;
}());
exports.MyCornerPage = MyCornerPage;
