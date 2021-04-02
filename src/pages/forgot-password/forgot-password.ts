import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { WebService } from '../../providers/web-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})

export class ForgotPasswordPage {

  forgotPasswordForm : FormGroup ;

  isShowError : any  ;

  notExist:any = false ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private translate: TranslateService , private webService: WebService,public fb: FormBuilder) {
      this.forgotPasswordForm = this.fb.group({
        userEmail : [null , Validators.compose([Validators.required,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])]
      })
  };

  doForgotPassword(){

    console.log(this.forgotPasswordForm.value);

    let data = this.forgotPasswordForm.value ;

    this.webService.forgotPassword(data).subscribe((response:any)=>{

      console.log(response);

      if(response.success){

        this.notExist=false

        this.webService.loading.dismiss();
          this.webService.presentToast(response.message);

        this.navCtrl.pop().then((response)=>{

          
          
        }).catch((Err)=>{
          console.log(Err);
        });

      }else {

        this.webService.loading.dismiss();
          this.webService.presentToast(response.message);
          this.notExist=true ;

        // this.navCtrl.pop().then((response)=>{
          
        // }).catch((Err)=>{
        //   console.log(Err);
        // });

      }

      

    },(Err)=>{
      console.log(Err)
    });

  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  };

  showError(event:any){

    console.log(event);

    console.log(this.forgotPasswordForm.valid);

    let formvalue = this.forgotPasswordForm.value;

    console.log(formvalue);

    this.notExist=false;

    this.forgotPasswordForm.valid ? this.isShowError =true :  this.isShowError = false ;
  };

}
