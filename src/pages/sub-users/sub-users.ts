import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController , ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { WebService } from '../../providers/web-service';
import { AddSubUserPage } from '../add-sub-user/add-sub-user';

import {AlertModalPage  } from '../alert-modal/alert-modal';

/**
 * Generated class for the SubUsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sub-users',
  templateUrl: 'sub-users.html',
})
export class SubUsersPage {

  public subUsers:any;
  
  // abc: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private webService: WebService,
    public translate: TranslateService,
    private alertCtrl: AlertController, 

    public modalCtrl: ModalController
  ) {
    this.webService.getSubUsers().subscribe(
      data => {

        console.log(data);
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);

          if (Object.keys(data.data).length > 0) {
            this.subUsers = data.data;
          }
        } else {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
        }
      },
      err => {
        this.webService.loading.dismiss();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
      }
    );

 
  }

//  ngOnInit() {


   
    
      
 // }

 

  addSubUser(){
    this.navCtrl.push(AddSubUserPage);
  }

  editSubUser(subUserId){
    this.navCtrl.push(AddSubUserPage, {
      subUserId: subUserId
    });
  }

  deleteSubUser(subUserId){

  //   let profileModal = this.modalCtrl.create(AlertModalPage , { userId: 8675309 } , {
  //     showBackdrop:true
  //   } );
  //  profileModal.present();

  //  return false ;

    let alert = this.alertCtrl.create({
      title: this.translate.instant('lbl_dlt_sub_user'),
      message: this.translate.instant('lbl_dlt_sub_user_text'),
      cssClass:'alertCustomWraper',
      buttons: [
        {
          text: this.translate.instant('lbl_cancel'),
          cssClass:'alertCustomBtnLeft',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('lbl_delete'),
          cssClass:'alertCustomBtnRight',
          handler: () => {
            console.log('Delete clicked');

            this.webService.deleteSubUser(subUserId).subscribe(
              data => {
                if (data.success == true) {
                  this.webService.loading.dismiss();
                  this.webService.presentToast(data.message);
        
                  this.navCtrl.setRoot(this.navCtrl.getActive().component);
        
                } else {
                  this.webService.loading.dismiss();
                  this.webService.presentToast(data.message);
                }
              },
              err => {
                this.webService.loading.dismiss();
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
              }
            );
        
            console.log( 'Sub User ID: ' + subUserId);

            
          }
        }
      ]
    });
    alert.present();
    
    

  }

}
