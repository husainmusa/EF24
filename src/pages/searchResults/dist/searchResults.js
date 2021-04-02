"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchResultsPage = void 0;
var vehicleDetails_1 = require("../vehicleDetails/vehicleDetails");
var core_1 = require("@angular/core");
var SearchResultsPage = /** @class */ (function () {
    function SearchResultsPage(navCtrl, navParams, webService, translate, cp) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.webService = webService;
        this.translate = translate;
        this.cp = cp;
        this.vehicleDetailsPage = vehicleDetails_1.VehicleDetailsPage;
        this.auctionData = [];
        this.favouriteData = [];
        this.myAuctionData = [];
        this.make = "";
        this.model = "";
        this.region = "";
        this.minYear = "";
        this.maxYear = "";
        this.bodyType = "";
        this.baseUrl = this.webService.baseUrl;
        this.title = this.navParams.get('title') ? this.navParams.get('title') : 'Search Results';
        //this.subTitle = this.navParams.get('subTitle') ? this.navParams.get('subTitle') : null;
        console.log(this.title);
        this.make = this.navParams.get('make');
        this.model = this.navParams.get('model');
        this.region = this.navParams.get('region');
        this.minYear = this.navParams.get('minYear');
        this.maxYear = this.navParams.get('maxYear');
        this.bodyType = this.navParams.get('bodyType');
        this.pagetype = this.navParams.get('page');
    }
    SearchResultsPage.prototype.ngOnInit = function () {
        if (this.title == "My Favourite Cars") {
            this.actionType = "favourite_vehicles";
            this.fetchFavouriteList();
        }
        else if (this.title == "Cars in Auction") {
            this.actionType = "vehicles_in_auction";
            this.fetchMyVehicleAuctionList();
        }
        else if (this.title == 'My Purchased Cars') {
            this.actionType = "lbl_my_purchased_cars";
            this.fetchMyPurchasedVehicleList();
        }
        else if (this.title == "My Sold Cars") {
            this.actionType = "vehicles_sold";
            this.fetchMySellVehicleList();
        }
        else {
            this.actionType = "vehicles_in_auction";
            this.fetchAuctionList();
        }
    };
    SearchResultsPage.prototype.fetchAuctionList = function () {
        var _this = this;
        console.log(this.pagetype);
        this.webService.getAuctionList("", this.make, this.model, this.region, this.minYear, this.maxYear, this.bodyType, this.pagetype).subscribe(function (data) {
            console.log(data);
            _this.webService.hideLoading();
            if (data.success == true) {
                _this.auctionData = data.data.auction_data;
                _this.auctionData.forEach(function (element, index) {
                    element.Vehicle.min_auction_price = _this.cp.transform(element.Vehicle.min_auction_price, 'USD', true, '1.2-2');
                    var pp = element.Vehicle.min_auction_price.replace(",", "'");
                    var mn = pp.split(".");
                    var ppg = mn[0] + ".-";
                    var oneMore = ppg.split("$");
                    // console.log("Final Formated Result : ",oneMore[1]);
                    element.Vehicle.min_auction_price = oneMore[1];
                    element.Vehicle.buy_price = _this.cp.transform(element.Vehicle.buy_price, 'USD', true, '1.2-2');
                    var pp1 = element.Vehicle.buy_price.replace(",", "'");
                    var mn1 = pp1.split(".");
                    var ppg1 = mn1[0] + ".-";
                    var oneMore1 = ppg1.split("$");
                    // console.log("Final Formated Result : ",oneMore1[1]);
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
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
    };
    SearchResultsPage.prototype.fetchFavouriteList = function () {
        var _this = this;
        this.webService.getMyFavouriteVehicleList().subscribe(function (data) {
            console.log(data);
            _this.webService.hideLoading();
            if (data.success == true) {
                _this.favouriteData = data.data;
                _this.favouriteData.forEach(function (element, index) {
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
                        //console.log("Final Formated Result : ",oneMoremax[1]);
                        element.max_bid_price = oneMoremax[1];
                    }
                });
            }
            else {
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
    };
    SearchResultsPage.prototype.fetchMyVehicleAuctionList = function () {
        var _this = this;
        this.webService.getMyVehicleAuctionList().subscribe(function (data) {
            console.log(data);
            _this.webService.hideLoading();
            if (data.success == true) {
                _this.myAuctionData = data.data;
                _this.myAuctionData.forEach(function (element, index) {
                    element.Vehicle.min_auction_price = _this.cp.transform(element.Vehicle.min_auction_price, 'USD', true, '1.2-2');
                    var pp = element.Vehicle.min_auction_price.replace(",", "'");
                    var mn = pp.split(".");
                    var ppg = mn[0] + ".-";
                    var oneMore = ppg.split("$");
                    // console.log("Final Formated Result : ",oneMore[1]);
                    element.Vehicle.min_auction_price = oneMore[1];
                    element.Vehicle.buy_price = _this.cp.transform(element.Vehicle.buy_price, 'USD', true, '1.2-2');
                    var pp1 = element.Vehicle.buy_price.replace(",", "'");
                    var mn1 = pp1.split(".");
                    var ppg1 = mn1[0] + ".-";
                    var oneMore1 = ppg1.split("$");
                    //  console.log("Final Formated Result : ",oneMore1[1]);
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
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
    };
    SearchResultsPage.prototype.fetchMyPurchasedVehicleList = function () {
        var _this = this;
        this.webService.getMyPurchasedVehicleList().subscribe(function (data) {
            console.log(data);
            _this.webService.hideLoading();
            if (data.success == true) {
                _this.myAuctionData = data.data;
                _this.myAuctionData.forEach(function (element, index) {
                    element.Vehicle.min_auction_price = _this.cp.transform(element.Vehicle.min_auction_price, 'USD', true, '1.2-2');
                    var pp = element.Vehicle.min_auction_price.replace(",", "'");
                    var mn = pp.split(".");
                    var ppg = mn[0] + ".-";
                    var oneMore = ppg.split("$");
                    // console.log("Final Formated Result : ",oneMore[1]);
                    element.Vehicle.min_auction_price = oneMore[1];
                    element.Vehicle.buy_price = _this.cp.transform(element.Vehicle.buy_price, 'USD', true, '1.2-2');
                    var pp1 = element.Vehicle.buy_price.replace(",", "'");
                    var mn1 = pp1.split(".");
                    var ppg1 = mn1[0] + ".-";
                    var oneMore1 = ppg1.split("$");
                    // console.log("Final Formated Result : ",oneMore1[1]);
                    element.Vehicle.buy_price = oneMore1[1];
                    if (element.max_bid_price != null) {
                        element.max_bid_price = _this.cp.transform(element.max_bid_price, 'USD', true, '1.2-2');
                        var ppmax = element.max_bid_price.replace(",", "'");
                        var mnmax = ppmax.split(".");
                        var ppgmax = mnmax[0] + ".-";
                        var oneMoremax = ppgmax.split("$");
                        //console.log("Final Formated Result : ",oneMoremax[1]);
                        element.max_bid_price = oneMoremax[1];
                    }
                });
            }
            else {
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
    };
    SearchResultsPage.prototype.fetchMySellVehicleList = function () {
        var _this = this;
        this.webService.getMySellVehicleList().subscribe(function (data) {
            console.log(data);
            _this.webService.hideLoading();
            if (data.success == true) {
                _this.myAuctionData = data.data;
                _this.myAuctionData.forEach(function (element, index) {
                    element.Vehicle.min_auction_price = _this.cp.transform(element.Vehicle.min_auction_price, 'USD', true, '1.2-2');
                    var pp = element.Vehicle.min_auction_price.replace(",", "'");
                    var mn = pp.split(".");
                    var ppg = mn[0] + ".-";
                    var oneMore = ppg.split("$");
                    // console.log("Final Formated Result : ",oneMore[1]);
                    element.Vehicle.min_auction_price = oneMore[1];
                    element.Vehicle.buy_price = _this.cp.transform(element.Vehicle.buy_price, 'USD', true, '1.2-2');
                    var pp1 = element.Vehicle.buy_price.replace(",", "'");
                    var mn1 = pp1.split(".");
                    var ppg1 = mn1[0] + ".-";
                    var oneMore1 = ppg1.split("$");
                    // console.log("Final Formated Result : ",oneMore1[1]);
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
                _this.webService.presentToast(data.message);
            }
        }, function (err) {
            _this.webService.hideLoading();
            _this.webService.presentToast(_this.translate.instant('lbl_some_error_occured'));
            console.log(err);
        });
    };
    SearchResultsPage.prototype.openVehicleDetailsPage = function (SelectedVehicle) {
        console.log(SelectedVehicle);
        Array.isArray(SelectedVehicle.VehicleDoc) ? SelectedVehicle.VehicleDoc = SelectedVehicle.VehicleDoc : SelectedVehicle.VehicleDoc = [];
        console.log(this.actionType);
        //return
        this.navCtrl.push(vehicleDetails_1.VehicleDetailsPage, {
            vehicle: SelectedVehicle,
            actionType: this.actionType
        });
    };
    SearchResultsPage = __decorate([
        core_1.Component({
            templateUrl: "searchResults.html",
            selector: "page-searchresults"
        })
    ], SearchResultsPage);
    return SearchResultsPage;
}());
exports.SearchResultsPage = SearchResultsPage;
