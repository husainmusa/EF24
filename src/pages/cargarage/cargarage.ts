import { GarageDetailPage } from '../garageDetail/garageDetail';
import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController,NavParams, AlertController, ModalController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { StepOnePage } from './../step-one/step-one';
import { HomePage } from '../../pages/home/home';
import { VehicleDamageModalPage } from '../../pages/vehicle-damage-modal/vehicle-damage-modal';
import { VehicleDetailsPage } from '../vehicleDetails/vehicleDetails';
import { StepThreePage } from '../step-three/step-three';
import { StepTwoPage } from '../step-two/step-two';

@Component({
  templateUrl: "cargarage.html",
  selector: "page-cargarage"
})

export class CarGaragePage {
  GarageDetailPage = GarageDetailPage;
  vehicleDetailsPage = VehicleDetailsPage;
    // baseUrl: string;
    //pageno = 1;
    // subUsers:any = [];
    currentPage = 1;
    totalPage = 0;
    totalData = 0;
    perPageData = 0;
    // actionType = "abc";

    isFavorite = false;
  vehicle: any;
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

   
    constructor(
      public navCtrl: NavController,
        public platform: Platform, 
        public actionSheetCtrl: ActionSheetController,
        public webService: WebService, 
        public translate: TranslateService,
        private cp: CurrencyPipe,
        public navParams: NavParams, 
        private alertCtrl: AlertController, 
        public modalController:ModalController,
         )
         
         {
            //this.pageno = 1;

            this.baseUrl = this.webService.baseUrl;
            this.vehicle = this.navParams.get("vehicle");
            this.actionType = this.navParams.get('actionType');
            console.log('actionType',this.actionType);
            if(this.actionType == "lbl_my_purchased_cars"){
              this.showCard = false;
              this.showCards = false;
              console.log('diviyaaaaa');
              console.log(this.actionType);
            }
        
            if(this.actionType == 'lbl_my_sold_cars'){
              this.showCard = false;
              this.showCards = false;
              console.log('diviyaaaaasold');
              console.log(this.actionType);
            }
        
            if(this.actionType == 'vehicles_in_auction'){
              this.showCard = false;
              console.log('diviya');
              console.log(this.actionType);
        
            }
        
            if(this.actionType == 'abc'){
              
              this.showCard = false;
              this.showCards = false;
              this.showCardauc = true;
              console.log('diviya');
              console.log(this.actionType);
        
            }
      
           
          
  
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad VehicleDetailsPage');
        this.webService.carsGarage(this.currentPage).subscribe(
          data => {

            console.log(data);

           if (data.success == true) {
              this.webService.hideLoading();
              //console.log("data.message");
            this.webService.presentToast(data.message);
             this.subUsers = data.data.vehicle_list;
             this.totalData = data.data.total_vehicle;
             this.perPageData = data.data.data_per_page;
             this.totalPage = data.data.total_pages;
            // console.log(data.data.vehicle_list[0].Vehicle.id);
             // window.localStorage.setItem('vehicle_temp_id',Vehicle.id);


              this.subUsers.forEach((element,index)=>{
                element.Vehicle.min_auction_price =this.cp.transform(element.Vehicle.min_auction_price , 'USD', true ,'1.2-2')
      
                  let pp = element.Vehicle.min_auction_price.replace(",", "'");
                  let mn = pp.split(".");
                  let ppg = mn[0] + ".-";
                  let oneMore = ppg.split("$");
                 // console.log("Final Formated Result : ",oneMore[1]);
                  element.Vehicle.min_auction_price = oneMore[1];
      

                 element.Vehicle.kilometers =this.cp.transform(element.Vehicle.kilometers , 'USD', true ,'1.2-2')

                    let pp7 = element.Vehicle.kilometers.replace(",", "'");
                    let mn7 = pp7.split(".");
                    let oneMore7 =  mn7[0].split("$");
                    //console.log("Final Formated Result : ",oneMore[1]);
                    element.Vehicle.kilometers = oneMore7[1];
      
                  element.Vehicle.buy_price =this.cp.transform(element.Vehicle.buy_price , 'USD', true ,'1.2-2')
      
                  let pp1 = element.Vehicle.buy_price.replace(",", "'");
                  let mn1 = pp1.split(".");
                  let ppg1 = mn1[0] + ".-";
                  let oneMore1 = ppg1.split("$");
                 console.log("Final Formated Result : ",oneMore1[1]);
                  element.Vehicle.buy_price = oneMore1[1];
      
                  if(element.max_bid_price != null ){
      
                    element.max_bid_price =this.cp.transform(element.max_bid_price , 'USD', true ,'1.2-2')
      
                    let ppmax = element.max_bid_price.replace(",", "'");
                    let mnmax = ppmax.split(".");
                    let ppgmax = mnmax[0] + ".-";
                    let oneMoremax = ppgmax.split("$");
                   // console.log("Final Formated Result : ",oneMoremax[1]);
                    element.max_bid_price = oneMoremax[1];
      
                  }
                });

               console.log('this.subUsers',this.subUsers)
         
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


    scrollInfinite(event) {
      this.currentPage += 1;
      setTimeout(() => {
        this.webService.carsGarage(this.currentPage).subscribe((data: any) => {
          // if(data.status == 404){

          //   this.webService.hideLoading();
          //   event.enable(false);
          //   console.log("winky");
          // }

          if (data.success == true) {
            this.webService.hideLoading();
            //console.log("data.message");
            this.webService.presentToast(data.message);
            this.totalPage = data.data.total_pages;
            this.perPageData = data.data.data_per_page;
           this.totalData = data.data.total_vehicle;
            console.log(data.total_vehicle);
            // console.log(data.data.offer_list[0].id);
            // console.log("here");
           // this.offers = data.data.offer_list;
            // this.buyerArr = data.data.buyerArr;
          
        
            for (let i = 0; i <= data.data.vehicle_list.length; i++) {
            this.subUsers.push(data.data.vehicle_list[i]);
           
            }
             // To complete scrolling event

             event.complete();
        
           }
            

         }),error => {
          alert("Error in loading data.")
          this.webService.hideLoading();
           event.complete();
          
        }
      }, 500);
  }

  



  openVehicleDetailsPage(SelectedVehicle:any) {

    console.log(SelectedVehicle);

    Array.isArray(SelectedVehicle.VehicleDoc) ? SelectedVehicle.VehicleDoc = SelectedVehicle.VehicleDoc :  SelectedVehicle.VehicleDoc = [];



   // console.log(this.actionType);

    
    //return
  
    this.navCtrl.push(VehicleDetailsPage, {
      vehicle: SelectedVehicle,
      actionType: this.actionType
    });
  }


  buyNowVehicle(vehicle:any) {

    console.log(vehicle);

    


    

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
          console.log(data);
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
    console.log('index', index);
}




  testCode(){

   // this.newAmount = +1;
    this.newAmount++;

  // console.log(this.newAmount);
    

    if(this.newAmount == 0){

      console.log(this.bidPriceList[0]);

      this.bidVehicle(this.bidPriceList[0]);

     // this.navCtrl.setRoot(HomePage);

    // this.ionViewDidLoad();
  
  // this.openBidModal();
     
    }

   

    if(this.newAmount == 1){

      console.log(this.bidPriceList[1]);
      this. bidVehicle(this.bidPriceList[1]);
    
    }

    if(this.newAmount == 2){

      console.log(this.bidPriceList[2]);
      this. bidVehicle(this.bidPriceList[2]);
    
    }

    if(this.newAmount == 3){

      console.log(this.bidPriceList[3]);
      this. bidVehicle(this.bidPriceList[3]);
   
    }

    if(this.newAmount == 4){

      console.log(this.bidPriceList[4]);
      this. bidVehicle(this.bidPriceList[4]);

     
    
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
          console.log(data);
          if (data.success == true) {
            this.webService.hideLoading();
            this.webService.presentToast(data.message);
            // this.navCtrl.setRoot(HomePage);
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
              console.log("Final Formated Result : ",oneMore[1]);
              this.vehicle.max_bid_price = oneMore[1];
  
  
  
              this.webService.presentToast(data.message);
              this.getBidPriceList();
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

  start(Vehicle,vd){
    console.log(Vehicle);
    if(vd.VehicleDoc.length <1){
      window.localStorage.setItem('vehicle_temp_id',Vehicle.id);
      this.navCtrl.push(StepTwoPage, {
        vehicle_temp_id : window.localStorage.getItem('vehicle_temp_id')
      });
    }else{
      window.localStorage.setItem('vehicle_temp_id',Vehicle.id);
      this.navCtrl.push(StepThreePage, {
        vehicle_temp_id : Vehicle.id
      });
    }
    
  }

  edit(Vehicle){
      window.localStorage.setItem('vehicle_temp_id',Vehicle.id);
      this.navCtrl.push(StepOnePage, {
      vehicle_temp_id : window.localStorage.getItem('vehicle_temp_id')
  });
  }
  edit2(Vehicle)
  {
    window.localStorage.setItem('vehicle_temp_id',Vehicle.id);
    this.navCtrl.push(StepTwoPage, {
      vehicle_temp_id : window.localStorage.getItem('vehicle_temp_id')
  });
  }

  makeFavourite(isFav) {
    let vehicleFav = isFav == 0 ? 1 : 0;

    this.webService.makeFavourite(this.vehicle.Vehicle.id, isFav).subscribe(
      data => {
        console.log(data);
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

  deleteVehicle( vehicleId, i ){


    let alert = this.alertCtrl.create({
      title: this.translate.instant('delete_vehicle'),
      message: this.translate.instant('delete_vehicle_confirm'),
      cssClass:'alertCustomWraper',
      buttons: [
        {
          text: this.translate.instant('lbl_cancel'),
          cssClass:'alertCustomBtnLeft',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.instant('lbl_delete'),
          cssClass:'alertCustomBtnRight',
          handler: () => {
            console.log('Delete clicked',i,vehicleId);

            this.webService.deleteVehicle(vehicleId).subscribe(
              data => {
                console.log(data);
                if (data.success == true) {
                  this.webService.hideLoading();
                  this.webService.presentToast(data.message);
                  // this.subUsers=this.subUsers.splice(i,1);
                  // this.navCtrl.setRoot(HomePage);
                  this.ionViewDidLoad();
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
      console.log(serverResponse);
      if(serverResponse.success){
        this.bidPriceList= serverResponse.data;
      }
      //this.bidPriceList= serverResponse
    },(Err)=>{
      console.log(Err);
    });
  }


  // openVehicleDetailsPage(SelectedVehicle:any) {

  //   console.log(SelectedVehicle);

  //   // Array.isArray(SelectedVehicle.VehicleDoc) ? SelectedVehicle.VehicleDoc = SelectedVehicle.VehicleDoc :  SelectedVehicle.VehicleDoc = [];



  //   //console.log(this.actionType);

    
  //   //return
  
  //   this.navCtrl.push(GarageDetailPage, {
  //     subUser: SelectedVehicle,
  //     // actionType: this.actionType
  //   });
  // }    


}

