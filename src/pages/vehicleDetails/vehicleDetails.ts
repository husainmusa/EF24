import { StepOnePage } from './../step-one/step-one';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { HomePage } from '../../pages/home/home';
import { VehicleDamageModalPage } from '../../pages/vehicle-damage-modal/vehicle-damage-modal';
import { TranslateService } from '@ngx-translate/core';
//import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CurrencyPipe } from '@angular/common';
import { StepThreePage } from '../step-three/step-three';

@Component({
  templateUrl: "vehicleDetails.html",
  selector: "page-vehicledetails"
})

export class VehicleDetailsPage {
  isFavorite = false;
  vehicle: any={};
  public subUsers:any;
  bidArr: any;
  buyerArr: any;
  baseUrl: string;
  actionType: string;
  auctionData = [];
  sortBy = "";

  increaseWith: number;
  newAmount = -1;
  sellerId = window.localStorage.getItem('user_id');
  bidPriceList:any;
  showCard: boolean = true;
  showCards: boolean = true;
  showCardauc: boolean = false;
  vehicleDoc:Array<any>=[];
  showMinPrice : boolean  = true;
  showSoldPrice:boolean=false;

  test=[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public webService: WebService, 
    private alertCtrl: AlertController, 
    public modalController:ModalController,
    public translate: TranslateService,
    private cp: CurrencyPipe
    
    
  ) {

    //private photoViewer: PhotoViewer

    this.baseUrl = this.webService.baseUrl;
    this.vehicle = this.navParams.get("vehicle") || {};
    console.log('We------------>',this.vehicle);
    if(this.vehicle.VehicleDoc){
      this.vehicle.VehicleDoc.forEach(doc => {
        if(doc.file_name && doc.file_name!=''){
          this.vehicleDoc.push(doc);
        }
      });
    }

    
    this.actionType = this.navParams.get('actionType');
    //lbl_my_purchased_cars  vehicles_sold 

    this.showMinPrice = (this.actionType == "lbl_my_purchased_cars" || this.actionType == "vehicles_sold") ? false : true;

    if(this.actionType == "lbl_my_purchased_cars"){
      this.showCard = false;
      this.showCards = false;
     
      // console.log('diviyaaaaa');
      // console.log(this.actionType);
    }
    if(this.actionType == "favourite_vehicles"){
      this.showCard = false;
      this.showCards = false;
      
      // console.log('diviyaaaaa');
      // console.log(this.actionType);
    }

    if(this.actionType == 'lbl_my_sold_cars'){
      this.showCard = false;
      this.showCards = false;      
      // console.log('diviyaaaaasold');
      // console.log(this.actionType);
    }

    if(this.actionType == 'vehicles_in_auction'){
      this.showCard = false;
      // console.log('diviya');
      // console.log(this.actionType);
    }

    if(this.actionType == 'abc'){
      this.showCard = false;
      this.showCards = false;
      this.showCardauc = true;
      // console.log('diviya');showSoldPrice
      // console.log(this.actionType);
    }
    if(this.actionType == 'vehicles_sold'){
      this.showSoldPrice = true;
      // console.log('diviya');
      // console.log(this.actionType);
    }

   // console.log(this.vehicle);

  
   console.log('actionType',this.actionType,'this.showMinPrice',this.showMinPrice); 
    
    //this.sellerId = ;
    //console.log("current user: " + this.sellerId );

  
    // this.webService.getVehicleBids(this.vehicle.Vehicle.id).subscribe(
    //   data => {

    //     console.log(data);

      
    //     if (data.success == true) {
    //      this.webService.hideLoading();
    //       this.webService.presentToast(data.message);
    //       this.bidArr = data.data.bidDropDown;
    //       this.buyerArr = data.data.buyerArr;
    //     } else {
    //       this.webService.hideLoading();
    //       this.webService.presentToast(data.message);
    //     }
    //   },
    //   err => {
    //     this.webService.hideLoading();
    //     this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
    //     console.log(err);
    //   }
    // );


    this.webService.recentOffers(this.vehicle.Vehicle.id).subscribe(
      data => {

        // console.log(data);

       if (data.success == true) {
          this.webService.hideLoading();
          //console.log("data.message");
          this.webService.presentToast(data.message);
          this.subUsers = data.data.offer_list;

          this.subUsers.forEach(( element , index )=> {

            element.biding_amount =this.cp.transform(element.biding_amount , 'USD', true ,'1.2-2')

            // console.log("Recent Offer :", element.biding_amount);

            let pp = element.biding_amount.replace(",", "'");
            let mn = pp.split(".");
            let ppg = mn[0] + ".-";
            let oneMore = ppg.split("$");
           // console.log("Final Formated Result : ",oneMore[1]);
            element.biding_amount = oneMore[1];
          });

         

          // console.log(data.data);
          // console.log(data.data.offer_list[0].id);
          // console.log("here");
         // this.offers = data.data.offer_list;
          // this.buyerArr = data.data.buyerArr;
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


    this.webService.checkVehicleFavourite(this.vehicle.Vehicle.id).subscribe(
      data => {

        if (data.success == true) {
         // this.webService.hideLoading();
          this.webService.presentToast(data.message);
          this.isFavorite = data.data.is_favourite == '1' ? true : false;
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


    this.getBidPriceList();
    this.getInfo();

    
    window.localStorage.setItem('vehicle_temp_id',this.vehicle.Vehicle.id);

    // console.log(this.vehicle.Vehicle.id);

    
  }


  doRefresh(refresher:any){

    this.getBidPriceList();
  
    refresher.complete();
  
  }

  checkFavorite(){
    this.webService.checkVehicleFavourite(this.vehicle.Vehicle.id).subscribe(
      data => {

        if (data.success == true) {
         // this.webService.hideLoading();
          this.webService.presentToast(data.message);
          this.isFavorite = data.data.is_favourite == '1' ? true : false;
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
  }


  getInfo(){

    // let pp = this.vehicle.Vehicle.buy_price.replace(",", "'");
    // let mn = pp.split(".");
    // let ppg = mn[0] + ".-";
    // let oneMore = ppg.split("$");

    if (this.vehicle.Vehicle.buy_price == '0.-') {
        // this.showCard = false;  //removed add applied on single button in html
    }
    
    }

  buyNowVehicle(vehicle:any) {
    // console.log(vehicle);
    if(vehicle.bid_permission == 0){

      let alert = this.alertCtrl.create({
        title: 'Permission Denied',
        message: 'This is your own car.',
        cssClass:'alertCustomWraper',
        buttons: [
          {
            text: '',
            cssClass:'',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'CLOSE',
            cssClass:'alertCustomBtnLeft',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
        ]
      });
      alert.present();
    }else{
      this.webService.buyNow(vehicle.Vehicle).subscribe(
        data => {
          // console.log(data);
          if (data.success == true) {
            this.webService.hideLoading();
            this.webService.presentToast(data.message);
            this.navCtrl.setRoot(HomePage);
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
    }
  }

  openBidModal() {

    let alert = this.alertCtrl.create({
      title: this.translate.instant('lbl_bid'),
      buttons: [
        {
          text: this.translate.instant('lbl_cancel'),
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('lbl_bid'),
          handler: data => {
            this.bidVehicle(data);
          }
        }
      ]
    });

    let i = 0;
    for (const amount in this.bidPriceList) {
      var inputObj = { type: 'radio', label: 'CHF ' + this.bidPriceList[i], value: this.bidPriceList[i], checked: false };
      if (i == 0) {
        inputObj.checked = true;
      }
      alert.addInput(inputObj);
      i++;
    }

    alert.present();

  }

  getIndex(index) {
      // console.log('index', index);
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad VehicleDetailsPage');
    

  }

  testCode(){
    // this.newAmount = +1;
    this.newAmount++;
    console.log(this.newAmount);
    if(this.newAmount == 0){
      // console.log(this.bidPriceList[0]);
      this.bidVehicle(this.bidPriceList[0]);
      // this.navCtrl.setRoot(HomePage);
      // this.ionViewDidLoad();
      // this.openBidModal();  
    }

   

    if(this.newAmount == 1){

      // console.log(this.bidPriceList[1]);
      this. bidVehicle(this.bidPriceList[1]);
    
    }

    if(this.newAmount == 2){

      // console.log(this.bidPriceList[2]);
      this. bidVehicle(this.bidPriceList[2]);
    
    }

    if(this.newAmount == 3){

      // console.log(this.bidPriceList[3]);
      this. bidVehicle(this.bidPriceList[3]);
   
    }

    if(this.newAmount == 4){

      // console.log(this.bidPriceList[4]);
      this. bidVehicle(this.bidPriceList[4]);
    
    }
    if(this.newAmount > 4){
      this. bidVehicle(this.bidPriceList[1]);
    }
}



  

  bidVehicle(bidAmount) {

    console.log(this.vehicle.bid_permission);
    if(this.vehicle.bid_permission == 0){

      let alert = this.alertCtrl.create({
        title: 'Permission Denied',
        message: 'This is your own car.',
        cssClass:'alertCustomWraper',
        buttons: [
          {
            text: '',
            cssClass:'',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'CLOSE',
            cssClass:'alertCustomBtnLeft',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
        ]
      });
      alert.present();

    }else{

      this.webService.bidVehicle(this.vehicle.Vehicle.id, bidAmount).subscribe(
        data => {
          // console.log(data);
          this.checkFavorite();
          this.getBidPriceList();
          if (data.success == true) {
            this.webService.hideLoading();
            this.webService.presentToast(data.message);
            this.vehicle.Vehicle.min_auction_price=bidAmount;
          } else {
            if(data.data.status=='refresh'){
              this.webService.hideLoading();
              this.vehicle.max_bid_price = data.data.max_bid_price;
              this.newAmount = data.data.max_bid_price;
              let kk =this.cp.transform(data.data.max_bid_price , 'USD', true ,'1.2-2')
              let pp = kk.replace(",", "'");
              let mn = pp.split(".");
              let ppg = mn[0] + ".-";
              let oneMore = ppg.split("$");
              // console.log("Final Formated Result : ",oneMore[1]);
              this.vehicle.max_bid_price = oneMore[1];
              this.webService.presentToast(data.message);
              this.vehicle.Vehicle.min_auction_price=bidAmount;
            }else if(data.data.status=='buy_car'){
              this.webService.hideLoading();
              this.buyNowVehicle(this.vehicle);
            } else{
              this.webService.hideLoading();
              this.webService.presentToast(data.message);
            }
            
          }
        },
        err => {
          this.webService.hideLoading();
          this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
          console.log(err);
        }
      );

    }

    

  };

  start(){

    this.navCtrl.push(StepThreePage, {
      vehicle_temp_id : window.localStorage.getItem('vehicle_temp_id')
    });
  }

  edit(){

      this.navCtrl.push(StepOnePage, {
        vehicle_temp_id : window.localStorage.getItem('vehicle_temp_id')
      });
  }

  makeFavourite(isFav) {
    let vehicleFav = isFav == 0 ? 1 : 0;

    this.webService.makeFavourite(this.vehicle.Vehicle.id, isFav).subscribe(
      data => {
        // console.log(data);
        if (data.success == true) {
          this.webService.hideLoading();
          this.webService.presentToast(data.message);
          this.isFavorite = data.data.isFavourite == '1' ? true : false;
          //this.isFavorite = data.data.isFavourite;
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
  }

  openModal(imageUrl) {
    //this.photoViewer.show('{{baseUrl}}img/vehicledamage/orignal/{{imageUrl}}');
    //console.log(imageUrl);
    var data = { imageUrl : imageUrl };
    const modal = this.modalController.create(VehicleDamageModalPage, data);
    modal.present();
  }

  deleteVehicle( vehicleId ){
    let alert = this.alertCtrl.create({
      title: 'Delete Vechicle',
      message: 'Are you sure ?',
      cssClass:'alertCustomWraper',
      buttons: [
        {
          text: 'Cancel',
          cssClass:'alertCustomBtnLeft',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          cssClass:'alertCustomBtnRight',
          handler: () => {
            console.log('Delete clicked');

            this.webService.deleteVehicle(this.vehicle.Vehicle.id).subscribe(
              data => {
                // console.log(data);
                if (data.success == true) {
                  this.webService.hideLoading();
                  this.webService.presentToast(data.message);
                  this.navCtrl.setRoot(HomePage);
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
            
          }
        }
      ]
    });
    alert.present();

    
  }

  editVehicle(){
    window.localStorage.removeItem('vehicle_temp_id');
    this.navCtrl.push(StepOnePage, {
      vehicle_temp_id: this.vehicle.Vehicle.id
    });
  };

  getBidPriceList(){
    this.webService.getBidPrice(this.vehicle.Vehicle.id).subscribe((serverResponse:any)=>{
      // console.log(serverResponse);
      if(serverResponse.success){
        this.bidPriceList= serverResponse.data;
      }
      //this.bidPriceList= serverResponse
    },(Err)=>{
      console.log(Err);
    });
  }

  // getRecentOffers(){
  //   this.webService.getRecentOffers(this.vehicle.Vehicle.id).subscribe((serverResponse:any)=>{
  //     console.log(serverResponse);
  //     if(serverResponse.success){
  //       this.offers= serverResponse.data;
  //     }
  //     //this.bidPriceList= serverResponse
  //   },(Err)=>{
  //     console.log(Err);
  //   });
  // }


}
