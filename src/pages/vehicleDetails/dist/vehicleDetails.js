"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleDetailsPage = void 0;
var step_one_1 = require("./../step-one/step-one");
var core_1 = require("@angular/core");
var home_1 = require("../../pages/home/home");
var vehicle_damage_modal_1 = require("../../pages/vehicle-damage-modal/vehicle-damage-modal");
var VehicleDetailsPage = /** @class */ (function () {
    function VehicleDetailsPage(navCtrl, navParams, webService, alertCtrl, modalController, translate, cp) {
        //private photoViewer: PhotoViewer
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.webService = webService;
        this.alertCtrl = alertCtrl;
        this.modalController = modalController;
        this.translate = translate;
        this.cp = cp;
        this.isFavorite = false;
        this.sellerId = window.localStorage.getItem('user_id');
        this.showCard = true;
        this.showCards = true;
        this.test = [];
        this.baseUrl = this.webService.baseUrl;
        this.vehicle = this.navParams.get("vehicle");
        this.actionType = this.navParams.get('actionType');
        if (this.actionType == 'lbl_my_purchased_cars') {
            this.showCard = false;
            console.log('winky');
        }
        console.log(this.vehicle);
        console.log(this.actionType);
        //this.sellerId = ;
        //console.log("current user: " + this.sellerId );
        // this.webService.getVehicleBids(this.vehicle.Vehicle.id).subscribe(
        //   data => {
        //     console.log(data);
        //     if (data.success == true) {
        //      this.webService.hideLoading();
        //       this.webService.presentToast(data.message);
        //       this.bidArr = data.data.bidDropDown;
        //       this.buyerArr = data.data.buyerArr;
        //     } else {
        //       this.webService.hideLoading();
        //       this.webService.presentToast(data.message);
        //     }
        //   },
        //   err => {
        //     this.webService.hideLoading();
        //     this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        //     console.log(err);
        //   }
        // );
        this.webService.recentOffers(this.vehicle.Vehicle.id).subscribe(function (data) {
            console.log(data);
            if (data.success == true) {
                _this.webService.hideLoading();
                //console.log("data.message");
                _this.webService.presentToast(data.message);
                _this.subUsers = data.data.offer_list;
                _this.subUsers.forEach(function (element, index) {
                    element.biding_amount = _this.cp.transform(element.biding_amount, 'USD', true, '1.2-2');
                    console.log("Recent Offer :", element.biding_amount);
                    var pp = element.biding_amount.replace(",", "'");
                    var mn = pp.split(".");
                    var ppg = mn[0] + ".-";
                    var oneMore = ppg.split("$");
                    // console.log("Final Formated Result : ",oneMore[1]);
                    element.biding_amount = oneMore[1];
                });
                // console.log(data.data);
                // console.log(data.data.offer_list[0].id);
                // console.log("here");
                // this.offers = data.data.offer_list;
                // this.buyerArr = data.data.buyerArr;
            }
            else {
                _this.webService.hideLoading();
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
        this.webService.checkVehicleFavourite(this.vehicle.Vehicle.id).subscribe(function (data) {
            if (data.success == true) {
                // this.webService.hideLoading();
                _this.webService.presentToast(data.message);
                _this.isFavorite = data.data.is_favourite == '1' ? true : false;
            }
            else {
                _this.webService.hideLoading();
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
        this.getBidPriceList();
        this.getInfo();
    }
    VehicleDetailsPage.prototype.getInfo = function () {
        if (this.vehicle.Vehicle.buy_price == 0.00) {
            this.showCard = false;
        }
    };
    VehicleDetailsPage.prototype.buyNowVehicle = function (vehicle) {
        var _this = this;
        console.log(vehicle);
        if (vehicle.bid_permission == 0) {
            var alert = this.alertCtrl.create({
                title: 'Permission Denied',
                message: 'This is your own car.',
                cssClass: 'alertCustomWraper',
                buttons: [
                    {
                        text: '',
                        cssClass: '',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'CLOSE',
                        cssClass: 'alertCustomBtnLeft',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                ]
            });
            alert.present();
        }
        else {
            this.webService.buyNow(vehicle.Vehicle).subscribe(function (data) {
                console.log(data);
                if (data.success == true) {
                    _this.webService.hideLoading();
                    _this.webService.presentToast(data.message);
                    _this.navCtrl.setRoot(home_1.HomePage);
                }
                else {
                    _this.webService.hideLoading();
                    _this.webService.presentToast(data.message);
                }
            }, function (err) {
                _this.webService.hideLoading();
                _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            });
        }
    };
    VehicleDetailsPage.prototype.openBidModal = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.translate.instant('lbl_bid'),
            buttons: [
                {
                    text: this.translate.instant('lbl_cancel'),
                    role: 'cancel',
                    handler: function (data) {
                        //console.log('Cancel clicked');
                    }
                },
                {
                    text: this.translate.instant('lbl_bid'),
                    handler: function (data) {
                        _this.bidVehicle(data);
                    }
                }
            ]
        });
        var i = 0;
        for (var amount in this.bidPriceList) {
            var inputObj = { type: 'radio', label: 'CHF ' + this.bidPriceList[i], value: this.bidPriceList[i], checked: false };
            if (i == 0) {
                inputObj.checked = true;
            }
            alert.addInput(inputObj);
            i++;
        }
        alert.present();
    };
    VehicleDetailsPage.prototype.bidVehicle = function (bidAmount) {
        var _this = this;
        console.log(this.vehicle.bid_permission);
        if (this.vehicle.bid_permission == 0) {
            var alert = this.alertCtrl.create({
                title: 'Permission Denied',
                message: 'This is your own car.',
                cssClass: 'alertCustomWraper',
                buttons: [
                    {
                        text: '',
                        cssClass: '',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'CLOSE',
                        cssClass: 'alertCustomBtnLeft',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                ]
            });
            alert.present();
        }
        else {
            this.webService.bidVehicle(this.vehicle.Vehicle.id, bidAmount).subscribe(function (data) {
                console.log(data);
                if (data.success == true) {
                    _this.webService.hideLoading();
                    _this.webService.presentToast(data.message);
                    _this.navCtrl.setRoot(home_1.HomePage);
                }
                else {
                    if (data.data.status == 'refresh') {
                        _this.webService.hideLoading();
                        _this.vehicle.max_bid_price = data.data.max_bid_price;
                        var kk = _this.cp.transform(data.data.max_bid_price, 'USD', true, '1.2-2');
                        var pp = kk.replace(",", "'");
                        var mn = pp.split(".");
                        var ppg = mn[0] + ".-";
                        var oneMore = ppg.split("$");
                        console.log("Final Formated Result : ", oneMore[1]);
                        _this.vehicle.max_bid_price = oneMore[1];
                        _this.webService.presentToast(data.message);
                        _this.getBidPriceList();
                    }
                    else if (data.data.status == 'buy_car') {
                        _this.webService.hideLoading();
                        _this.buyNowVehicle(_this.vehicle);
                    }
                    else {
                        _this.webService.hideLoading();
                        _this.webService.presentToast(data.message);
                    }
                }
            }, function (err) {
                _this.webService.hideLoading();
                _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            });
        }
    };
    ;
    VehicleDetailsPage.prototype.makeFavourite = function (isFav) {
        var _this = this;
        var vehicleFav = isFav == 0 ? 1 : 0;
        this.webService.makeFavourite(this.vehicle.Vehicle.id, isFav).subscribe(function (data) {
            console.log(data);
            if (data.success == true) {
                _this.webService.hideLoading();
                _this.webService.presentToast(data.message);
                _this.isFavorite = data.data.isFavourite == '1' ? true : false;
                //this.isFavorite = data.data.isFavourite;
            }
            else {
                _this.webService.hideLoading();
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
    };
    VehicleDetailsPage.prototype.openModal = function (imageUrl) {
        //this.photoViewer.show('{{baseUrl}}img/vehicledamage/orignal/{{imageUrl}}');
        //console.log(imageUrl);
        var data = { imageUrl: imageUrl };
        var modal = this.modalController.create(vehicle_damage_modal_1.VehicleDamageModalPage, data);
        modal.present();
    };
    VehicleDetailsPage.prototype.deleteVehicle = function (vehicleId) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Delete Vechicle',
            message: 'Are you sure ?',
            cssClass: 'alertCustomWraper',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'alertCustomBtnLeft',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    cssClass: 'alertCustomBtnRight',
                    handler: function () {
                        console.log('Delete clicked');
                        _this.webService.deleteVehicle(_this.vehicle.Vehicle.id).subscribe(function (data) {
                            console.log(data);
                            if (data.success == true) {
                                _this.webService.hideLoading();
                                _this.webService.presentToast(data.message);
                                _this.navCtrl.setRoot(home_1.HomePage);
                            }
                            else {
                                _this.webService.hideLoading();
                                _this.webService.presentToast(data.message);
                            }
                        }, function (err) {
                            _this.webService.hideLoading();
                            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    VehicleDetailsPage.prototype.editVehicle = function () {
        window.localStorage.removeItem('vehicle_temp_id');
        this.navCtrl.push(step_one_1.StepOnePage, {
            vehicle_temp_id: this.vehicle.Vehicle.id
        });
    };
    ;
    VehicleDetailsPage.prototype.getBidPriceList = function () {
        var _this = this;
        this.webService.getBidPrice(this.vehicle.Vehicle.id).subscribe(function (serverResponse) {
            console.log(serverResponse);
            if (serverResponse.success) {
                _this.bidPriceList = serverResponse.data;
            }
            //this.bidPriceList= serverResponse
        }, function (Err) {
            console.log(Err);
        });
    };
    VehicleDetailsPage = __decorate([
        core_1.Component({
            templateUrl: "vehicleDetails.html",
            selector: "page-vehicledetails"
        })
    ], VehicleDetailsPage);
    return VehicleDetailsPage;
}());
exports.VehicleDetailsPage = VehicleDetailsPage;
