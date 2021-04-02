import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { HomePage } from '../../pages/home/home';
import { ConditionalExpr } from '@angular/compiler/src/output/output_ast';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the PreviewVehiclePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-preview-vehicle',
    templateUrl: 'preview-vehicle.html',
})
export class PreviewVehiclePage {

    public vehicle: any;
    public baseUrl: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService, private storage: Storage, public translate: TranslateService) {
        this.baseUrl = this.webService.baseUrl;
        
        if( window.localStorage.getItem('vehicle_temp_id') == null ){
            window.localStorage.setItem('vehicle_temp_id', this.navParams.get('vehicle_temp_id'));
        }
        //console.log(window.localStorage.getItem('vehicle_temp_id'));

        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            this.webService.getVehicleByTempId(window.localStorage.getItem('vehicle_temp_id')).subscribe(
                data => {

                    if (data.success == true) {
                        this.webService.loading.dismiss();
                        // this.webService.presentToast(data.message);
                        if( data.data.vehicleData ){
                            this.vehicle = data.data.vehicleData;
                        }
                        //console.log('Vehicle data log');
                        //console.log(this.vehicle);


                    } else {
                        this.webService.loading.dismiss();
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                    console.log(err);
                }
            );
        }
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad PreviewVehiclePage');
    }

    activateVehicle() {
        this.webService.updateVehicleStatus().subscribe(
            data => {

                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    window.localStorage.removeItem('vehicle_temp_id');
                    this.navCtrl.setRoot(HomePage);
                } else {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.loading.dismiss();
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );
    }

}
