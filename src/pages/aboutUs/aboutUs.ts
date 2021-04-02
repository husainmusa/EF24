import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: "aboutUs.html",
    selector: "page-aboutus"
})

export class AboutUsPage{

    cmsContent: any;

    constructor(public navCtrl: NavController, 
                private webService: WebService, 
                private sanitizer: DomSanitizer, 
                public translate: TranslateService,
                public events: Events,){

        events.subscribe('language:change',()=>{
            this.getData(false);
        })
    }

    ionViewWillEnter(){
        this.getData();
    }

    getData(loader=true){
        if(loader) this.webService.showLoading();
        this.webService.getCmsPage('about-us',this.formateLanguage(window.localStorage.getItem('language'))).subscribe( 
            data => {
                //console.log(data);
                if (data.success == true) {
                    if(loader) this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    
                    this.cmsContent = this.sanitizer.bypassSecurityTrustHtml(data.data.page_content);
                } else {
                    if(loader) this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                if(loader) this.webService.loading.dismiss();
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );
    }

    formateLanguage(lang){
        if(lang=='deu'){
          return 'de';
        }else if(lang=='fra'){
          return 'fr'
        }else if(lang =='ita'){
          return 'it';
        }else if(lang =='en'){
          return 'en';
        }else{
          return lang;
        }
      }
}