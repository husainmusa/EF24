import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchResultsPage } from '../../searchResults/searchResults';
import { WebService } from '../../../providers/web-service';
import * as $ from 'jquery';

@Component({
    templateUrl: "tab1.html",
    selector: "page-tab1"
})
export class tab1 {
    @ViewChild('searchbar')
    searchResultsPage = SearchResultsPage;
   // regions : any;
     reginList : Array<any>=[] ;
     brandList : Array<any>=[] ;

    regions: Array<{ value: string, text: string, checked: boolean }> = [];
    selectedRegion = "";
    minYear:any = "";
    maxYear:any = "";
    make = "";
    model = "";
    makes:Array<any> = [];
    models:Array<any> = [];
    min_years:Array<any>=[];
    max_years:Array<any>=[];
    
    constructor(public navCtrl: NavController, private webService: WebService, public translate: TranslateService) {

        let date = new Date();
        // this.maxYear = date.getFullYear();

      

        // this.webService.getAllRegions().subscribe(
    
        //     data => {
        //         console.log(data);
                
        //         if (data) {
        //           //  this.regions.sort((a, b) => a - b);

                
        //             for (var i in data) {
        //                // this.regions = data.VehicleRegion;
        //                 this.regions.push({ value: i, text: data[i], checked: false });
        //             }
        //             console.log(this.regions);
        //         } else {
        //             this.webService.presentToast(data.message);
        //         }
        //     },
        //     err => {
        //         this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        //         console.log(err);
        //     }
        // );
    }

    public onSelectClicked (): void {
        const options: HTMLCollectionOf<Element> = document.getElementsByClassName('alert-tappable alert-radio') // These classes come from the generated elements for the ion-select/ion-option
        setTimeout(() => {
          let i: number = 0
          const len: number = options.length
          for (i; i < len; i++) {
            if ((options[i] as HTMLElement).attributes[3].nodeValue === 'true') {
              options[i].scrollIntoView({ block: 'end', behavior: 'smooth' })
            }
          }
        }, 1000) // Leave enough time for the popup to render
      }


    getBrands(){

        this.webService.getBrandList().subscribe((serverResponse:any)=>{
    
          console.log(serverResponse);
    
         
    
          if(serverResponse.Info.StatusMsg == "OK"){

              console.log(serverResponse.Marken);

            this.brandList = serverResponse.Marken;
    
    
          }
    
        },(Err)=>{
          this.webService.loading.dismiss();
    
          console.log(Err);
        });
    
    
    };


    getRegion(){

        this.webService.getRegion().subscribe((serverResponse:any)=>{
    
          console.log(serverResponse);
    
         
    
          if(serverResponse.success){
    
            this.reginList = serverResponse.data.VehicleRegion ;
    
            if(this.webService.loading) this.webService.loading.dismiss();
    
          }
    
        },(Err)=>{
          this.webService.loading.dismiss();
    
          console.log(Err);
        });
    
    
    };


    ionViewDidLoad() {
        console.log('ionViewDidLoad StepOnePage');
    
          this.getRegion();

          this.getBrands();
    
    };

    getModels(value) {
        console.log(value);
        this.minYear="";
        this.maxYear="";
        this.model="";
        this.min_years = [];
        this.max_years = [];

        if (value) {
            this.webService.getModleList(value).subscribe(
                data => {
                    console.log(data);
                    if (data.Info.StatusMsg ==  "OK") {
                        this.models = data.ModellGruppen;
                        
                    } else {
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                    console.log(err);
                }
            );
        }else{
            this.models = [];
        }
    }

    getYears(value) {
        console.log('getYears By ',value);
        this.min_years = [];
        this.max_years = [];
        this.minYear="";
        this.maxYear="";

        if (value) {
            this.webService.getMinMaxYears(value).subscribe(
                data => {
                    
                    console.log('getYears By getMinMaxYears',data);
                    if (data.Info.StatusMsg ==  "OK") {
                        let today = new Date();
                        let startFrom = data.ModellGruppen && data.ModellGruppen.ProdVon ? data.ModellGruppen.ProdVon : today.getFullYear()-10;
                        let endTo = data.ModellGruppen && data.ModellGruppen.ProdBis ? data.ModellGruppen.ProdBis : today.getFullYear();
                        if(parseInt(startFrom)<=0)startFrom = today.getFullYear();
                        if(parseInt(endTo)<=0)endTo = today.getFullYear();
                        /*===
                        * before 
                        * some time ProdBis or ProdVon may be 0000 ,due to this reason apply default range
                        */
                        /*for(let i =data.ModellGruppen.ProdVon; i <= data.ModellGruppen.ProdBis; i++){ 
                            this.min_years.push(i);
                        }*/
                        // this.min_years.push(startFrom);
                        let sd= parseInt(startFrom);
                        sd++
                        ( sd < today.getFullYear()) ? startFrom=sd : startFrom=startFrom ;
                        for(let i = parseInt(startFrom)  ; i <= today.getFullYear(); i++){ 
                            if( this.min_years.indexOf(i) !=-1){
                                console.log('MAX YEAR DUPLICATE',i)  ;  
                            }else{
                                this.min_years.push(i);
                            }
                        }
                        if(this.min_years.length==0) this.min_years.push(startFrom);
                        //console.log('startFrom',startFrom,'endTo',endTo);
                       // console.log('this.min_years',this.min_years,'this.max_years',this.max_years);
                    } else {
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                    console.log(err);
                }
            );
        }
    }


    searchMake(value) {
        console.log(value);
        if (value) {
            this.webService.getAllMake(value).subscribe(
                data => {
                    console.log(data);
                    if (data) {
                        this.makes = data;
                    } else {
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                    console.log(err);
                }
            );
        }else{
            this.makes = [];
        }
    }
    makeSelected(value){
        this.make = value;
        this.makes = [];
    }

    searchModel(value) {
        console.log(value);
        if (value) {
            this.webService.getAllModel(value, this.make).subscribe(
                data => {
                    console.log(data);
                    if (data) {
                        this.models = data;
                    } else {
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                    console.log(err);
                }
            );
        }else{
            this.models = [];
        }
    }
    modelSelected(value){
        this.model = value;
        this.models = [];
    }

    search() {

        // console.log(this.make);
        // console.log(this.model);
        // console.log(this.selectedRegion);
        // console.log(this.minYear);
        // console.log(this.maxYear);
        let make= (this.make || this.make != '')? $('#makeId').text():'';
        this.navCtrl.parent.parent.push(SearchResultsPage, {
            "make" : make,
            "model" : this.model,
            "region" : this.selectedRegion,
            "minYear" : this.minYear,
            "maxYear" : this.maxYear,
            "page":'search'
        });
    }
}