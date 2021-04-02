"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddAdvertisementPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var vehicle_search_modal_1 = require("../vehicle-search-modal/vehicle-search-modal");
var step_two_1 = require("../step-two/step-two");
var AddAdvertisementPage = /** @class */ (function () {
    function AddAdvertisementPage(navCtrl, webService, storage, fb, modalController, translate) {
        this.navCtrl = navCtrl;
        this.webService = webService;
        this.storage = storage;
        this.fb = fb;
        this.modalController = modalController;
        this.translate = translate;
        this.makes = [];
        var date = new Date();
        this.minYear = date.getFullYear() - 15;
        this.validation_messages = {
            'first_registration': [
                { type: 'required', message: this.translate.instant('lbl_first_registration_required') }
            ],
            'model_number': [
                { type: 'required', message: this.translate.instant('lbl_model_number_required') }
            ]
        };
        this.validation_messages_duration = {
            'year': [
                { type: 'required', message: this.translate.instant('lbl_year_required') }
            ],
            'month': [
                { type: 'required', message: this.translate.instant('lbl_month_required') }
            ],
            'make': [
                { type: 'required', message: this.translate.instant('lbl_make_required') }
            ],
            'model': [
                { type: 'required', message: this.translate.instant('lbl_model_required') }
            ]
        };
        this.AddAdvertisementSearchForm = this.fb.group({
            'first_registration': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'model_number': [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
        this.AddAdvertisementDurationForm = this.fb.group({
            'year': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'month': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'make': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'model': [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
        this.autoApiForm = this.fb.group({
            'vehicle_brand_list': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_model_list': [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
    }
    AddAdvertisementPage.prototype.search = function () {
        /* return false ;
 
         this.webService.getVehiclesByEuroTax(this.first_registration, this.model_number).subscribe(
             data => {
                 if (data.success == true) {
                     var vehicleListData = { vehicleListData: data.data };
                     const modal = this.modalController.create(VehicleSearchModalPage, vehicleListData);
                     modal.present();
 
                 } else {
                     this.webService.presentToast(data.message);
                 }
             },
             err => {
                 this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                 console.log(err);
             }
         );*/
    };
    AddAdvertisementPage.prototype.searchMake = function (value) {
        /*   return false ;
   
       
           this.month = value;
           this.makes = [];
           this.webService.getEuroMakes(this.year, this.month).subscribe(
               data => {
                   //console.log(data.data);
                   if (data) {
                       this.webService.loading.dismiss();
                       for(let key in data.data){
                           this.makes.push({
                             key: key,
                             name: data.data[key]
                           });
                         }
                         //console.log(this.makes);
                       //this.makes = data.data;
                   } else {
                       this.webService.presentToast(data.message);
                   }
               },
               err => {
                   this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                   console.log(err);
               }
           );*/
    };
    AddAdvertisementPage.prototype.makeSelected = function (value) {
        /*return false ;
         //console.log(value);
         this.make = value;
         this.searchModel(this.make);
         //this.makes = [];*/
    };
    AddAdvertisementPage.prototype.searchModel = function (makeId) {
        /*  return false ;
          this.models = [];
          if (makeId) {
              this.webService.getEuroModels(makeId, this.year, this.month).subscribe(
                  data => {
                      //console.log(data);
                      if (data) {
                          this.webService.loading.dismiss();
                          for(let key in data.data){
                              this.models.push({
                                key: key,
                                name: data.data[key]
                              });
                            }
  
                          //this.models = data;
                      } else {
                          this.webService.presentToast(data.message);
                      }
                  },
                  err => {
                      this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                      console.log(err);
                  }
              );
          } else {
              this.models = [];
          }*/
    };
    AddAdvertisementPage.prototype.modelSelected = function (value) {
        /*return false ;
        this.model = value;
        //this.models = [];*/
    };
    AddAdvertisementPage.prototype.searchVehicleByMakeModel = function () {
        /*  console.log("jadkasd asdkjadha asdkkadl akasdjk ");
  
          return false ;
  
  
          this.webService.getEuroVehicleByMakeModel(this.make, this.model, this.year, this.month).subscribe(
              data => {
                  //console.log(data);
                  if (data) {
                      this.webService.loading.dismiss();
                      var vehicleListData = { vehicleListData: data.data };
                      const modal = this.modalController.create(VehicleSearchModalPage, vehicleListData);
                      modal.present();
                  } else {
                      this.webService.presentToast(data.message);
                  }
              },
              err => {
                  this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                  console.log(err);
              }
          );*/
    };
    AddAdvertisementPage.prototype.next = function () {
        var _this = this;
        window.localStorage.removeItem('vehicle_temp_id');
        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            this.navCtrl.setRoot(step_two_1.StepTwoPage);
            // this.navCtrl.push(StepOnePage, {
            //     vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
            // });
        }
        else {
            this.webService.setTempVehicleId().subscribe(function (data) {
                console.log(data);
                if (data.success == true) {
                    _this.webService.loading.dismiss();
                    _this.webService.presentToast(data.message);
                    window.localStorage.setItem('vehicle_temp_id', data.data.id);
                    //this.navCtrl.setRoot(StepOnePage);
                    // this.navCtrl.push(StepOnePage, {
                    //     vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
                    // });
                    _this.navCtrl.push(step_two_1.StepTwoPage, {
                        vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
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
    ;
    AddAdvertisementPage.prototype.ionViewDidEnter = function () {
        console.log("From here call auto api : ");
        this.getBrandList();
    };
    ;
    // Auto Api 
    AddAdvertisementPage.prototype.getBrandList = function () {
        var _this = this;
        this.webService.getBrandList().subscribe(function (response) {
            if (response.Info.Status == 0 && response.Info.StatusMsg == 'OK') {
                console.log("Auto Api barnd list :", response);
                _this.brandList = response.Marken;
            }
            else {
                console.log("Correct data is not return !");
            }
        }, function (Err) {
            console.log(Err);
            console.log(Err);
        });
    };
    ;
    AddAdvertisementPage.prototype.getmodel = function (event) {
        console.log(event);
        this.markenId = event;
        this.getModelList(event);
    };
    ;
    AddAdvertisementPage.prototype.getModelList = function (Id) {
        var _this = this;
        this.webService.showLoading();
        var data = Id;
        this.webService.getModleList(data).subscribe(function (response) {
            console.log(response);
            _this.webService.hideLoading();
            if (response.Info.Status == 0 && response.Info.StatusMsg == 'OK') {
                console.log("Auto Api barnd list :", response);
                _this.modelList = response.ModellGruppen;
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
    AddAdvertisementPage.prototype.getallmodellist = function (event) {
        console.log(event);
        this.modelNumber = event;
    };
    ;
    AddAdvertisementPage.prototype.getModelsList = function () {
        var _this = this;
        this.webService.showLoading();
        console.log(this.modelNumber, this.markenId);
        this.webService.getAllModels(this.modelNumber).subscribe(function (response) {
            console.log(response);
            _this.webService.hideLoading();
            if (response.Info.Status == 0 && response.Info.StatusMsg == 'OK') {
                console.log("Auto Api all model list :", response);
                response.Fahrzeuge.forEach(function (element) {
                    console.log(element.Gänge);
                    element.Platze = element.Plätze;
                    if (element.Gänge == 1) {
                        var gear = "Manually";
                        element.Gange = gear;
                    }
                    else if (element.Gänge == 2) {
                        var gear = "Mechanic";
                        element.Gange = gear;
                    }
                    else if (element.Gänge == 5) {
                        var gear = "Automatic";
                        element.Gange = gear;
                    }
                    else if (element.Gänge == 6) {
                        var gear = "Stepless";
                        element.Gange = gear;
                    }
                    else {
                        var gear = "";
                        element.Gange = gear;
                    }
                    if (element.Treibstoff == 1) {
                        var fuel = "Patrol";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 2) {
                        var fuel = "Petrol Cat";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 3) {
                        var fuel = "Diesel";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 4) {
                        var fuel = "Diesel Particle Filter";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 5) {
                        var fuel = "Gas/Petrol";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 6) {
                        var fuel = "Ethanol/Petro";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 7) {
                        var fuel = "Electric/Diesel";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 8) {
                        var fuel = "Electric";
                        element.Treibstoff = fuel;
                    }
                    else if (element.Treibstoff == 9) {
                        var fuel = "Hydrogen";
                        element.Treibstoff = fuel;
                    }
                    else {
                        var fuel = "";
                        element.Treibstoff = fuel;
                    }
                });
                var vehicleListData = { vehicleListData: response.Fahrzeuge };
                // vehicleListData.brand = 
                var modal = _this.modalController.create(vehicle_search_modal_1.VehicleSearchModalPage, vehicleListData);
                modal.present();
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
    AddAdvertisementPage.prototype.getModelDetails = function () {
        var data = this.autoApiForm.value;
        console.log(data);
        this.webService.getModelDetails(data.vehicle_model_list).subscribe(function (response) {
            console.log(response);
        }, function (Err) {
            console.log(Err);
        });
    };
    ;
    AddAdvertisementPage = __decorate([
        core_1.Component({
            selector: 'page-addadvertisement',
            templateUrl: 'addAdvertisement.html'
        })
    ], AddAdvertisementPage);
    return AddAdvertisementPage;
}());
exports.AddAdvertisementPage = AddAdvertisementPage;
