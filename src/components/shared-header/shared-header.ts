import { Component, Input } from '@angular/core';
import { NavController, AlertController, AlertOptions, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {Events} from 'ionic-angular';

/**
 * Generated class for the SharedHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'shared-header',
  templateUrl: 'shared-header.html'
})
export class SharedHeaderComponent {

  pageLanguage: string;
  pageTitle:string;
  description:string;
  visibleLanguage:string;

  @Input()
    set title(newTitle: string) {
        this.pageTitle = newTitle;
    }
    get title() {
        return this.pageTitle;
    }
    @Input()
    set language(newLanguage: string){
      this.pageLanguage = newLanguage;
      this.visibleLanguage=this.formateLanguage(this.pageLanguage);
    }

    get language(){
      return this.pageTitle;
    }

  constructor(private events:Events,public navCtrl: NavController, public translate: TranslateService, public alertCtrl: AlertController) {
    console.log( 'shared header: ' + window.localStorage.getItem('language'));
    this.pageLanguage = window.localStorage.getItem('language');
    this.visibleLanguage=this.formateLanguage(this.pageLanguage);
  }

  /**
   * Implement translation of page text once view has completed loading
   *
   * @public
   * @method ionViewDidLoad
   * @return {none}
   */
  public ionViewDidLoad(): void {
    this._initialiseTranslation();
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




  /**
   * Capture the selected language from the  component
   *
   * @public
   * @method changeLanguage
   * @return {none}
   */
  public changeLanguage(): void {
    this._translateLanguage();
  }




  /**
   * Implement the selected language via the Translate service
   *
   * @private
   * @method _translateLanguage
   * @return {none}
   */
  private _translateLanguage(): void {
    let me=this;
    // console.log('this.formateLaguageToStandard(this.pageLanguage)',this.formateLaguageToStandard(this.pageLanguage))
    this.translate.setDefaultLang(this.formateLaguageToStandard(this.pageLanguage));
    this.translate.use(this.formateLaguageToStandard(this.pageLanguage));
    console.log(this.pageLanguage);
    window.localStorage.setItem('language',this.pageLanguage);
    this._initialiseTranslation();
    setTimeout(()=>{
      me.events.publish('language:change', true);
    },500)
  }

  /**
   * Translate the page texts to the selected language value
   *
   * @private
   * @method _initialiseTranslation
   * @return {none}
   */
  private _initialiseTranslation(): void {
    // setTimeout(() => {
    //   this.pageTitle = this.translate.instant("home.heading");
    //   this.description = this.translate.instant("home.description");

    //   console.log( this.translate.translations );
    // }, 250);
  }

  alertLanguage() {
    this.pageLanguage=this.formateLaguageToStandard(this.pageLanguage);
    let alertOptions: AlertOptions = {
      title: 'Language',
      inputs: [ {
        type: 'radio',
        label: 'EN',
        value: 'en',
        checked: this.pageLanguage == 'en'
      }, {
        type: 'radio',
        label: 'DE',
        value: 'deu',
        checked: this.pageLanguage == 'deu'
      }, {
        type: 'radio',
        label: 'FR',
        value: 'fra',
        checked: this.pageLanguage == 'fra'
      }, {
        type: 'radio',
        label: 'IT',
        value: 'ita',
        checked: this.pageLanguage == 'ita'
    
      } ],
      buttons: [ {
        text: 'Cancel'
      }, {
        text: 'OK',
        handler: selectedLanguage => {
          this.pageLanguage = selectedLanguage;
          this.visibleLanguage=this.formateLanguage(this.pageLanguage);
          this.changeLanguage();
        }
      } ]
    };
    this.alertCtrl.create(alertOptions).present();
  }

}
