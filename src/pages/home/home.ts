//import { SharedHeaderComponent } from './../../components/shared-header/shared-header';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, AlertController, AlertOptions,Platform } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { VehicleDetailsPage } from '../vehicleDetails/vehicleDetails';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';



@Component({
  templateUrl: "home.html",
  selector: "page-home"
  //providers: [SharedHeaderComponent]
})

export class HomePage {

  auctionData = [];
  sortBy = "";
  baseUrl: string;
  language: any;
  isSoldFired;
  constructor(
    public navCtrl: NavController, 
    private webService: WebService, 
    public translate: TranslateService, 
    public alertCtrl: AlertController,
    private cp: CurrencyPipe,
    public platform: Platform
    //public commonHeader: SharedHeaderComponent 
  ) {
    this.baseUrl = this.webService.baseUrl;
    //this.commonHeader.pageTitle = 'aniketpanchal';
    //this.language = 'fr';
    
    
  }

  ionViewDidLoad() {
  };

  ionViewDidEnter() {
    this.fetchAuctionList();
  };
  
  doRefresh(refresher:any){
    this.fetchAuctionList();
    refresher.complete();
  }

  ngOnInit() {
    //this.fetchAuctionList();
  };

  sortChanged(event) {
    //console.log(event);
    this.fetchAuctionList();
  }

  fetchAuctionList() {
    this.auctionData = [];
    this.webService.getAuctionList(this.sortBy).subscribe((data:any)=>{
      this.webService.hideLoading();
      if(data.success == true){
          this.isSoldFired=false;
          var auctionData = data.data.auction_data || [];
          var auctionDataLength = auctionData.length;
          let dt= new Date();
          let autionViewData = [];
          
          auctionData.forEach((element,index)=>{
            let auction_ovr_tym = element.Vehicle.time_diff || '';

            //element.isOver = !! (auction_ovr_tym == '0 00:00:00');
            // if(index==0)element.Vehicle.time_diff='0 00:00:10' 
              element.isOver = false;                 
              var DateDiffArray=element.Vehicle.time_diff.split(' ');
              var result = new Date();
              result.setDate(result.getDate() +parseInt(DateDiffArray[0].trim()));

              var timeArray=DateDiffArray[1].split(':');
              result.setHours(result.getHours() + parseInt(timeArray[0]));
              result.setMinutes (result.getMinutes() + parseInt(timeArray[1]));
              result.setSeconds(result.getSeconds() + parseInt(timeArray[2]));
              
              element.Vehicle.auction_ovr_tym=result;
              
              element.Vehicle.min_auction_price =this.cp.transform(element.Vehicle.min_auction_price , 'USD', "symbol" ,'1.2-2')
              let pp = element.Vehicle.min_auction_price.replace(",", "'");
              let mn = pp.split(".");
              let ppg = mn[0] + ".-";
              let oneMore = ppg.split("$");
              //console.log("Final Formated Result : ",oneMore[1]);
              element.Vehicle.min_auction_price = oneMore[1];
              element.Vehicle.kilometers =this.cp.transform(element.Vehicle.kilometers , 'USD', "symbol" ,'1.2-2')
              let pp7 = element.Vehicle.kilometers.replace(",", "'");
              let mn7 = pp7.split(".");
              let oneMore7 =  mn7[0].split("$");
              //console.log("Final Formated Result : ",oneMore[1]);
              element.Vehicle.kilometers = oneMore7[1];
              element.Vehicle.buy_price =this.cp.transform(element.Vehicle.buy_price , 'USD', "symbol" ,'1.2-2')
              let pp1 = element.Vehicle.buy_price.replace(",", "'");
              let mn1 = pp1.split(".");
              let ppg1 = mn1[0] + ".-";
              let oneMore1 = ppg1.split("$");
              //console.log("Final Formated Result : ",oneMore1[1]);
              element.Vehicle.buy_price = oneMore1[1];
              if(element.max_bid_price != null ){
                element.max_bid_price =this.cp.transform(element.max_bid_price , 'USD', "symbol" ,'1.2-2')
                let ppmax = element.max_bid_price.replace(",", "'");
                let mnmax = ppmax.split(".");
                let ppgmax = mnmax[0] + ".-";
                let oneMoremax = ppgmax.split("$");
               // console.log("Final Formated Result : ",oneMoremax[1]);
                element.max_bid_price = oneMoremax[1];
              }

              autionViewData.push(element);
              if(index == auctionDataLength-1){
                this.auctionData = autionViewData;
              }

             // console.log('auctionDataLength',auctionDataLength,'index',index)

          });



      }else{
        this.webService.presentToast(data.message);
      }

    },(err:any)=>{
        this.webService.hideLoading();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log('getAuctionList ERRROR:',err);
    });
  }

  fetchAuctionList__() {
   // this.webService.showLoading();
    this.webService.getAuctionList(this.sortBy).subscribe(
      (data:any) => {
        this.webService.hideLoading();
        if (data.success == true) {
          
          this.auctionData = data.data.auction_data;
          this.auctionData.forEach((element,index)=>{

            let dt= new Date();
            let dt2= new Date(element.Vehicle.auction_ovr_tym)
            
            if(dt.getTime() >= dt2.getTime()){
              element.isOver=true;
            }else{
              element.isOver=false;
            }
              element.VehicleImage.file_name 
              var DateDiffArray=element.Vehicle.time_diff.split(' ');
              var result = new Date();
              result.setDate(result.getDate() +parseInt(DateDiffArray[0].trim()));
              var timeArray=DateDiffArray[1].split(':');
              result.setHours(result.getHours() + parseInt(timeArray[0]));
              result.setMinutes (result.getMinutes() + parseInt(timeArray[1]));
              result.setSeconds(result.getSeconds() + parseInt(timeArray[2]));
              element.Vehicle.auction_ovr_tym=result;
              element.Vehicle.min_auction_price =this.cp.transform(element.Vehicle.min_auction_price , 'USD', true ,'1.2-2')
              let pp = element.Vehicle.min_auction_price.replace(",", "'");
              let mn = pp.split(".");
              let ppg = mn[0] + ".-";
              let oneMore = ppg.split("$");
              //console.log("Final Formated Result : ",oneMore[1]);
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
              //console.log("Final Formated Result : ",oneMore1[1]);
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
        } else {
          this.webService.presentToast(data.message);
        }
      }, err => {
        this.webService.hideLoading();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log(err);
      }
    );
  };

  openVehicleDetailsPage(selectedvehicle:any) {
    console.log(selectedvehicle);
      Array.isArray(selectedvehicle.VehicleDoc) ? selectedvehicle.VehicleDoc = selectedvehicle.VehicleDoc :  selectedvehicle.VehicleDoc = [];
        this.navCtrl.push(VehicleDetailsPage, {
          vehicle: selectedvehicle
        });
  }

  eventSold(ew){ 
    // console.log(ew,'eventSold',this.auctionData[ew]);  
    if(this.auctionData[ew]){  
      this.auctionData[ew].isOver = true;
    }
  }


}
