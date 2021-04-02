"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StepThreePage = void 0;
var core_1 = require("@angular/core");
var preview_vehicle_1 = require("../preview-vehicle/preview-vehicle");
var home_1 = require("../home/home");
var forms_1 = require("@angular/forms");
/**
 * Generated class for the StepThreePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StepThreePage = /** @class */ (function () {
    function StepThreePage(navCtrl, navParams, webService, fb, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.webService = webService;
        this.fb = fb;
        this.translate = translate;
        this.isActivate = false;
        this.vehicle = {
            min_auction_price: null,
            auction_duration: 1,
            buy_price: null,
            increase_with: 25.00,
            transport_medium: null
        };
        if (window.localStorage.getItem('vehicle_temp_id') == null) {
            window.localStorage.setItem('vehicle_temp_id', this.navParams.get('vehicle_temp_id'));
        }
        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            this.webService.getVehicleByTempId(window.localStorage.getItem('vehicle_temp_id')).subscribe(function (data) {
                if (data.success == true) {
                    _this.webService.loading.dismiss();
                    _this.webService.presentToast(data.message);
                    if (Object.keys(data.data.vehicleData).length > 0) {
                        data.data.vehicleData.Vehicle.increase_with = 25.00;
                        _this.vehicle = data.data.vehicleData.Vehicle;
                        console.log("All increse data :", data.data.vehicleData);
                        var increaseWith = parseInt(data.data.vehicleData.Vehicle.increase_with);
                        _this.vehicle.increase_with = increaseWith;
                    }
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
        this.validation_messages = {
            'vehicle_min_auction_price': [
                { type: 'required', message: this.translate.instant('lbl_minimum_price_required') },
                { type: 'number', message: this.translate.instant('lbl_minimum_price_numeric') }
            ],
            'vehicle_auction_duration': [
                { type: 'required', message: this.translate.instant('lbl_auction_duration_required') }
            ],
            // 'vehicle_buy_price': [
            // { type: 'required', message: this.translate.instant('lbl_buy_now_price_required') },
            // { type: 'number', message: this.translate.instant('lbl_buy_now_price_numeric') }
            // ],
            'vehicle_increase_with': [
                { type: 'required', message: this.translate.instant('lbl_increase_with_required') }
            ],
            'vehicle_transport_medium': [
                { type: 'required', message: this.translate.instant('lbl_to_be_transported_required') }
            ]
        };
        this.Step3Form = this.fb.group({
            'vehicle_min_auction_price': [this.vehicle.min_auction_price, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_auction_duration': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            //'vehicle_buy_price': [this.vehicle.buy_price],
            'vehicle_buy_price': [null],
            'vehicle_increase_with': [25.00],
            'vehicle_transport_medium': [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
        //   this.Step3Form.get('vehicle_buy_price').valueChanges
        //   .subscribe(value => {
        //     if(value) {
        //       this.Step3Form.get('vehicle_buy_price').setValidators(Validators.required)
        //     } else {
        //       this.Step3Form.get('vehicle_buy_price').clearValidators();
        //     }
        //      this.Step3Form.get('vehicle_buy_price').updateValueAndValidity();
        //   }
        // )    ;
    }
    StepThreePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StepThreePage');
    };
    StepThreePage.prototype.addVehicle = function () {
        var _this = this;
        this.isActivate = true;
        this.webService.activateVehicle(this.vehicle, this.isActivate).subscribe(function (data) {
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                window.localStorage.removeItem('vehicle_temp_id');
                _this.navCtrl.setRoot(home_1.HomePage);
            }
            else {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.loading.dismiss();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
        });
    };
    StepThreePage.prototype.previewVehicle = function () {
        var _this = this;
        this.isActivate = false;
        this.webService.activateVehicle(this.vehicle, this.isActivate).subscribe(function (data) {
            //console.log('Activate vehicle');
            //console.log(data);
            if (data.success == true) {
                _this.webService.loading.dismiss();
                //this.webService.presentToast(data.message);
                //this.navCtrl.setRoot(PreviewVehiclePage);
                _this.navCtrl.push(preview_vehicle_1.PreviewVehiclePage, {
                    vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
                });
                //this.navCtrl.setRoot(PreviewVehiclePage);
                // this.navCtrl.push(PreviewVehiclePage, {
                //    vehicleId: window.localStorage.getItem('vehicle_temp_id')
                //  });
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
    StepThreePage.prototype.changeto = function () {
        var data = this.Step3Form.value;
        var val = parseInt(data.vehicle_min_auction_price);
        this.vehicle.min_auction_price = val;
    };
    ;
    StepThreePage.prototype.changetoActual = function () {
        var data = this.Step3Form.value;
        var val = parseInt(data.vehicle_buy_price);
        this.vehicle.buy_price = val;
    };
    StepThreePage = __decorate([
        core_1.Component({
            selector: 'page-step-three',
            templateUrl: 'step-three.html'
        })
    ], StepThreePage);
    return StepThreePage;
}());
exports.StepThreePage = StepThreePage;
