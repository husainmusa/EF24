"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePage = void 0;
//import { SharedHeaderComponent } from './../../components/shared-header/shared-header';
var core_1 = require("@angular/core");
var vehicleDetails_1 = require("../vehicleDetails/vehicleDetails");
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, webService, translate, alertCtrl, cp
    //public commonHeader: SharedHeaderComponent 
    ) {
        this.navCtrl = navCtrl;
        this.webService = webService;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.cp = cp;
        this.auctionData = [];
        this.sortBy = "";
        this.baseUrl = this.webService.baseUrl;
        //this.commonHeader.pageTitle = 'aniketpanchal';
        //this.language = 'fr';
    }
    HomePage.prototype.ionViewDidLoad = function () {
        setTimeout(function () {
            //this.sharedHeader.title = 'aniket';
            // this.fetchAuctionList();
        }, 150);
        //this.fetchAuctionList();
        // this.fetchAuctionList();
    };
    ;
    HomePage.prototype.ionViewDidEnter = function () {
        this.fetchAuctionList();
    };
    ;
    HomePage.prototype.doRefresh = function (refresher) {
        this.fetchAuctionList();
        refresher.complete();
    };
    HomePage.prototype.ngOnInit = function () {
        //this.fetchAuctionList();
    };
    ;
    HomePage.prototype.sortChanged = function (event) {
        //console.log(event);
        this.fetchAuctionList();
    };
    HomePage.prototype.fetchAuctionList = function () {
        var _this = this;
        // this.webService.showLoading();
        this.webService.getAuctionList(this.sortBy).subscribe(function (data) {
            console.log(data);
            if (data.success == true) {
                _this.webService.hideLoading();
                _this.auctionData = data.data.auction_data;
                // this.username = 
                console.log("Here Data : ", parseInt(_this.auctionData[0].Vehicle.min_auction_price));
                _this.auctionData.forEach(function (element, index) {
                    console.log("First Registration :", element.Vehicle.first_reg);
                    element.Vehicle.min_auction_price = _this.cp.transform(element.Vehicle.min_auction_price, 'USD', true, '1.2-2');
                    var pp = element.Vehicle.min_auction_price.replace(",", "'");
                    var mn = pp.split(".");
                    var ppg = mn[0] + ".-";
                    var oneMore = ppg.split("$");
                    //console.log("Final Formated Result : ",oneMore[1]);
                    element.Vehicle.min_auction_price = oneMore[1];
                    element.Vehicle.buy_price = _this.cp.transform(element.Vehicle.buy_price, 'USD', true, '1.2-2');
                    var pp1 = element.Vehicle.buy_price.replace(",", "'");
                    var mn1 = pp1.split(".");
                    var ppg1 = mn1[0] + ".-";
                    var oneMore1 = ppg1.split("$");
                    //console.log("Final Formated Result : ",oneMore1[1]);
                    element.Vehicle.buy_price = oneMore1[1];
                    if (element.max_bid_price != null) {
                        element.max_bid_price = _this.cp.transform(element.max_bid_price, 'USD', true, '1.2-2');
                        var ppmax = element.max_bid_price.replace(",", "'");
                        var mnmax = ppmax.split(".");
                        var ppgmax = mnmax[0] + ".-";
                        var oneMoremax = ppgmax.split("$");
                        // console.log("Final Formated Result : ",oneMoremax[1]);
                        element.max_bid_price = oneMoremax[1];
                    }
                });
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
    ;
    HomePage.prototype.openVehicleDetailsPage = function (selectedvehicle) {
        Array.isArray(selectedvehicle.VehicleDoc) ? selectedvehicle.VehicleDoc = selectedvehicle.VehicleDoc : selectedvehicle.VehicleDoc = [];
        this.navCtrl.push(vehicleDetails_1.VehicleDetailsPage, {
            vehicle: selectedvehicle
        });
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: "home.html",
            selector: "page-home"
            //providers: [SharedHeaderComponent]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
