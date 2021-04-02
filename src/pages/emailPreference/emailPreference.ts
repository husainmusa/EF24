import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: "emailPreference.html",
    selector: "page-emailpreference"
})

export class EmailPreferencePage {
    send = false; // Chnage value to 0(false) and 1(true) 

    emailPreferenceData : any ;
    constructor(public navCtrl: NavController, private webService: WebService, public translate: TranslateService ) {

       console.log( "ojojjo" +  window.localStorage.getItem('emailpreference'))

       this.send =  window.localStorage.getItem('emailpreference') == 'true'  ? true : false;
    }

    save() {
        this.webService.setEmailPreferences(this.emailPreferenceData).subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.hideLoading();
                    this.webService.presentToast(data.message);

                    if(data.data.email_preference == 0 ){
                        window.localStorage.setItem('emailpreference', 'false' );
                    }else{
                        window.localStorage.setItem('emailpreference', 'true' );
                    }

                    this.send=false;
                    this.navCtrl.pop();
                } else {
                    this.webService.hideLoading();
                    this.webService.presentToast(data.message);
                    this.send= false;
                }
            },
            err => {
                this.webService.hideLoading();
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );
    };

    getEmailPreferences() {
        this.webService.getEmailPreferences().subscribe(
            data => {
                console.log(data);
                if (data.success == true) {
                    this.webService.hideLoading();
                    //this.send = data.data.email_preference;
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
    };

    statusChange(){

        
        this.send ? this.emailPreferenceData = 1 : this.emailPreferenceData = 0 ;

        console.log(this.emailPreferenceData);


    };
    
}