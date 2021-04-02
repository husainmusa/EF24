"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StepTwoPage = void 0;
var core_1 = require("@angular/core");
var step_three_1 = require("../step-three/step-three");
/**
 * Generated class for the StepTwoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StepTwoPage = /** @class */ (function () {
    function StepTwoPage(navCtrl, navParams, camera, actionSheetCtrl, transfer, file, filePath, loadingCtrl, platform, toastCtrl, webService, translate) {
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
        this.translate = translate;
        this.lastImage = null;
        this.vehicleTempId = window.localStorage.getItem('vehicle_temp_id');
        this.photos = [];
        this.imagePath = "assets/images/cars/";
        this.docPath = "assets/images/cars/";
        this.upload = [];
        this.isEdit = false;
        this.docs = [];
        this.alternativeImages = [];
        this.counter = 0;
        if (this.vehicleTempId == null) {
            this.vehicleTempId = this.navParams.get('vehicle_temp_id');
        }
        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            this.webService.getVehicleImages(window.localStorage.getItem('vehicle_temp_id')).subscribe(function (data) {
                console.log(data);
                if (data.success == true) {
                    _this.webService.loading.dismiss();
                    _this.webService.presentToast(data.message);
                    if (Object.keys(data.data.vehicleImages).length > 0) {
                        _this.photos = data.data.vehicleImages;
                        // this.photos.push({ id: null, imageUrl: this.imagePath + "upload-image.png" });
                        _this.isEdit = true;
                        _this.photos.forEach(function (element, index) {
                            if (element.imageUrl == null) {
                                element.imageUrl = _this.alternativeImages[index].imageUrl;
                                console.log(index);
                            }
                        });
                    }
                    else {
                    }
                    if (Object.keys(data.data.vehicleDocs).length > 0) {
                        _this.docs = data.data.vehicleDocs;
                        _this.docs.push({ id: null, imageUrl: _this.docPath + "upload-doc.png" });
                    }
                    // if (Object.keys(data.data.vehicleImages).length > 0) {
                    //   this.photos = data.data.vehicleImages.Vehicle;
                    // }
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
    ;
    StepTwoPage.prototype.getAllImages = function () {
        var _this = this;
        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            this.webService.getVehicleImages(window.localStorage.getItem('vehicle_temp_id')).subscribe(function (data) {
                console.log(data);
                if (data.success == true) {
                    _this.webService.loading.dismiss();
                    _this.webService.presentToast(data.message);
                    if (Object.keys(data.data.vehicleImages).length > 0) {
                        _this.photos = data.data.vehicleImages;
                        // this.photos.push({ id: null, imageUrl: this.imagePath + "upload-image.png" });
                        _this.isEdit = true;
                        _this.photos.forEach(function (element, index) {
                            if (element.imageUrl == null) {
                                element.imageUrl = _this.alternativeImages[index].imageUrl;
                                console.log(index);
                            }
                        });
                    }
                    else {
                    }
                    if (Object.keys(data.data.vehicleDocs).length > 0) {
                        _this.docs = data.data.vehicleDocs;
                        _this.docs.push({ id: null, imageUrl: _this.docPath + "upload-doc.png" });
                    }
                    // if (Object.keys(data.data.vehicleImages).length > 0) {
                    //   this.photos = data.data.vehicleImages.Vehicle;
                    // }
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
    ;
    StepTwoPage.prototype.ngOnInit = function () {
        // this.photos = [
        //   this.imagePath + "1.png",
        //   this.imagePath + "2.png",
        //   this.imagePath + "3.png",
        //   this.imagePath + "4.png",
        //   this.imagePath + "5.png",
        //   this.imagePath + "6.png",
        //   this.imagePath + "7.png",
        //   this.imagePath + "8.png",
        //   this.imagePath + "9.png",
        //   this.imagePath + "10.png",
        //   this.imagePath + "11.png",
        //   this.imagePath + "12.png"
        // ];
        //if( this.isEdit == true ){
        this.photos = [
            { id: null, imageUrl: this.imagePath + "1.png" },
            { id: null, imageUrl: this.imagePath + "2.png" },
            { id: null, imageUrl: this.imagePath + "3.png" },
            { id: null, imageUrl: this.imagePath + "4.png" },
            { id: null, imageUrl: this.imagePath + "5.png" },
            { id: null, imageUrl: this.imagePath + "6.png" },
            { id: null, imageUrl: this.imagePath + "7.png" },
            { id: null, imageUrl: this.imagePath + "8.png" },
            { id: null, imageUrl: this.imagePath + "9.png" },
            { id: null, imageUrl: this.imagePath + "10.png" },
            { id: null, imageUrl: this.imagePath + "11.png" },
            { id: null, imageUrl: this.imagePath + "12.png" }
        ];
        this.alternativeImages = [
            { id: null, imageUrl: this.imagePath + "1.png" },
            { id: null, imageUrl: this.imagePath + "2.png" },
            { id: null, imageUrl: this.imagePath + "3.png" },
            { id: null, imageUrl: this.imagePath + "4.png" },
            { id: null, imageUrl: this.imagePath + "5.png" },
            { id: null, imageUrl: this.imagePath + "6.png" },
            { id: null, imageUrl: this.imagePath + "7.png" },
            { id: null, imageUrl: this.imagePath + "8.png" },
            { id: null, imageUrl: this.imagePath + "9.png" },
            { id: null, imageUrl: this.imagePath + "10.png" },
            { id: null, imageUrl: this.imagePath + "11.png" },
            { id: null, imageUrl: this.imagePath + "12.png" }
        ];
        //} else {
        //}
        //this.vehicleDocs = this.docPath + 'vehicle-docs.png';
        this.docs = [
            { id: null, imageUrl: this.docPath + "upload-doc.png" },
        ];
    };
    StepTwoPage.prototype.deletePhoto = function (index) {
        this.photos[index] = this.imagePath + index + ".png";
    };
    StepTwoPage.prototype.presentActionSheet = function (seq, imageId) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY, seq, imageId);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA, seq, imageId);
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
    StepTwoPage.prototype.takePicture = function (sourceType, seq, imageId) {
        var _this = this;
        var options;
        if (sourceType == 0) {
            options = {
                quality: 50,
                sourceType: sourceType,
                saveToPhotoAlbum: false,
                correctOrientation: true,
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG
            };
        }
        else {
            options = {
                quality: 50,
                sourceType: sourceType,
                saveToPhotoAlbum: false,
                correctOrientation: true,
                allowEdit: true,
                targetHeight: 490,
                targetWidth: 500,
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG
            };
        }
        console.log(options);
        this.camera.getPicture(options).then(function (imagePath) {
            console.log(imagePath);
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), seq, imageId);
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                console.log(correctPath);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), seq, imageId);
            }
        }, function (err) {
            _this.presentToast(_this.translate.instant('lbl_selecting_image_error'));
        });
    };
    StepTwoPage.prototype.next = function () {
        //this.uploadImage();
        //this.navCtrl.setRoot(StepThreePage);
        // console.log(this.photos);
        // this.photos.forEach((element)=>{
        //   if(element.id != null ){
        //     this.counter = this.counter + 1 ; 
        //   }
        // });
        console.log(this.counter);
        if (this.counter == 0) {
            this.presentToast("Please select at least one picture");
        }
        else {
            this.navCtrl.push(step_three_1.StepThreePage, {
                vehicle_temp_id: this.vehicleTempId
            });
        }
    };
    StepTwoPage.prototype.uploadImage = function (image, seq, imageId) {
        var _this = this;
        // Destination URL
        var url = this.webService.baseUrl + "api/uploadVehicleImages";
        // File for Upload
        var targetPath = this.pathForImage(image);
        // File name only
        var filename = image;
        var options = {
            fileKey: "data[VehicleDoc][image]",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename, 'vehicle_id': this.vehicleTempId, 'vehicle_img_id': imageId }
        };
        console.log("Uploading time !!!!!!! jdfds!!okkokoko");
        console.log(options);
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: this.translate.instant('lbl_uploading')
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            var responseData = JSON.parse(data.response);
            console.log(responseData);
            if (responseData.success == true) {
                _this.counter = _this.counter + 1;
                _this.photos[seq] = { id: responseData.data.id, imageUrl: responseData.data.imageUrl, type: responseData.type };
                var keepGoing_1 = true;
                if (_this.photos.length) {
                    _this.photos.forEach(function (element) {
                        if (keepGoing_1) {
                            if (element.id == null) {
                                keepGoing_1 = false;
                            }
                        }
                    });
                }
                if (keepGoing_1) {
                    // this.photos.push({ id: null, imageUrl: this.imagePath + "upload-image.png" });
                    _this.isEdit = true;
                }
                //this.photos.push({ id: null, imageUrl: this.imagePath + "upload-image.png" });
                _this.loading.dismissAll();
                _this.presentToast(_this.translate.instant('lbl_vehicle_image_upload_successfully'));
            }
            else {
                _this.getAllImages();
                // this.photos.forEach((element,index) => {
                //   if(element.imageUrl==null){
                //     element.imageUrl= this.alternativeImages[index].imageUrl
                //    console.log(index);
                //   }
                // });
                _this.loading.dismissAll();
                _this.presentToast(responseData.message);
            }
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast(_this.translate.instant('lbl_file_upload_error'));
        });
        //this.navCtrl.setRoot(StepThreePage);
    };
    // Create a new name for the image
    StepTwoPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    StepTwoPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName, seq, imageId) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            _this.photos[seq] = newFileName;
            _this.uploadImage(newFileName, seq, imageId);
        }, function (error) {
            _this.presentToast(_this.translate.instant('lbl_file_storing_error'));
        });
    };
    StepTwoPage.prototype.copyDocToLocalDir = function (namePath, currentName, newFileName, seq, docId) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (success) {
            //this.vehicleDocs = newFileName;
            _this.docs[seq] = newFileName;
            _this.uploadDocs(newFileName, seq, docId);
        }, function (error) {
            _this.presentToast(_this.translate.instant('lbl_file_storing_error'));
        });
    };
    StepTwoPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    StepTwoPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return this.file.dataDirectory + img;
        }
    };
    StepTwoPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad StepTwoPage');
    };
    StepTwoPage.prototype.presentActionSheetDoc = function (seq, docId) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.translate.instant('lbl_select_image_source'),
            buttons: [
                {
                    text: this.translate.instant('lbl_load_from_library'),
                    handler: function () {
                        _this.takeDocs(_this.camera.PictureSourceType.PHOTOLIBRARY, seq, docId);
                    }
                },
                {
                    text: this.translate.instant('lbl_user_camera'),
                    handler: function () {
                        _this.takeDocs(_this.camera.PictureSourceType.CAMERA, seq, docId);
                    }
                },
                {
                    text: this.translate.instant('lbl_cancel'),
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    StepTwoPage.prototype.takeDocs = function (sourceType, seq, docId) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imagePath) {
            console.log(imagePath);
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyDocToLocalDir(correctPath, currentName, _this.createFileName(), seq, docId);
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyDocToLocalDir(correctPath, currentName, _this.createFileName(), seq, docId);
            }
        }, function (err) {
            _this.presentToast(_this.translate.instant('lbl_selecting_image_error'));
        });
    };
    StepTwoPage.prototype.uploadDocs = function (image, seq, docId) {
        var _this = this;
        console.log("GGGGGGGGGGGGGG");
        console.log(seq, docId);
        // Destination URL
        var url = this.webService.baseUrl + "api/uploadVehicleDocs";
        // File for Upload
        var targetPath = this.pathForImage(image);
        // File name only
        var filename = image;
        var options = {
            fileKey: "data[VehicleDoc][doc]",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename, 'vehicle_id': this.vehicleTempId, 'vehicle_img_id': docId }
        };
        console.log(options);
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: this.translate.instant('lbl_uploading')
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            var responseData = JSON.parse(data.response);
            if (responseData.success == true) {
                //this.vehicleDocs = responseData.data.imageUrl;
                _this.docs[seq] = { id: responseData.data.id, imageUrl: responseData.data.imageUrl };
                var keepGoing_2 = true;
                if (_this.docs.length) {
                    _this.docs.forEach(function (element) {
                        if (keepGoing_2) {
                            if (element.id == null) {
                                keepGoing_2 = false;
                            }
                        }
                    });
                }
                if (keepGoing_2) {
                    _this.docs.push({ id: null, imageUrl: _this.docPath + "upload-doc.png" });
                }
                _this.loading.dismissAll();
                _this.presentToast(_this.translate.instant('lbl_vehicle_document_uploaded_successfully'));
            }
            else {
            }
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast(_this.translate.instant('lbl_file_upload_error'));
        });
        //this.navCtrl.setRoot(StepThreePage);
    };
    StepTwoPage.prototype.deleteVehicleImage = function (vehicleImageId, index) {
        var _this = this;
        this.webService.deleteVehicleImage(vehicleImageId).subscribe(function (data) {
            console.log(data);
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                _this.photos[index] = { id: vehicleImageId, imageUrl: _this.alternativeImages[index].imageUrl, type: 0 };
                _this.counter = _this.counter - 1;
                //this.photos.splice(index, 1);
                //delete this.photos[index] ;
                // this.photos = this.photos.filter(function (item, key) {
                //   return key !== index
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
    };
    StepTwoPage.prototype.deleteVehicleDoc = function (vehicleDocId, index) {
        var _this = this;
        this.webService.deleteVehicleDoc(vehicleDocId).subscribe(function (data) {
            if (data.success == true) {
                _this.webService.loading.dismiss();
                _this.webService.presentToast(data.message);
                _this.docs = _this.docs.filter(function (item, key) {
                    return key !== index;
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
    };
    StepTwoPage = __decorate([
        core_1.Component({
            selector: 'page-step-two',
            templateUrl: 'step-two.html'
        })
    ], StepTwoPage);
    return StepTwoPage;
}());
exports.StepTwoPage = StepTwoPage;
