import { TranslateService } from '@ngx-translate/core';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
    templateUrl: "signIn.html",
    selector: "page-signin"
})

export class SignInPage {

    //mail.bestfreelancer
    //arunangshupradhan17
    homePage = HomePage;
    registrationPage = RegistrationPage;
    account: { username: string, password: string } = {
        username: '',
        password: ''
    };

    loginForm : FormGroup;
    public validation_messages:any;

    constructor(public navCtrl: NavController, 
                private webService: WebService, 
                private translate: TranslateService,
                public events: Events, 
                public fb: FormBuilder) {

        
        this.validation_messages = {
            'username': [
                { type: 'required', message: this.translate.instant("lbl_username_required") }
            ],
            'password': [
                { type: 'required', message: this.translate.instant("lbl_password_required") }
            ]  
        };
        this.loginForm = this.fb.group({
            'username' : ['subuser1', Validators.compose([Validators.required])],
            'password': ['phpdev@123#', Validators.compose([Validators.required])],
        });
    }

    // Attempt to login in through our User service
    doLogin() {
        this.webService.login(this.account).subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    window.localStorage.setItem('user_id', data.data.userData.id);
                    window.localStorage.setItem('token', data.data.userData.token);
                    window.localStorage.setItem('firstname', data.data.userData.fname);
                    window.localStorage.setItem('lastname', data.data.userData.lname);
                    window.localStorage.setItem('username', data.data.userData.username);
                    window.localStorage.setItem('profileImage', data.data.userData.image);
                    window.localStorage.setItem('emailpreference', data.data.userData.email_preference);
                    window.localStorage.setItem('parentid', data.data.userData.parent_id);
                    window.localStorage.setItem('roleid', data.data.userData.role_id);
                    let language;
                    switch(data.data.userData.language){
                        case 'English':
                            language = 'en';
                            break;
                        case 'French':
                            language = 'fr';
                            break;
                        case 'Italian':
                            language = 'it';
                            break;
                        case 'German':
                            language = 'de';
                            break;
                        default:
                            language = 'de';
                            break;
                    }
                    window.localStorage.setItem('language', language);
                    this.translate.setDefaultLang(this.formateLaguageToStandard(language));
                    this.translate.use(this.formateLaguageToStandard(language));
                    this.events.publish('user:after-login', data.data.userData.fname, data.data.userData.lname,data.data.userData.image);
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
    };

    formateLaguageToStandard(lang){
        if(lang=='de'){
          return 'deu';
        }else if(lang=='fr'){
          return 'fra'
        }else if(lang =='it'){
          return 'ita';
        }else if(lang =='en'){
          return 'en';
        }else{
          return lang;
        }
      }
    

    forgotPass(){
        this.navCtrl.push(ForgotPasswordPage).then(()=>{}).catch((Err)=>{console.log(Err)})
    };

}