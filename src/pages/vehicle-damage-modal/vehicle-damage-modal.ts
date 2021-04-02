import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';

/**
 * Generated class for the VehicleDamageModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-vehicle-damage-modal',
  templateUrl: 'vehicle-damage-modal.html',
})
export class VehicleDamageModalPage {

  imageUrl:string;
  baseUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public webService: WebService, public modalController:ModalController, public viewController: ViewController) {
    this.baseUrl = this.webService.baseUrl;
    
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ionViewDidLoad() {
    this.imageUrl = this.navParams.get('imageUrl');
    //console.log(this.imageUrl);
    //console.log('ionViewDidLoad VehicleDamageModalPage');
  }

}
