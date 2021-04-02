import { SubUsersPage } from './../sub-users/sub-users';
import { EmailPreferencePage } from '../emailPreference/emailPreference';
import { ChangePasswordPage } from '../changePassword/changePassword';
import { ChangeProfileDataPage } from '../changeProfileData/changeProfileData';
import { SearchResultsPage } from '../searchResults/searchResults';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {InvoicePage} from '../invoice/invoice';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';
import { SignInPage } from '../signIn/signIn';
import { CarGaragePage } from '../cargarage/cargarage';

import { AddSubUserPage } from '../add-sub-user/add-sub-user';


@Component({
    templateUrl: "myCorner.html",
    selector: "page-mycorner"
})

export class MyCornerPage{
   // changeProfileDataPage = ChangeProfileDataPage;
    changePasswordPage = ChangePasswordPage;
    emailPreferencePage = EmailPreferencePage;
    invoicePage = InvoicePage;
    subUserPage = SubUsersPage;
    parentid:number;
    actionType = 'xyz';
    roleid:number;
    showCard: boolean = true;

    


    constructor(public navCtrl: NavController, public navParams: NavParams , private webService: WebService,
        public translate: TranslateService,
        private alertCtrl: AlertController,){

          this.getInfo();

    }
    searchResultsPage(pageTitle, anotherTitle){
        this.navCtrl.push(SearchResultsPage, {
            title: pageTitle,
            subTitle: anotherTitle
        });
    };


    getInfo(){
      this.parentid = parseInt(localStorage.getItem("parentid"));
      this.roleid = parseInt(localStorage.getItem("roleid"));
     

          if (this.parentid > 0) {
            this.showCard = false;
        }
      
      };


      next() {

          this.navCtrl.push(CarGaragePage);

      
      };



    deleteUser(){

             let alert = this.alertCtrl.create({
            title: this.translate.instant('lbl_delete_account'),
            message: this.translate.instant('lbl_delete_account_user'),
            cssClass:'alertCustomWraper',
            buttons: [
              {
                text: this.translate.instant('lbl_no'),
                cssClass:'alertCustomBtnLeft',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: this.translate.instant('lbl_yes'),
                cssClass:'alertCustomBtnRight',
                handler: () => {
                  console.log('Delete clicked');
      
                  this.webService.deleteUser().subscribe(
                    data => {
                      if (data.success == true) {
                        this.webService.loading.dismiss();
                        this.webService.presentToast(data.message);

                        window.localStorage.removeItem('token');
                        window.localStorage.removeItem('firstname');
                        window.localStorage.removeItem('lastname');
                        window.localStorage.removeItem('profileImage');
                        window.localStorage.removeItem('language');
                        
                        this.navCtrl.setRoot(SignInPage);
              
                        //this.navCtrl.setRoot(this.navCtrl.getActive().component);
              
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
              }
            ]
          });
          alert.present();

    };

  
// code done by diviya
    changeData(){
      //[navPush]="changeProfileDataPage"

      console.log(localStorage.getItem('parentid'));

      let userId : any =  localStorage.getItem('parentid') ;
     // let userId : any =  29 ;

      if( userId == 0 ){
        this.navCtrl.push(ChangeProfileDataPage)
      }else{
        this.navCtrl.push(AddSubUserPage, {
          subUserId: localStorage.getItem('user_id'),
          actionType: this.actionType
        });
      }

    };

   // code done by diviya
}