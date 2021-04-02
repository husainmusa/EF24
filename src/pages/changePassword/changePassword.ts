import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: "changePassword.html",
    selector: "page-changepassword"
})

export class ChangePasswordPage {

    currentPassword = "";
    password = "";
    confirmPassword = "";

    public subUserId:number;

    ChangePasswordForm: FormGroup;
    public validation_messages: any;

    constructor(public navCtrl: NavController, private webService: WebService, public fb: FormBuilder, public translate: TranslateService , public navParams: NavParams,) {
 
      if( typeof(this.navParams.get('subUserId')) != 'undefined' && this.navParams.get('subUserId') != '' ){
        this.subUserId = this.navParams.get('subUserId');
      }
        this.validation_messages = {
            'currentPassword': [
              { type: 'required', message: this.translate.instant('lbl_current_password_required') }
            ],
            'password': [
              { type: 'required', message: this.translate.instant('lbl_password_required') }
            ],
            'confirmPassword': [
              { type: 'required', message: this.translate.instant('lbl_confirm_password_required') }
            ]
          };
      
          this.ChangePasswordForm = this.fb.group({
            'currentPassword': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
          });
    }

    changePassword() {
        // if(!this.currentPassword || !this.password || !this.confirmPassword){
        //     this.webService.presentToast("All fields are mandatory!");
        //     return;
        // }
        let token = this.subUserId ? this.subUserId :  window.localStorage.getItem('token') ;
        this.webService.changePassword(this.currentPassword, this.password, this.confirmPassword, token).subscribe(
            data => {
                //console.log(data);
                this.webService.hideLoading();
                if (data.success == true) {
                  this.webService.presentToast(data.message);
                  this.navCtrl.pop();

                } else {
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
}