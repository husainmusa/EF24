"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangeProfileDataPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ChangeProfileDataPage = /** @class */ (function () {
    function ChangeProfileDataPage(navCtrl, webService, camera, actionSheetCtrl, transfer, file, filePath, platform, fb, translate) {
        // if( window.localStorage.getItem('profileImage') == 'null' ){
        //   this.profileImage = 'assets/images/no-user.png';
        // } else {
        //   this.profileImage = window.localStorage.getItem('profileImage');
        // }
        var _this = this;
        this.navCtrl = navCtrl;
        this.webService = webService;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.platform = platform;
        this.fb = fb;
        this.translate = translate;
        this.viewOne = true;
        this.viewTwo = false;
        this.company = {
            name: "",
            addition: "",
            street: "",
            pob: "",
            postcode: null,
            town: "",
            country: "",
            commercial_register: ""
        };
        this.user = {
            username: "",
            prefix_name: "",
            fname: "",
            lname: "",
            email: "",
            phone_code: "",
            phone: null,
            mobile_code: 41,
            mobile: null,
            language: "English",
            site_reference: "FLEET"
        };
        this.webService.getProfileData().subscribe(function (data) {
            console.log("Company Informatipon !!!! ");
            console.log(data);
            if (data.success == true) {
                console.log("Here success Data !!! Will Change");
                _this.company = data.data.userData.Company;
                _this.user = data.data.userData.User;
                _this.profileImage = data.data.userData.User.image;
                _this.getCountryList();
                _this.webService.loading.dismiss();
                console.log(_this.company);
            }
            else {
                console.log("Here Error Data !!! Will Change");
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.loading.dismiss();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
        });
        this.validation_messages = {
            'company_name': [
                { type: 'required', message: this.translate.instant('lbl_company_name_required') }
            ],
            'company_pob': [
                { type: 'required', message: this.translate.instant('lbl_company_pob_required') }
            ],
            'company_postcode': [
                { type: 'required', message: this.translate.instant('lbl_company_post_code_required') }
            ],
            'company_town': [
                { type: 'required', message: this.translate.instant('lbl_company_town_required') }
            ],
            'company_country': [
                { type: 'required', message: this.translate.instant('lbl_company_country_required') }
            ],
            'user_fname': [
                { type: 'required', message: this.translate.instant('lbl_user_first_name_required') }
            ],
            'user_lname': [
                { type: 'required', message: this.translate.instant('lbl_user_last_name_required') }
            ],
            'user_phone': [
                { type: 'required', message: this.translate.instant('lbl_user_phone_required') }
            ]
            // 'user_username': [
            //     { type: 'required', message: 'Username is required.' }
            // ],
            // 'user_password': [
            //     { type: 'required', message: 'Password is required.' }
            // ],
            // 'user_repassword': [
            //     { type: 'required', message: 'Confirm password is required.' }
            // ]  
        };
        this.ProfileForm = this.fb.group({
            'company_name': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            //'company_addition' : [null],
            'company_CC': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'company_street': [null],
            'company_pob': [null],
            'company_postcode': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'company_town': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'company_country': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_username': [null],
            'user_prefix_name': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_fname': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_lname': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_email': [null],
            'user_phone_code': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_phone': [null, forms_1.Validators.compose([forms_1.Validators.required])],
            'user_mobile_code': [null],
            'user_mobile': [null],
            'user_language': [null],
            'user_site_reference': [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
    }
    ChangeProfileDataPage.prototype.save = function () {
        var _this = this;
        this.webService.updateProfileData(this.company, this.user).subscribe(function (data) {
            //console.log(data);
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                _this.navCtrl.pop();
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
        //this.navCtrl.pop();
    };
    ChangeProfileDataPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    ChangeProfileDataPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG
        };
        this.camera.getPicture(options).then(function (imagePath) {
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.webService.presentToast(_this.translate.instant('lbl_selecting_image_error'));
        });
    };
    ChangeProfileDataPage.prototype.uploadImage = function (image) {
        var _this = this;
        // Destination URL
        var url = this.webService.baseUrl + "api/uploadProfilePic";
        // File for Upload
        var targetPath = this.pathForImage(image);
        // File name only
        var filename = image;
        var options = {
            fileKey: "data[User][image]",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename },
            headers: { 'token': window.localStorage.getItem('token') }
        };
        var fileTransfer = this.transfer.create();
        //    this.webService.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            var responseData = JSON.parse(data.response);
            if (responseData.success == true) {
                //console.log(responseData.data.imageUrl);
                _this.profileImage = responseData.data.imageUrl;
                window.localStorage.setItem('profileImage', responseData.data.imageUrl);
            }
            //this.webService.loading.dismissAll()
            //this.webService.presentToast('Image succesful uploaded.');
        }, function (err) {
            //this.webService.loading.dismissAll()
            //this.webService.presentToast('Error while uploading file.');
        });
        //this.navCtrl.setRoot(StepThreePage);
    };
    // Create a new name for the image
    ChangeProfileDataPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    ChangeProfileDataPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (success) {
            _this.uploadImage(newFileName);
        }, function (error) {
            _this.webService.presentToast(_this.translate.instant('lbl_file_storing_error'));
        });
    };
    // Always get the accurate path to your apps folder
    ChangeProfileDataPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return this.file.dataDirectory + img;
        }
    };
    ;
    ChangeProfileDataPage.prototype.whichView = function (type) {
        switch (type) {
            case 'next': {
                this.viewOne = false;
                this.viewTwo = true;
                break;
            }
            case 'previous': {
                this.viewOne = true;
                this.viewTwo = false;
                break;
            }
            case 'submit': {
                this.save();
                break;
            }
            default: {
                break;
            }
        }
    };
    ;
    ChangeProfileDataPage.prototype.getCountryList = function () {
        var _this = this;
        this.webService.getCountry().subscribe(function (serverResponse) {
            console.log(serverResponse);
            if (serverResponse.success) {
                _this.countyList = serverResponse.data.Country;
                _this.webService.loading.dismiss();
            }
        }, function (Err) {
            _this.webService.loading.dismiss();
            console.log(Err);
        });
    };
    ;
    ChangeProfileDataPage = __decorate([
        core_1.Component({
            templateUrl: "changeProfileData.html",
            selector: "page-changeprofiledata"
        })
    ], ChangeProfileDataPage);
    return ChangeProfileDataPage;
}());
exports.ChangeProfileDataPage = ChangeProfileDataPage;
