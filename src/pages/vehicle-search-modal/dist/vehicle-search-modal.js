"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleSearchModalPage = void 0;
var core_1 = require("@angular/core");
var step_one_1 = require("../step-one/step-one");
/**
 * Generated class for the VehicleSearchModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var VehicleSearchModalPage = /** @class */ (function () {
    function VehicleSearchModalPage(navCtrl, navParams, viewController, webService, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this.webService = webService;
        this.translate = translate;
        this.vehicle = {
            brand: "",
            model: "",
            type: "",
            body_type: "",
            doors: "",
            //displacement: "",
            wheel_drive: "",
            gear: "",
            fuel: "",
            hp: "",
            kw: "",
            no_of_seats: "",
            //first_reg: "",
            // kilometers: 0,
            // exterior_color: "",
            // interior_color: "",
            // car_finish: "",
            additional_info: "",
            // gen_condition: "",
            // inspection: "",
            other_condition_eng: "",
            frame_no: "",
            model_no: "",
            reg_no: "",
            vehicle_no: ""
        };
    }
    VehicleSearchModalPage.prototype.selectVehicle = function (vehicleData) {
        var _this = this;
        console.log(vehicleData);
        console.log(vehicleData.Marke);
        this.vehicle.brand = vehicleData.Marke;
        this.vehicle.model = vehicleData.ModellEn;
        this.vehicle.type = vehicleData.ModellTypEn;
        this.vehicle.doors = vehicleData.Türen;
        //this.vehicle.displacement = vehicleData.Displacement;
        this.vehicle.hp = vehicleData.PS;
        this.vehicle.kw = (vehicleData.PS) * 0.735499;
        this.vehicle.no_of_seats = vehicleData.Plätze;
        if (vehicleData.Antrieb == '1') {
            this.vehicle.wheel_drive = 'Rear';
        }
        else if (vehicleData.Antrieb == '2') {
            this.vehicle.wheel_drive = 'Front';
        }
        else if (vehicleData.Antrieb == '4') {
            this.vehicle.wheel_drive = '4 Stroke';
        }
        else if (vehicleData.Antrieb == '5') {
            this.vehicle.wheel_drive = 'All-wheel';
        }
        else if (vehicleData.Antrieb == '9') {
            this.vehicle.wheel_drive = 'No stroke';
        }
        else {
            this.vehicle.wheel_drive = '';
        }
        if (vehicleData.Treibstoff == '1') {
            this.vehicle.fuel = 'Patrol';
        }
        else if (vehicleData.Treibstoff == '2') {
            this.vehicle.fuel = 'Petrol Cat';
        }
        else if (vehicleData.Treibstoff == '3') {
            this.vehicle.fuel = 'Diesel';
        }
        else if (vehicleData.Treibstoff == '4') {
            this.vehicle.fuel = 'Diesel Particle Filter';
        }
        else if (vehicleData.Treibstoff == '5') {
            this.vehicle.fuel = 'Gas/Petrol';
        }
        else if (vehicleData.Treibstoff == '6') {
            this.vehicle.fuel = 'Ethanol/Petro';
        }
        else if (vehicleData.Treibstoff == '7') {
            this.vehicle.fuel = 'Electric/Diesel';
        }
        else if (vehicleData.Treibstoff == '8') {
            this.vehicle.fuel = 'Electric';
        }
        else if (vehicleData.Treibstoff == '9') {
            this.vehicle.fuel = 'Hydrogen';
        }
        else {
            this.vehicle.fuel = '';
        }
        if (vehicleData.Aufbau == '1') {
            this.vehicle.body_type = 'Off-road vehicle/SUV';
        }
        else if (vehicleData.Aufbau == '3') {
            this.vehicle.body_type = 'Coupe';
        }
        else if (vehicleData.Aufbau == '4') {
            this.vehicle.body_type = 'Large capacity/van';
        }
        else if (vehicleData.Aufbau == '5') {
            this.vehicle.body_type = 'Station wagon';
        }
        else if (vehicleData.Aufbau == '6') {
            this.vehicle.body_type = 'Limousine';
        }
        else if (vehicleData.Aufbau == '7') {
            this.vehicle.body_type = 'Pick up';
        }
        else if (vehicleData.Aufbau == '8') {
            this.vehicle.body_type = 'Sports car';
        }
        else {
            this.vehicle.body_type = '';
        }
        /*Gear value*/
        if (vehicleData.Getriebe == '1') {
            this.vehicle.gear = 'Manuell';
        }
        else if (vehicleData.Getriebe == '2') {
            this.vehicle.gear = 'Mech.-Aut.';
        }
        else if (vehicleData.Getriebe == '5') {
            this.vehicle.gear = 'Automat';
        }
        else if (vehicleData.Getriebe == '6') {
            this.vehicle.gear = 'Stufenlos';
        }
        else {
            this.vehicle.gear = '';
        }
        //this.vehicle.first_reg = vehicleData.Brand;
        //this.vehicle.kilometers = vehicleData.Brand;
        //this.vehicle.exterior_color = vehicleData.Brand;
        //this.vehicle.interior_color = vehicleData.Brand;
        //this.vehicle.car_finish = vehicleData.Brand;
        //this.vehicle.additional_info = vehicleData.Brand;
        //this.vehicle.gen_condition = vehicleData.Brand;
        //this.vehicle.inspection = vehicleData.Brand;
        //this.vehicle.other_condition_eng = vehicleData.Brand;
        //this.vehicle.frame_no = vehicleData.Brand;
        //this.vehicle.model_no = vehicleData.Brand;
        // this.vehicle.reg_no = vehicleData.ModelNumber;
        // this.vehicle.vehicle_no = vehicleData.ModelNumber;
        //this.vehicle.swiss_car = vehicleData.Brand;
        //this.vehicle.vehicle_regions = vehicleData.Brand;
        //this.vehicle.reg_document = vehicleData.Brand;
        //this.vehicle.service_record = vehicleData.Brand;
        //this.vehicle.no_of_keys = vehicleData.Brand;
        //this.vehicle.is_damage = vehicleData.Brand;
        //this.vehicle.body_eng = vehicleData.Brand;
        //this.vehicle.body_deu = vehicleData.Brand;
        //this.vehicle.body_it = vehicleData.Brand;
        //this.vehicle.body_fr = vehicleData.Brand;
        //this.vehicle.repairs = vehicleData.Brand;
        //this.vehicle.mechanics_eng = vehicleData.Brand;
        //this.vehicle.mechanics_deu = vehicleData.Brand;
        //this.vehicle.mechanics_it = vehicleData.Brand;
        //this.vehicle.mechanics_fr = vehicleData.Brand;
        //  this.vehicle.min_auction_price = vehicleData.FactoryPrice;
        window.localStorage.removeItem('vehicle_temp_id');
        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            //this.navCtrl.setRoot(StepOnePage);
            this.navCtrl.push(step_one_1.StepOnePage, {
                vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
            });
        }
        else {
            this.webService.addNewVehicle(this.vehicle).subscribe(function (data) {
                //console.log(data);
                if (data.success == true) {
                    _this.webService.loading.dismiss();
                    _this.webService.presentToast(data.message);
                    window.localStorage.setItem('vehicle_temp_id', data.data.vehicle_temp_id);
                    //this.navCtrl.setRoot(StepOnePage);
                    _this.navCtrl.push(step_one_1.StepOnePage, {
                        vehicle_temp_id: window.localStorage.getItem('   xz')
                    });
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
        }
    };
    VehicleSearchModalPage.prototype.ionViewDidLoad = function () {
        this.vehiclesData = this.navParams.get('vehicleListData');
    };
    ;
    VehicleSearchModalPage.prototype.closeModal = function () {
        // this.webService.loading.dismiss();
        this.viewController.dismiss();
    };
    ;
    VehicleSearchModalPage.prototype.selectedCar = function (vehicle) {
        var _this = this;
        this.webService.showLoading();
        console.log(vehicle);
        var data = vehicle.FzKey;
        this.webService.getModelDetails(data).subscribe(function (serverResponse) {
            _this.webService.hideLoading();
            console.log(serverResponse);
            if (serverResponse.Info.Status == 0 && serverResponse.Info.StatusMsg == "OK") {
                _this.selectVehicle(serverResponse.Fahrzeuge);
            }
            else {
                console.log("Correct data is not return !");
            }
        }, function (Err) {
            _this.webService.hideLoading();
            console.log(Err);
        });
    };
    ;
    VehicleSearchModalPage = __decorate([
        core_1.Component({
            selector: 'page-vehicle-search-modal',
            templateUrl: 'vehicle-search-modal.html'
        })
    ], VehicleSearchModalPage);
    return VehicleSearchModalPage;
}());
exports.VehicleSearchModalPage = VehicleSearchModalPage;
