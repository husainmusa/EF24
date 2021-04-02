import { Component, Input, ComponentFactoryResolver } from '@angular/core';
import { App, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { StepOnePage } from '../step-one/step-one';
import { TranslateService } from '@ngx-translate/core';
  
/**
 * Generated class for the VehicleSearchModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-vehicle-search-modal',
  templateUrl: 'vehicle-search-modal.html',
})
export class VehicleSearchModalPage {

  //@Input() vehicleListData: any;
  public vehiclesData: any;
  vehicle: {
    model_num_key:string,
    brand: string,
    model: string,
    type: string,
    body_type: string,
    doors: string,
   // displacement: string,
    wheel_drive: string,
    gear: string,
    fuel: string,
    hp: string,
    kw: any,
    no_of_seats: string,
  //  first_reg: string,
  //  kilometers: number,
  //  exterior_color: string,
  //  interior_color: string,
  //  car_finish: string,
    additional_info: string,
  //  gen_condition: string,
  //  inspection: string,
    other_condition_eng: string,
    frame_no: string,
    model_no: string,
    reg_no: string,
    vehicle_no: string,
  //  swiss_car: boolean,
  //  vehicle_regions: string,
  // reg_document: string,
  //  service_record: string,
  //  no_of_keys: string,
  // is_damage: boolean,
  //  body_eng: string,
  //  body_deu: string,
  //  body_it: string,
  //  body_fr: string,
  //  repairs: string,
  //  mechanics_eng: string,
  //  mechanics_deu: string,
  //  mechanics_it: string,
  //  mechanics_fr: string,
  //  min_auction_price: number,
  //  auction_duration: number,
  //  buy_price: number,
  //  increase_with: number,
  //  transport_medium: string
  } = {
  model_num_key:"",
      brand: "",
      model: "",
      type: "",
      body_type: "",
      doors: "",
      //displacement: "",
      wheel_drive: "",
      gear: "",
      fuel: "",
      hp: "",
      kw: "",
      no_of_seats: "",
      //first_reg: "",
     // kilometers: 0,
     // exterior_color: "",
     // interior_color: "",
     // car_finish: "",
      additional_info: "",
     // gen_condition: "",
     // inspection: "",
      other_condition_eng: "",
      frame_no: "",
      model_no: "",
      reg_no: "",
      vehicle_no: "",
     // swiss_car: true,
     // vehicle_regions: "",
     // reg_document: "",
     // service_record: "",
     // no_of_keys: "",
     // is_damage: false,
     // body_eng: "",
     // body_deu: "",
     // body_it: "",
     // body_fr: "",
     // repairs: "",
     // mechanics_eng: "",
     // mechanics_deu: "",
     // mechanics_it: "",
     // mechanics_fr: "",
     // min_auction_price: 0,
     // auction_duration: 1,
     // buy_price: 0,
     // increase_with: 50,
     // transport_medium: ""
    };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewController: ViewController,
    private webService: WebService,
    public translate: TranslateService,
    private modalController:ModalController,
    public appCtrl: App
  ) {
    
  }

  selectVehicle(vehicleData:any){

    console.log("*****************************");
    console.log(vehicleData);
    console.log("*****************************");
    console.log(vehicleData.Marke);


    
    this.vehicle.brand = vehicleData.Marke ;
    this.vehicle.model = vehicleData.ModellEn;
    this.vehicle.type = vehicleData.ModellTypEn;
    
    this.vehicle.doors = vehicleData.Türen;
    this.vehicle.model_num_key = vehicleData.ModGrpKey;
    
    console.log("***********************");

    console.log(this.vehicle.model_num_key);
    console.log("***********************");
    this.vehicle.hp = vehicleData.PS;
    this.vehicle.kw = (vehicleData.PS)*0.735499;
    this.vehicle.no_of_seats = vehicleData.Plätze;




    if (vehicleData.Antrieb == '1' ) {
     
     this.vehicle.wheel_drive = 'Rear' ;
      
    }else if (vehicleData.Antrieb == '2' ) {
  
     this.vehicle.wheel_drive = 'Front' ;
      
    }else if (vehicleData.Antrieb == '4' ) {
     
     this.vehicle.wheel_drive = '4 Stroke' ;
      
    }else if (vehicleData.Antrieb == '5' ) {
    
      this.vehicle.wheel_drive = 'All-wheel' ;
      
    }else if (vehicleData.Antrieb == '9' ) {
     
     this.vehicle.wheel_drive = 'No stroke' ;
      
    }else{

       this.vehicle.wheel_drive = '' ;

    }
    

    
    
    if (vehicleData.Treibstoff == '1') {

     this.vehicle.fuel = 'Patrol' ;

    }else if (vehicleData.Treibstoff == '2') {
    
     this.vehicle.fuel = 'Petrol Cat' ;

    }else if (vehicleData.Treibstoff == '3' ) {
     
     this.vehicle.fuel = 'Diesel' ;

    }else if (vehicleData.Treibstoff == '4' ) {
     
     this.vehicle.fuel = 'Diesel Particle Filter' ;

    }else if (vehicleData.Treibstoff == '5' ) {
     
     this.vehicle.fuel = 'Gas/Petrol' ;

    }else if (vehicleData.Treibstoff == '6' ) {
     
     this.vehicle.fuel = 'Ethanol/Petro' ;

    }else if (vehicleData.Treibstoff == '7' ) {
    
     this.vehicle.fuel = 'Electric/Diesel' ;

    }else if (vehicleData.Treibstoff == '8' ) {
      
      this.vehicle.fuel = 'Electric' ;

    }else if (vehicleData.Treibstoff == '9') {
    
      this.vehicle.fuel = 'Hydrogen' ;

    }else{
     
     this.vehicle.fuel = '' ;

    }
    
    

    if (vehicleData.Aufbau == '1') {
     
     this.vehicle.body_type = 'Off-road vehicle/SUV';

    }else if (vehicleData.Aufbau == '3' ) {
    
     this.vehicle.body_type = 'Coupe';

    }else if (vehicleData.Aufbau == '4') {
   
     this.vehicle.body_type = 'Large capacity/van';

    }else if (vehicleData.Aufbau == '5') {
    
      this.vehicle.body_type = 'Station wagon';
      
    }else if (vehicleData.Aufbau == '6') {
      
      this.vehicle.body_type = 'Limousine';

    }else if (vehicleData.Aufbau == '7') {
   
     this.vehicle.body_type = 'Pick up';

    }else if (vehicleData.Aufbau == '8') {
      
      this.vehicle.body_type = 'Sports car';

    }else{
     
     this.vehicle.body_type = '';

    }
      
      
    /*Gear value*/
    if (vehicleData.Getriebe == '1') {

      this.vehicle.gear = 'Manuell';
      
    }else if (vehicleData.Getriebe == '2') {
    
       this.vehicle.gear = 'Mech.-Aut.';
      
    }else if (vehicleData.Getriebe == '5') {
    
       this.vehicle.gear = 'Automat';
      
    }else if (vehicleData.Getriebe == '6') {
      
       this.vehicle.gear = 'Stufenlos';

    }else{
      
      this.vehicle.gear = '';

    }










    //this.vehicle.first_reg = vehicleData.Brand;
    //this.vehicle.kilometers = vehicleData.Brand;
    //this.vehicle.exterior_color = vehicleData.Brand;
    //this.vehicle.interior_color = vehicleData.Brand;
    //this.vehicle.car_finish = vehicleData.Brand;
    //this.vehicle.additional_info = vehicleData.Brand;
    //this.vehicle.gen_condition = vehicleData.Brand;
    //this.vehicle.inspection = vehicleData.Brand;
    //this.vehicle.other_condition_eng = vehicleData.Brand;
    //this.vehicle.frame_no = vehicleData.Brand;
    //this.vehicle.model_no = vehicleData.Brand;

   // this.vehicle.reg_no = vehicleData.ModelNumber;
   // this.vehicle.vehicle_no = vehicleData.ModelNumber;

    //this.vehicle.swiss_car = vehicleData.Brand;
    //this.vehicle.vehicle_regions = vehicleData.Brand;
    //this.vehicle.reg_document = vehicleData.Brand;
    //this.vehicle.service_record = vehicleData.Brand;
    //this.vehicle.no_of_keys = vehicleData.Brand;
    //this.vehicle.is_damage = vehicleData.Brand;
    //this.vehicle.body_eng = vehicleData.Brand;
    //this.vehicle.body_deu = vehicleData.Brand;
    //this.vehicle.body_it = vehicleData.Brand;
    //this.vehicle.body_fr = vehicleData.Brand;
    //this.vehicle.repairs = vehicleData.Brand;
    //this.vehicle.mechanics_eng = vehicleData.Brand;
    //this.vehicle.mechanics_deu = vehicleData.Brand;
    //this.vehicle.mechanics_it = vehicleData.Brand;
    //this.vehicle.mechanics_fr = vehicleData.Brand;

  //  this.vehicle.min_auction_price = vehicleData.FactoryPrice;


    window.localStorage.removeItem('vehicle_temp_id');

    if( window.localStorage.getItem('vehicle_temp_id') != null ){
        //this.navCtrl.setRoot(StepOnePage);
        this.closeModal();
          setTimeout(()=>{
            this.appCtrl.getRootNav().push(StepOnePage, {
              vehicle_temp_id : window.localStorage.getItem('vehicle_temp_id')
          });
          },500);
        
    } else {
      console.log("**************************");
      console.log(this.vehicle);
      
      console.log("**************************");
        this.webService.addNewVehicle(this.vehicle).subscribe(
            data => {
                //console.log(data);
                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                    window.localStorage.setItem('vehicle_temp_id',data.data.vehicle_temp_id);
                    //this.navCtrl.setRoot(StepOnePage);
                    this.closeModal();
                      this.appCtrl.getRootNav().push(StepOnePage, {
                          vehicle_temp_id : window.localStorage.getItem('   xz')
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

  }

  ionViewDidLoad() {
    this.vehiclesData = this.navParams.get('vehicleListData');
  };

  closeModal() {
   // this.webService.loading.dismiss();
    this.viewController.dismiss();
  };

  selectedCar(vehicle : any){

    this.webService.showLoading();


    let data = vehicle.FzKey ;

    this.webService.getModelDetails(data).subscribe((serverResponse:any)=>{

      this.webService.hideLoading();

      console.log(serverResponse);

      if(serverResponse.Info.Status == 0 && serverResponse.Info.StatusMsg == "OK" ){
          this.selectVehicle(serverResponse.Fahrzeuge);
      }else{
        console.log("Correct data is not return !");
      }

    },(Err)=>{
      this.webService.hideLoading();
      console.log(Err);
    });



  };



 

}
