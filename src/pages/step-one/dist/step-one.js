"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StepOnePage = void 0;
var core_1 = require("@angular/core");
var step_two_1 = require("../step-two/step-two");
var forms_1 = require("@angular/forms");
/**
 * Generated class for the StepOnePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StepOnePage = /** @class */ (function () {
    function StepOnePage(navCtrl, navParams, camera, actionSheetCtrl, transfer, file, filePath, loadingCtrl, platform, toastCtrl, webService, fb, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.webService = webService;
        this.fb = fb;
        this.translate = translate;
        this.hideDamage = true;
        this.bodyMultiLingual = true;
        this.mechanicsMultiLingual = true;
        this.max_date = "2100";
        this.lastImage = null;
        this.imagePath = "assets/images/cars/";
        this.vehicle = {
            brand: "",
            model: "",
            type: "",
            body_type: "",
            doors: "",
            displacement: "",
            wheel_drive: "",
            gear: "",
            fuel: "",
            hp: 0,
            kw: 0,
            no_of_seats: "",
            first_reg: "",
            kilometers: null,
            exterior_color: "",
            interior_color: "",
            car_finish: "",
            additional_info: "",
            gen_condition: "",
            inspection: "",
            other_condition_eng: "",
            other_body_deu: "",
            other_body_it: "",
            other_body_fr: "",
            frame_no: "",
            model_no: "",
            reg_no: "",
            vehicle_no: "",
            swiss_car: true,
            vehicle_regions: "",
            reg_document: "",
            service_record: "",
            no_of_keys: "",
            is_damage: false,
            body_eng: "",
            body_deu: "",
            body_it: "",
            body_fr: "",
            repairs: "",
            mechanics_eng: "",
            mechanics_deu: "",
            mechanics_it: "",
            mechanics_fr: ""
        };
        this.vehicleDamage = {
            bottomside: this.imagePath + 'front.png',
            leftside: this.imagePath + 'left.png',
            topside: this.imagePath + 'top.png',
            rightside: this.imagePath + 'right.png',
            backside: this.imagePath + 'back.png',
            bottomsideId: null,
            leftsideId: null,
            topsideId: null,
            rightsideId: null,
            backsideId: null
        };
        this.validation_messages = {
            'vehicle_brand': [
                { type: 'required', message: this.translate.instant('lbl_vehicle_brand_required') }
            ],
            'vehicle_model': [
                { type: 'required', message: this.translate.instant('lbl_vehicle_model_required') }
            ],
            'vehicle_body_type': [
                { type: 'required', message: this.translate.instant('lbl_body_type_required') }
            ],
            'vehicle_doors': [
                { type: 'required', message: this.translate.instant('lbl_door_required') }
            ],
            'vehicle_wheel_drive': [
                { type: 'required', message: this.translate.instant('lbl_wheel_drive_required') }
            ],
            'vehicle_gear': [
                { type: 'required', message: this.translate.instant('lbl_gear_required') }
            ],
            'vehicle_fuel': [
                { type: 'required', message: this.translate.instant('lbl_fuel_required') }
            ],
            'vehicle_hp': [
                { type: 'required', message: this.translate.instant('lbl_hp_required') }
            ],
            'vehicle_kw': [
                { type: 'required', message: this.translate.instant('lbl_kw_required') }
            ],
            'vehicle_first_reg': [
                { type: 'required', message: this.translate.instant('lbl_1st_reg_required') }
            ],
            'vehicle_kilometers': [
                { type: 'required', message: this.translate.instant('lbl_kilometers_required') }
            ],
            'vehicle_exterior_color': [
                { type: 'required', message: this.translate.instant('lbl_exterior_color_required') }
            ],
            'vehicle_interior_color': [
                { type: 'required', message: this.translate.instant('lbl_interior_color_required') }
            ],
            'vehicle_vehicle_regions': [
                { type: 'required', message: this.translate.instant('lbl_vehicle_region_required') }
            ],
            'vehicle_no_of_keys': [
                { type: 'required', message: this.translate.instant('lbl_number_of_keys_required') }
            ]
        };
        this.Step1Form = this.fb.group({
            'vehicle_brand': [this.vehicle.brand, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_model': [this.vehicle.model, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_type': [this.vehicle.type],
            'vehicle_body_type': [this.vehicle.body_type, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_doors': [this.vehicle.doors, forms_1.Validators.compose([forms_1.Validators.required])],
            //'vehicle_displacement': [this.vehicle.displacement],
            'vehicle_wheel_drive': [this.vehicle.wheel_drive, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_gear': [this.vehicle.gear, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_fuel': [this.vehicle.fuel, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_hp': [this.vehicle.hp, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_kw': [this.vehicle.kw, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_no_of_seats': [this.vehicle.no_of_seats],
            'vehicle_first_reg': [this.vehicle.first_reg, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_kilometers': [this.vehicle.kilometers, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_exterior_color': [this.vehicle.exterior_color, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_interior_color': [this.vehicle.interior_color, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_car_finish': [this.vehicle.car_finish],
            'vehicle_additional_info': [this.vehicle.additional_info],
            'vehicle_gen_condition': [this.vehicle.gen_condition],
            'vehicle_inspection': [this.vehicle.inspection],
            'vehicle_other_condition_eng': [this.vehicle.other_condition_eng],
            'vehicle_other_body_deu': [this.vehicle.other_body_deu],
            'vehicle_other_body_it': [this.vehicle.other_body_it],
            'vehicle_other_body_fr': [this.vehicle.other_body_fr],
            'vehicle_frame_no': [this.vehicle.frame_no],
            'vehicle_model_no': [this.vehicle.model_no],
            'vehicle_reg_no': [this.vehicle.reg_no],
            'vehicle_vehicle_no': [this.vehicle.vehicle_no],
            'vehicle_swiss_car': [this.vehicle.swiss_car],
            'vehicle_vehicle_regions': [this.vehicle.vehicle_regions, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_reg_document': [this.vehicle.reg_document],
            'vehicle_service_record': [this.vehicle.service_record],
            'vehicle_no_of_keys': [this.vehicle.no_of_keys, forms_1.Validators.compose([forms_1.Validators.required])],
            'vehicle_is_damage': [this.vehicle.is_damage],
            'vehicle_body_eng': [this.vehicle.body_eng],
            'vehicle_body_deu': [this.vehicle.body_deu],
            'vehicle_body_it': [this.vehicle.body_it],
            'vehicle_body_fr': [this.vehicle.body_fr],
            'vehicle_repairs': [this.vehicle.repairs],
            'vehicle_mechanics_eng': [this.vehicle.mechanics_eng],
            'vehicle_mechanics_deu': [this.vehicle.mechanics_deu],
            'vehicle_mechanics_it': [this.vehicle.mechanics_it],
            'vehicle_mechanics_fr': [this.vehicle.mechanics_fr]
        });
        //this.min_date = year+'-'+(month+1) + '-'+day;
        // console.log(this.vehicle.fuel);
        this.Step1Form.get('vehicle_is_damage').valueChanges
            .subscribe(function (value) {
            if (value) {
                _this.Step1Form.get('vehicle_repairs').setValidators(forms_1.Validators.required);
            }
            else {
                _this.Step1Form.get('vehicle_repairs').clearValidators();
            }
            _this.Step1Form.get('vehicle_repairs').updateValueAndValidity();
        });
    }
    // onEmailValueChanged(value: any){
    //   let phoneNumberControl = this.Step1Form.get('vehicle_repairs');
    //   // Using setValidators to add and remove validators. No better support for adding and removing validators to controller atm.
    //   // See issue: https://github.com/angular/angular/issues/10567
    //   if(!value){
    //       phoneNumberControl.setValidators([Validators.required, Validators.minLength(4)]);
    //   }else {
    //       phoneNumberControl.setValidators([Validators.minLength(4)]);
    //   }
    //   phoneNumberControl.updateValueAndValidity(); //Need to call this to trigger a update
    // }
    StepOnePage.prototype.ngOnInit = function () {
        var _this = this;
        this.today = new Date().toISOString();
        var current_date = new Date();
        this.dateFormat(current_date);
        // this.initAutocomplete();
        var new_mindate = this.min_date;
        console.log('ngOnInit');
        if (window.localStorage.getItem('vehicle_temp_id') == null) {
            window.localStorage.setItem('vehicle_temp_id', this.navParams.get('vehicle_temp_id'));
        }
        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            this.webService.getVehicleByTempId(window.localStorage.getItem('vehicle_temp_id')).subscribe(function (data) {
                if (data.success == true) {
                    _this.webService.loading.dismiss();
                    _this.webService.presentToast(data.message);
                    if (Object.keys(data.data.vehicleData).length > 0) {
                        _this.vehicle = data.data.vehicleData.Vehicle;
                        if (_this.vehicle.kilometers == 0) {
                            _this.vehicle.kilometers = null;
                        }
                        if (_this.vehicle.is_damage == true) {
                            _this.vehicle.is_damage = true;
                        }
                        else {
                            _this.vehicle.is_damage = false;
                        }
                        // if( this.vehicle.swiss_car == true ){
                        //   this.vehicle.swiss_car = true;
                        // } else {
                        //   this.vehicle.swiss_car = false;
                        // }
                        if (Object.keys(data.data.vehicleData.VehicleDamage).length > 0) {
                            for (var _i = 0, _a = data.data.vehicleData.VehicleDamage; _i < _a.length; _i++) {
                                var damageImage = _a[_i];
                                //this.vehicleDamage = data.vehicleData.VehicleDamage;
                                if (damageImage.left_file_name != null) {
                                    _this.vehicleDamage.leftside = damageImage.imageUrl;
                                    _this.vehicleDamage.leftsideId = damageImage.id;
                                }
                                else if (damageImage.right_file_name != null) {
                                    _this.vehicleDamage.rightside = damageImage.imageUrl;
                                    _this.vehicleDamage.rightsideId = damageImage.id;
                                }
                                else if (damageImage.top_file_name != null) {
                                    _this.vehicleDamage.topside = damageImage.imageUrl;
                                    _this.vehicleDamage.topsideId = damageImage.id;
                                }
                                else if (damageImage.bottom_file_name != null) {
                                    _this.vehicleDamage.bottomside = damageImage.imageUrl;
                                    _this.vehicleDamage.bottomsideId = damageImage.id;
                                }
                                else if (damageImage.back_file_name != null) {
                                    _this.vehicleDamage.backside = damageImage.imageUrl;
                                    _this.vehicleDamage.backsideId = damageImage.id;
                                }
                            }
                        }
                    }
                    console.log("Vehicle Data :", _this.vehicle);
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
    };
    StepOnePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StepOnePage');
        this.getRegion();
    };
    ;
    StepOnePage.prototype.dateFormat = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // let hours = date.getHours();
        // let minutes = date.getMinutes();
        // let ampm = hours >= 12 ? 'pm' : 'am';
        // hours = hours % 12;
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        this.max_date = (year + 1) + "-" + (month + 1) + "-" + day;
        this.current_date_time = (month + 1) + '/' + day + '/' + year;
        this.min_date = 2020 + '-' + (month + 1) + '-' + day;
    };
    StepOnePage.prototype.next = function () {
        var _this = this;
        console.log(this.Step1Form.value);
        var fone = this.Step1Form.value;
        this.vehicle.swiss_car = fone.vehicle_swiss_car;
        console.log(this.vehicle);
        this.webService.step1(this.vehicle).subscribe(function (data) {
            console.log(data);
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                window.localStorage.setItem('vehicle_temp_id', data.data.vehicle_temp_id);
                //this.navCtrl.setRoot(StepTwoPage);
                _this.navCtrl.push(step_two_1.StepTwoPage, {
                    vehicle_temp_id: data.data.vehicle_temp_id
                });
                //  this.navCtrl.push(StepThreePage, {
                //   vehicle_temp_id: data.data.vehicle_temp_id
                // });
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
        //this.navCtrl.setRoot(StepTwoPage);
    };
    StepOnePage.prototype.hideShowDamage = function () {
        this.hideDamage = !this.hideDamage;
    };
    StepOnePage.prototype.deletePhoto = function (index) {
        this.photos[index] = this.imagePath + index + ".png";
    };
    StepOnePage.prototype.presentActionSheet = function (type) {
        var _this = this;
        console.log(type);
        this.actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY, type);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA, type);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        this.actionSheet.present();
    };
    StepOnePage.prototype.takePicture = function (sourceType, type) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        console.log("From Camera Or Gallery");
        console.log(options);
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), type);
                    _this.vehicleDamage[type] = correctPath + currentName;
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), type);
                _this.vehicleDamage[type] = correctPath + currentName;
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    StepOnePage.prototype.uploadImage = function (image, type) {
        var _this = this;
        // Destination URL
        var url = this.webService.baseUrl + "api/uploadDamageVehicle";
        // File for Upload
        var targetPath = this.pathForImage(image);
        // File name only
        var filename = image;
        var options = {
            fileKey: "data[VehicleDamage][" + type + "][]",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename, 'vehicle_id': window.localStorage.getItem('vehicle_temp_id') }
        };
        var fileTransfer = this.transfer.create();
        if (type == 'bottomside') {
            this.vehicleDamage[type] = this.imagePath + 'front.png';
        }
        else if (type == 'leftside') {
            this.vehicleDamage[type] = this.imagePath + 'left.png';
        }
        else if (type == 'topside') {
            this.vehicleDamage[type] = this.imagePath + 'top.png';
        }
        else if (type == 'rightside') {
            this.vehicleDamage[type] = this.imagePath + 'right.png';
        }
        else if (type == 'backside') {
            this.vehicleDamage[type] = this.imagePath + 'back.png';
        }
        this.loading = this.loadingCtrl.create({
            content: this.translate.instant('lbl_uploading')
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            var responseData = JSON.parse(data.response);
            if (responseData.success == true) {
                _this.vehicleDamage[type] = responseData.data.imageUrl;
                _this.vehicleDamage[type + "Id"] = responseData.data.id;
                //console.log(this.vehicleDamageImage);
            }
            _this.loading.dismissAll();
            _this.presentToast(_this.translate.instant('lbl_vehicle_damage_image_upload_successfully'));
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast(_this.translate.instant('lbl_file_upload_error'));
        });
        //this.navCtrl.setRoot(StepThreePage);
    };
    StepOnePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    StepOnePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName, type) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            _this.uploadImage(newFileName, type);
        }, function (error) {
            _this.presentToast(_this.translate.instant('lbl_file_storing_error'));
        });
    };
    StepOnePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    StepOnePage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return this.file.dataDirectory + img;
        }
    };
    StepOnePage.prototype.deleteDamagePhoto = function (vehicleDamageId, type) {
        var _this = this;
        this.webService.deleteDamagePhoto(vehicleDamageId, type).subscribe(function (data) {
            console.log(data);
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                if (type == 'bottomside') {
                    _this.vehicleDamage[type] = _this.imagePath + 'front.png';
                }
                else if (type == 'leftside') {
                    _this.vehicleDamage[type] = _this.imagePath + 'left.png';
                }
                else if (type == 'topside') {
                    _this.vehicleDamage[type] = _this.imagePath + 'top.png';
                }
                else if (type == 'rightside') {
                    _this.vehicleDamage[type] = _this.imagePath + 'right.png';
                }
                else if (type == 'backside') {
                    _this.vehicleDamage[type] = _this.imagePath + 'back.png';
                }
                _this.vehicleDamage[type + "Id"] = null;
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
    StepOnePage.prototype.switchBodyMultiLing = function () {
        this.bodyMultiLingual = !this.bodyMultiLingual;
    };
    StepOnePage.prototype.switchMechanicsMultiLing = function () {
        this.mechanicsMultiLingual = !this.mechanicsMultiLingual;
    };
    StepOnePage.prototype.getRegion = function () {
        var _this = this;
        this.webService.getRegion().subscribe(function (serverResponse) {
            console.log(serverResponse);
            if (serverResponse.success) {
                _this.reginList = serverResponse.data.VehicleRegion;
                _this.webService.loading.dismiss();
            }
        }, function (Err) {
            _this.webService.loading.dismiss();
            console.log(Err);
        });
    };
    ;
    StepOnePage.prototype.changeto = function () {
        var data = this.Step1Form.value;
        var val = parseInt(data.vehicle_kilometers);
        this.vehicle.kilometers = val;
    };
    StepOnePage.prototype.changeToKW = function () {
        var hp = this.vehicle.hp * 0.735499;
        this.vehicle.kw = hp.toFixed(2);
    };
    ;
    StepOnePage.prototype.changeToHP = function () {
        console.log(this.vehicle.kw);
        console.log(this.vehicle.hp);
        var hp = this.vehicle.kw * 1.359621;
        this.vehicle.hp = hp.toFixed(2);
        // let hp = (1 * this.vehicle.hp) / 0.74
        //   this.vehicle.hp = hp ;
        // if(this.vehicle.kw == null || this.vehicle.kw == 0 ){
        //   this.vehicle.hp=0;
        // }else{
        //   let hp = (1 * this.vehicle.hp) / 0.74
        //   this.vehicle.hp = hp ;
        // }
        //this.vehicle.hp, Validators.compose([Validators.required])],
        //'vehicle_kw': [this.vehicle.kw,
    };
    ;
    StepOnePage = __decorate([
        core_1.Component({
            selector: 'page-step-one',
            templateUrl: 'step-one.html'
        })
    ], StepOnePage);
    return StepOnePage;
}());
exports.StepOnePage = StepOnePage;
