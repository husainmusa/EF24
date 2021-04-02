import { VehicleDetailsPage } from '../vehicleDetails/vehicleDetails';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: "sellVehicle.html",
    selector: "page-sellvehicle"
})

export class SellVehiclePage {
    vehicleDetailsPage = VehicleDetailsPage;
    auctionData = [];
    sortBy = "";
    baseUrl:string;
    constructor(public navCtrl: NavController, private webService: WebService, public translate: TranslateService) {
        this.baseUrl = this.webService.baseUrl;
    }

    ngOnInit() {
        this.fetchAuctionList();
    }

    sortChanged(event) {
        //console.log(event);
        this.fetchAuctionList();
    }

    fetchAuctionList() {
        this.webService.getAuctionList(this.sortBy).subscribe(
            data => {
                //console.log(data);
                if (data.success == true) {
                    this.webService.hideLoading();
                    this.auctionData = data.data.auction_data;
                } else {
                    this.webService.hideLoading();
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.hideLoading();
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );
    }

    openVehicleDetailsPage(vehicle) {
        this.navCtrl.push(VehicleDetailsPage, {
            vehicle: vehicle
        });
    }
}