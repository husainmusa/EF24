import { SubUsersPage } from './../sub-users/sub-users';
import { Component , } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';


import { ChangePasswordPage } from '../../pages/changePassword/changePassword';
import { Console } from '@angular/core/src/console';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddSubUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-sub-user',
  templateUrl: 'add-sub-user.html',
})
export class AddSubUserPage {

  AddSubUserForm : FormGroup;
  public validation_messages:any;
  public subUserId:number;
  public isEdit = false;
  public ischange = false;
  user_username = "";
  usernames:string;
  actionType: string;
  values:string;
  showCard: boolean = true;
  showCards: boolean = false;
  showedits: boolean = true;
  showupdate: boolean = false;
 

  user: { prefix_name: string, fname: string, lname: string, email: string, phone: string, 
    mobile: string, language: string, username: string, password: string, repassword: string, 
    site_reference: string, biodata: string, status:string , subUserId : any  } = {
    prefix_name: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    mobile: "",
    language: "",
    username: "",
    password: "",
    repassword: "",
    site_reference: "",
    biodata: "",
    status: "",
    subUserId:null
    
};

  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService, public translate: TranslateService, public fb: FormBuilder) {

    //console.log( ' Edit subuser ID: ' + this.navParams.get('subUserId') );

    if( typeof(this.navParams.get('subUserId')) != 'undefined' && this.navParams.get('subUserId') != '' ){
      this.subUserId = this.navParams.get('subUserId');
  // code done by diviya
      this.actionType = this.navParams.get('actionType');

      if(this.actionType == "xyz"){
        this.showedits = false;
        this.showedits = false;
        this.ischange = true;
        this.isEdit = false;
        // this.isEdit = false;
        //console.log('diviyaaaaa');
        console.log(this.actionType);
      }

        // code done by diviya


      this.webService.getUserData(this.subUserId).subscribe(
        data => {

        console.log(data);
          if (data.success == true) {
            this.user = data.data.userData.User;
            //this.usernames = data.userData.User.fname;
            //console.log(data[0].User.fname);
            this.webService.loading.dismiss();
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
       // code done by diviya -->
      this.isEdit = true;
      this.showCard = false;
      this.showCards = true;

      // code done by diviya -->
    }


    this.validation_messages = {
      'user_fname': [
          { type: 'required', message: this.translate.instant('lbl_user_first_name_required') }
      ],
      'user_lname': [
          { type: 'required', message: this.translate.instant('lbl_user_last_name_required') }
      ],
      'user_phone': [
          { type: 'required', message: this.translate.instant('lbl_user_phone_required') }
      ],
      'user_username': [
          { type: 'required', message: this.translate.instant('lbl_username_required') }
      ],
      'user_password': [
          { type: 'required', message: this.translate.instant('lbl_password_required') }
      ],
      'user_repassword': [
          { type: 'required', message: this.translate.instant('lbl_confirm_password_required') }
      ]  
    };


    this.AddSubUserForm = this.fb.group({
     // 'user_prefix_name' : [null, Validators.compose([Validators.required])],
      'user_fname' : [null, Validators.compose([Validators.required])],
      'user_lname': [null, Validators.compose([Validators.required])],
      'user_email': [null, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')])],
      //'user_phone_code': [null, Validators.compose([Validators.required])],
      'user_phone': [null, Validators.compose([Validators.required])],
      //'user_mobile_code': [null, Validators.compose([Validators.required])],
      'user_mobile': [null],
      'user_language': [null,Validators.compose([Validators.required])],
      
      'user_username': [null, Validators.compose([Validators.minLength(4),
                                                  Validators.maxLength(16),
                                                  Validators.required])],
      // 'user_password': [null, Validators.compose([ !this.subUserId ? Validators.required : null ])],

      'user_password': [null, !this.subUserId ? Validators.compose([Validators.required, Validators.minLength(8)]) : null ],

      'user_repassword': [null, !this.subUserId ? Validators.compose([Validators.required]) : null ],
      'user_site_reference': [null, Validators.compose([Validators.required])],
      'user_biodata': [null],
      'user_status': [null]
    },
     {validator: this.matchingPasswords('user_password', 'user_repassword')}
    );

      this.getName();

    
      // this.AddSubUserForm.get('user_username').valueChanges
      // .subscribe(value => {


      


// });


//this.checkUname();

}

  getName(){
    this.usernames = localStorage.getItem("username");
    }

    // checkUname(){

    //   if(this.values == 'abc') {
    //     this.AddSubUserForm.get('user_username').setValidators(Validators.required)
    //     } else {
    //     this.AddSubUserForm.get('user_username').clearValidators();
    //     }
    //     this.AddSubUserForm.get('user_username').updateValueAndValidity();
    // }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  // save(){


  //   this.webService.checkUsername(this.user_username).subscribe(
  //     data => {
  //       console.log(this.user_username);
  //         if (data.success == true) {
  //           // this.webService.loading.dismiss();
  //             this.webService.presentToast(this.user_username);
  //             //this.navCtrl.setRoot(SubUsersPage);
            
  //           this.saveData();

          
            

  //         } else {
  //            // this.webService.loading.dismiss();
  //             console.log('Username not exist');


  //             this.webService.presentToast(this.user_username);
  //          this.webService.presentToast(data.message);
  //         }
  //     },
  //     err => {
  //        // this.webService.loading.dismiss();
  //        // this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
  //         console.log(err);
  //     }
  // );

   

   
  // };

  save(){

    if(this.subUserId){
      this.user.subUserId = this.subUserId
    }

    this.webService.addUpdateUser(this.user).subscribe(
      data => {
          if (data.success == true) {
              this.webService.loading.dismiss();
              this.webService.presentToast(data.message);
              this.navCtrl.setRoot(SubUsersPage);
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

   // code done by diviya -->
  update(){

    if(this.subUserId){
      this.user.subUserId = this.subUserId
    }

    this.webService.addUpdateUser(this.user).subscribe(
      data => {
          if (data.success == true) {
              this.webService.loading.dismiss();
              this.webService.presentToast(data.message);
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

   // code done by diviya -->

  changepassword(){
    this.navCtrl.push(ChangePasswordPage,{
      subUserId: this.subUserId
    })
  }

}
