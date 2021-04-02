import { Component , NgZone} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { StepOnePage } from '../step-one/step-one';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleSearchModalPage } from '../vehicle-search-modal/vehicle-search-modal';
import { TranslateService } from '@ngx-translate/core';
import { StepThreePage } from '../step-three/step-three';
import { StepTwoPage } from '../step-two/step-two';

import {AppConstaints} from '../../config/AppConstaints';

@Component({
    selector: 'page-addadvertisement',
    templateUrl: 'addAdvertisement.html'
})
export class AddAdvertisementPage {
    makes:any = [];
    make: any;
    models: any;
    model: any;
    monthYear: any;
    makeModel: any;
    minYear: any;
    first_registration: any;
    model_number: any;
    year: number;
    month: number;


    // Auto API

        brandList: any ;
        modelList : any ;
        allVehicleList : any ;

        markenId : any ;
        modelNumber : any ;

       
            cretificate:string;
            first_reg:string;
        
 

    // End


    AddAdvertisementSearchForm: FormGroup;
    AddAdvertisementDurationForm: FormGroup;
    public validation_messages: any;
    public validation_messages_duration: any;

    autoApiForm : FormGroup ;



    FormError = {
        'incorrect_certificate':null,
        'incorrect_registration':null,
        '__UNKNOWN__':null
    }
    constructor(public navCtrl: NavController, private webService: WebService, private storage: Storage,
         public fb: FormBuilder, public modalController: ModalController, private ngZone:NgZone,
         private appConstaints : AppConstaints,
          public translate: TranslateService ){
        let date = new Date();
        this.minYear = date.getFullYear() - 15;

        this.validation_messages = {
            'first_registration': [
                { type: 'required', message: this.translate.instant('lbl_first_registration_required') }
            ],
            'model_number': [
                { type: 'required', message: this.translate.instant('lbl_model_number_required') }
            ]
        };

        this.validation_messages_duration = {
            'year': [
                { type: 'required', message: this.translate.instant('lbl_year_required') }
            ],
            'month': [
                { type: 'required', message: this.translate.instant('lbl_month_required') }
            ],
            'make': [
                { type: 'required', message: this.translate.instant('lbl_make_required') }
            ],
            'model': [
                { type: 'required', message: this.translate.instant('lbl_model_required') }
            ]
        };

        this.AddAdvertisementSearchForm = this.fb.group({
            'first_registration': [null, Validators.compose([Validators.required])],
            'model_number': [null, Validators.compose([Validators.required])]
        });

        this.AddAdvertisementDurationForm = this.fb.group({
            'year': [null, Validators.compose([Validators.required])],
            'month': [null, Validators.compose([Validators.required])],
            'make': [null, Validators.compose([Validators.required])],
            'model': [null, Validators.compose([Validators.required])]
        });


        this.autoApiForm = this.fb.group({
            'vehicle_brand_list': [null, Validators.compose([Validators.required])],
            'vehicle_model_list': [null, Validators.compose([Validators.required])]
        });

        

    }

    search() {

       /* return false ;

        this.webService.getVehiclesByEuroTax(this.first_registration, this.model_number).subscribe(
            data => {
                if (data.success == true) {
                    var vehicleListData = { vehicleListData: data.data };
                    const modal = this.modalController.create(VehicleSearchModalPage, vehicleListData);
                    modal.present();

                } else {
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );*/
    }

    searchMake(value) {

     /*   return false ;

    
        this.month = value;
        this.makes = [];
        this.webService.getEuroMakes(this.year, this.month).subscribe(
            data => {
                //console.log(data.data);
                if (data) {
                    this.webService.loading.dismiss();
                    for(let key in data.data){
                        this.makes.push({
                          key: key,
                          name: data.data[key]
                        });
                      }
                      //console.log(this.makes);
                    //this.makes = data.data;
                } else {
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );*/
    }
     makeSelected(value) {
        /*return false ;
         //console.log(value);
         this.make = value;
         this.searchModel(this.make);
         //this.makes = [];*/
     }

    searchModel(makeId) {
      /*  return false ;
        this.models = [];
        if (makeId) {
            this.webService.getEuroModels(makeId, this.year, this.month).subscribe(
                data => {
                    //console.log(data);
                    if (data) {
                        this.webService.loading.dismiss();
                        for(let key in data.data){
                            this.models.push({
                              key: key,
                              name: data.data[key]
                            });
                          }

                        //this.models = data;
                    } else {
                        this.webService.presentToast(data.message);
                    }
                },
                err => {
                    this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                    console.log(err);
                }
            );
        } else {
            this.models = [];
        }*/
    }
    modelSelected(value) {
        /*return false ;
        this.model = value;
        //this.models = [];*/
    }

    searchVehicleByMakeModel(){

      /*  console.log("jadkasd asdkjadha asdkkadl akasdjk ");

        return false ;


        this.webService.getEuroVehicleByMakeModel(this.make, this.model, this.year, this.month).subscribe(
            data => {
                //console.log(data);
                if (data) {
                    this.webService.loading.dismiss();
                    var vehicleListData = { vehicleListData: data.data };
                    const modal = this.modalController.create(VehicleSearchModalPage, vehicleListData);
                    modal.present();
                } else {
                    this.webService.presentToast(data.message);
                }
            },
            err => {
                this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );*/
    }

    next() {

        window.localStorage.removeItem('vehicle_temp_id');

        if (window.localStorage.getItem('vehicle_temp_id') != null) {
            this.navCtrl.setRoot(StepTwoPage);
            // this.navCtrl.push(StepOnePage, {
            //     vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
            // });
        } else {

            this.webService.setTempVehicleId().subscribe(
                data => {
                    console.log(data);
                    if (data.success == true) {
                        this.webService.loading.dismiss();
                        this.webService.presentToast(data.message);
                        window.localStorage.setItem('vehicle_temp_id', data.data.id);
                        //this.navCtrl.setRoot(StepOnePage);
                        // this.navCtrl.push(StepOnePage, {
                        //     vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
                        // });

                          this.navCtrl.push(StepTwoPage, {
                            vehicle_temp_id: window.localStorage.getItem('vehicle_temp_id')
                        });
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
    };


      ionViewDidEnter() {
          console.log("From here call auto api : ");

          this.getBrandList();
          
      };



    // Auto Api 

    getBrandList(){

        this.webService.getBrandList().subscribe((response:any)=>{
          
        if( response.Info.Status == 0 && response.Info.StatusMsg =='OK' ){
            console.log("Auto Api barnd list :" , response );
            this.brandList = response.Marken ; 
          }else{
              console.log("Correct data is not return !");
          }
        },(Err)=>{
            console.log(Err);
          console.log(Err)
        });
  
      };

      getmodel(event:any){
        console.log(event);

        this.markenId = event ;
        this.getModelList(event);
      };
  
      getModelList(Id:any){

        this.webService.showLoading();
        let data=Id ;
  
        this.webService.getModleList(data).subscribe((response)=>{
  
          console.log(response);

          this.webService.hideLoading();

          if( response.Info.Status == 0 && response.Info.StatusMsg =='OK' ){
            console.log("Auto Api barnd list :" , response );
            this.modelList = response.ModellGruppen ; 


          }else{
              console.log("Correct data is not return !");
          }
  
        },(Err)=>{
            this.webService.hideLoading();
          console.log(Err);
        });
  
      };

      getallmodellist(event : any){

        console.log(event);

        this.modelNumber = event ;

      };

      getModelsList(){       
        let inputDateString = this.first_reg || "";
        let dateStr= inputDateString.split('-').reverse().join('/');
        
        this.webService.showLoading();
        for(let k in this.FormError)this.FormError[k]=null;

        this.webService.getAllModels(this.cretificate,dateStr).subscribe((response:any)=>{
            console.log('getAllModels',response);
            const isValidResponse = new Promise((resolve,reject)=>{
                let status = response && response.status ?  response.status : '__UNKNOWN__';
                let errorCode = response && response.error_key ?  response.error_key : '__UNKNOWN__';
                let infoSearch = response && response.data && response.data.Info ?  response.data.Info : {};
                let fahrzeugeData = response && response.data && response.data.Fahrzeuge ?  response.data.Fahrzeuge : [];
                if(status=="success"){
                    window.localStorage.setItem("certificate",this.cretificate);
                    window.localStorage.setItem("first_reg",this.first_reg);
                    
                    let vehicleListData = [];
                    let fahrzeugeDataLenth = fahrzeugeData.length ;
                    if(infoSearch.Status==0 && infoSearch.StatusMsg=='OK' && fahrzeugeDataLenth>0){                        
                        fahrzeugeData.forEach((item:any,i)=>{
                            let listObj= item;
                            listObj.Platze = item.Plätze;

                            listObj.Gange = this.translate.instant(['GEAR_TYPE_',item.Gänge].join('')) ;   
                            listObj.Treibstoff = this.translate.instant(['FUEL_TYPE_',item.Treibstoff].join('')) ;  
                           
                            vehicleListData.push(listObj);                           

                            if(i==fahrzeugeDataLenth-1){                                
                                resolve(vehicleListData);
                            }
                        })
                    }else{
                        console.log('getModelsList OVER',vehicleListData,'fahrzeugeDataLenth',fahrzeugeDataLenth)
                        resolve(vehicleListData);
                    }

                }else{  
                    reject(errorCode);
                }
                
            });
            isValidResponse.then((vehicleData:any)=>{
                this.webService.hideLoading(); 
                console.log('getModelsList RESOLVE ',vehicleData);
                if(vehicleData && vehicleData.length && vehicleData.length>0){                  
                    const modal = this.modalController.create(VehicleSearchModalPage, { vehicleListData: vehicleData });
                    modal.present();
                }else{
                    this.buildError('__UNKNOWN__'); 
                }
                
            }).catch((errorCode:any)=>{
                this.webService.hideLoading();                
                this.buildError(errorCode);
                console.log('getModelsList catch ',errorCode);
            })

        },(e:any)=>{
            this.buildError('__UNKNOWN__');
            this.webService.hideLoading(); 
        });

      }
      buildError(errorCode:any){
        this.ngZone.run(()=>{
            if(errorCode=='incorrect_certificate'){
                this.FormError['incorrect_certificate'] =  this.translate.instant('error_invalid_model');
            }
            if(errorCode=='incorrect_year'){
                this.FormError['incorrect_registration'] =  this.translate.instant('error_invalid_reg');
            }
            if(errorCode=='__UNKNOWN__'){
                this.FormError['__UNKNOWN__'] =  this.translate.instant('lbl_some_error_occured');
            }                    
        });
      }
      getModelsList__loc(){

        this.webService.showLoading();
        console.log(this.cretificate , this.first_reg );
        let newDate=this.first_reg.split("-");

        
        let NewDateString=newDate[1]+"/"+newDate[0];
       

        this.webService.getAllModels(this.cretificate,NewDateString).subscribe((response:any)=>{
            console.log(response);
 
            this.webService.hideLoading();
            if(response.status=="success")
            {
                window.localStorage.setItem("certificate",this.cretificate);
                window.localStorage.setItem("first_reg",this.first_reg);
            if( response.data.Info.Status == 0 && response.data.Info.StatusMsg =='OK' ){
                console.log("Auto Api all model list :" , response );

                  response.data.Fahrzeuge.forEach(element => {
                    console.log(element.Gänge);

                    element.Platze = element.Plätze;

                    if (element.Gänge == 1) {
                          let gear = "Manually";
                          element.Gange= gear;
                        } else if (element.Gänge == 2) {
                            let gear = "Mechanic";
                            element.Gange= gear;
                        } else if (element.Gänge == 5) {
                           let gear = "Automatic";
                            element.Gange= gear;
                        } else if (element.Gänge == 6) {
                            let gear = "Stepless";
                            element.Gange= gear;
                        }else {
                          let gear = "";
                          element.Gange= gear;
                        }


                        if (element.Treibstoff == 1) {
                            let fuel = "Patrol";
                            element.Treibstoff = fuel ;
						} else if (element.Treibstoff == 2) {
                            let fuel = "Petrol Cat";
                            
                            element.Treibstoff = fuel ;

						} else if (element.Treibstoff == 3) {
                            let fuel = "Diesel";
                            
                            element.Treibstoff = fuel ;

						} else if (element.Treibstoff == 4) {
                            let fuel = "Diesel Particle Filter";
                            
                            element.Treibstoff = fuel ;

						} else if (element.Treibstoff == 5) {
                            let fuel = "Gas/Petrol";
                            element.Treibstoff = fuel ;
						} else if (element.Treibstoff == 6) {
                            let fuel = "Ethanol/Petro";
                            
                            element.Treibstoff = fuel ;

						} else if (element.Treibstoff == 7) {
                            let fuel = "Electric/Diesel";
                            
                            element.Treibstoff = fuel ;

						} else if (element.Treibstoff == 8) {
                            let fuel = "Electric";
                            
                            element.Treibstoff = fuel ;

						} else if (element.Treibstoff == 9) {
                            let fuel = "Hydrogen";
                            
                            element.Treibstoff = fuel ;

						} else {
                            let fuel = "";
                            
                            element.Treibstoff = fuel ;
						}


                  });

                var vehicleListData : any = { vehicleListData: response.data.Fahrzeuge };
               // vehicleListData.brand = 
                const modal = this.modalController.create(VehicleSearchModalPage, vehicleListData);
                modal.present();
                
              }
            }
              else{
                  console.log("Correct data is not return !");
              }

        },(Err)=>{
            this.webService.hideLoading();
            console.log(Err)
        });

      };
  
      getModelDetails(){

        let data = this.autoApiForm.value  ;

        console.log(data);

    
        this.webService.getModelDetails(data.vehicle_model_list).subscribe((response)=>{
  
          console.log(response);
  
        },(Err)=>{
          console.log(Err);
        });
  
  
      };
  
      
      // End



}
