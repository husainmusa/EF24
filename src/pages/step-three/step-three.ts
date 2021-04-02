import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { PreviewVehiclePage } from '../preview-vehicle/preview-vehicle';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
/**
 * Generated class for the StepThreePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-step-three',
  templateUrl: 'step-three.html',
})
export class StepThreePage {

  isActivate = false;
  vehicle: {
    min_auction_price:number ,
    auction_duration: number,
    buy_price: number,
    increase_with: number,
    transport_medium: string
  } = {
      min_auction_price: null,
      auction_duration: 0,
      buy_price: null,
      increase_with: 25.00,
      transport_medium: null
    };

    Step3Form: FormGroup;
    public validation_messages: any;
    minPrice:number=0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private webService: WebService, 
    public fb: FormBuilder,
    public events: Events,
    public translate: TranslateService
  ) {
    if( window.localStorage.getItem('vehicle_temp_id') == null ){
      window.localStorage.setItem('vehicle_temp_id', this.navParams.get('vehicle_temp_id'));
    }

    if (window.localStorage.getItem('vehicle_temp_id') != null) {
      this.webService.getVehicleByTempId(window.localStorage.getItem('vehicle_temp_id')).subscribe(
        data => {
          if (data.success == true) {
            this.webService.loading.dismiss();
            this.webService.presentToast(data.message);

            if (Object.keys(data.data.vehicleData).length > 0) {
              data.data.vehicleData.Vehicle.increase_with = 50.00 ;
              this.vehicle = data.data.vehicleData.Vehicle;

              console.log("All increse data :" , data.data.vehicleData);

               var increaseWith = parseInt(data.data.vehicleData.Vehicle.increase_with);
               this.vehicle.increase_with = increaseWith || 50.00;
            }

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
    }
    events.subscribe('language:change',()=>{

      this.validation_messages = {
        'vehicle_min_auction_price': [
          { type: 'required', message: this.translate.instant('lbl_minimum_price_required') },
          { type: 'number', message: this.translate.instant('lbl_minimum_price_numeric') }
        ],
        'vehicle_auction_duration': [
          { type: 'required', message: this.translate.instant('lbl_auction_duration_required') }
        ],
        // 'vehicle_buy_price': [
          // { type: 'required', message: this.translate.instant('lbl_buy_now_price_required') },
         // { type: 'number', message: this.translate.instant('lbl_buy_now_price_numeric') }
        // ],
        'vehicle_increase_with': [
          { type: 'required', message: this.translate.instant('lbl_increase_with_required') }
        ],
        'vehicle_transport_medium': [
          { type: 'required', message: this.translate.instant('lbl_to_be_transported_required') }
        ]
      };
    })


    this.validation_messages = {
      'vehicle_min_auction_price': [
        { type: 'required', message: this.translate.instant('lbl_minimum_price_required') },
        { type: 'number', message: this.translate.instant('lbl_minimum_price_numeric') }
      ],
      'vehicle_auction_duration': [
        { type: 'required', message: this.translate.instant('lbl_auction_duration_required') }
      ],
      // 'vehicle_buy_price': [
        // { type: 'required', message: this.translate.instant('lbl_buy_now_price_required') },
       // { type: 'number', message: this.translate.instant('lbl_buy_now_price_numeric') }
      // ],
      'vehicle_increase_with': [
        { type: 'required', message: this.translate.instant('lbl_increase_with_required') }
      ],
      'vehicle_transport_medium': [
        { type: 'required', message: this.translate.instant('lbl_to_be_transported_required') }
      ]
    };

    this.Step3Form = this.fb.group({
      'vehicle_min_auction_price': [this.vehicle.min_auction_price, Validators.compose([Validators.required])],
      'vehicle_auction_duration': [0, Validators.compose([Validators.required])],
       //'vehicle_buy_price': [this.vehicle.buy_price],
       'vehicle_buy_price': [null],
      'vehicle_increase_with': [50.00],
      'vehicle_transport_medium': [null, Validators.compose([Validators.required])]
    });


  //   this.Step3Form.get('vehicle_buy_price').valueChanges
  //   .subscribe(value => {
  //     if(value) {
  //       this.Step3Form.get('vehicle_buy_price').setValidators(Validators.required)
  //     } else {
  //       this.Step3Form.get('vehicle_buy_price').clearValidators();
  //     }

  //      this.Step3Form.get('vehicle_buy_price').updateValueAndValidity();
  //   }
  // )    ;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepThreePage');
    console.log('this.vehicle',this.vehicle)
  }

  addVehicle() {
    this.isActivate = true;
    console.log(this.vehicle);
    this.webService.activateVehicle(this.vehicle, this.isActivate).subscribe(
      data => {
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
          window.localStorage.removeItem('vehicle_temp_id'); 
          this.navCtrl.setRoot(HomePage);
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
  }

  previewVehicle() {

    this.isActivate = false;
    this.webService.activateVehicle(this.vehicle, this.isActivate).subscribe(
      data => {
        //console.log('Activate vehicle');
        //console.log(data);
        if (data.success == true) {
          this.webService.loading.dismiss();
          //this.webService.presentToast(data.message);
          //this.navCtrl.setRoot(PreviewVehiclePage);

          this.navCtrl.push(PreviewVehiclePage, {
            vehicle_temp_id : window.localStorage.getItem('vehicle_temp_id')
          });

          //this.navCtrl.setRoot(PreviewVehiclePage);
          // this.navCtrl.push(PreviewVehiclePage, {
          //    vehicleId: window.localStorage.getItem('vehicle_temp_id')
          //  });

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

  changeto(){

    let data= this.Step3Form.value;
    let val = parseInt(data.vehicle_min_auction_price)

    this.vehicle.min_auction_price = val;
    this.minPrice=val;
    console.log('buy now',this.vehicle.buy_price,this.vehicle.min_auction_price,this.minPrice)

  };

  changetoActual(){

    let data= this.Step3Form.value;

    let val = parseInt(data.vehicle_buy_price)

    this.vehicle.buy_price = val;

    console.log('buy now',this.vehicle.buy_price,this.vehicle.min_auction_price,this.minPrice)

  }

}
