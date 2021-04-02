import { VehicleDetailsPage } from '../vehicleDetails/vehicleDetails';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  templateUrl: "searchResults.html",
  selector: "page-searchresults"
})

export class SearchResultsPage {
  vehicleDetailsPage = VehicleDetailsPage;
  title: String;
  subTitle: String;
  auctionData = [];
  favouriteData = [];
  myAuctionData = [];
  carsInGarage = [];
  currentPage = 1;
  totalPage = 0;
  totalData = 0;
  perPageData = 0;
  make = "";
  model = "";
  region = "";
  minYear = "";
  maxYear = "";
  bodyType = "";
  actionType: string;
  baseUrl:string;
  pagetype:any;
  isAcution=false;
  isProcessed=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebService, 
    public translate: TranslateService,private cp: CurrencyPipe) {
    this.baseUrl = this.webService.baseUrl;
    this.title = this.navParams.get('title') ? this.navParams.get('title') : 'lbl_search_result';
    console.log(this.title);
    this.subTitle = this.navParams.get('subTitle') ? this.navParams.get('subTitle') : null;


    //console.log(this.title); 

    this.make = this.navParams.get('make');
    this.model = this.navParams.get('model');
    this.region = this.navParams.get('region');
    this.minYear = this.navParams.get('minYear');
    this.maxYear = this.navParams.get('maxYear');
    this.bodyType = this.navParams.get('bodyType');
    this.pagetype = this.navParams.get('page');

  }

  ngOnInit() {
    this.isProcessed=false;
    if(this.subTitle == 'My Favourite Cars'){
      this.actionType = "favourite_vehicles";
      this.fetchFavouriteList();
    }else if(this.subTitle == "Cars in Auction"){
      this.actionType = "vehicles_in_auction";
      this.fetchMyVehicleAuctionList();
    }else if(this.subTitle == 'My Purchased Cars'){
      this.actionType = "lbl_my_purchased_cars";
      this.fetchMyPurchasedVehicleList();
    }else if(this.subTitle == "My Sold Cars"){
      this.actionType = "vehicles_sold";
      this.fetchMySellVehicleList();
    
 
    }else{
      this.actionType = "vehicles_in_auction";
      this.fetchAuctionList();
    } 
    console.log('this.actionType',this.actionType);
  }

  fetchAuctionList() {
    
    console.log('this.model',this.model);

    this.webService.getAuctionList("", this.make, this.model, this.region, this.minYear, this.maxYear, this.bodyType , this.pagetype  ).subscribe(
      data => {
        console.log(data);
        this.webService.hideLoading();
        this.isAcution=true;
        if (data.success == true) {
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

              autionViewData.push(element);
              if(index == auctionDataLength-1){
                this.auctionData = autionViewData;
              }
              
  
           });


        } else {
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

  fetchFavouriteList() {
    this.webService.getMyFavouriteVehicleList().subscribe(
      data => {
        this.isProcessed=true;
        console.log(data);
        this.webService.hideLoading();
        if (data.success == true) {
          this.favouriteData = data.data;
          // let formattedArray:Array<any>=[];

          // Object.keys(data.data).forEach(Key=>{
          //   formattedArray.push(data.data[Key]);
          // })

          // this.favouriteData= formattedArray;
          this.favouriteData.forEach((element,index)=>{
            if( element.VehicleImage==null || !("file_name" in element.VehicleImage))
              {
                // console.log("******");
                this.favouriteData[index].VehicleImage={file_name:null}; 
                // console.log(this.favouriteData[index]);
              }
            element.Vehicle.min_auction_price =this.cp.transform(element.Vehicle.min_auction_price , 'USD', true ,'1.2-2')
            element.Vehicle.min_auction_price=(element.Vehicle.min_auction_price==null)?"0":element.Vehicle.min_auction_price;
              let pp = element.Vehicle.min_auction_price.replace(",", "'");
              let mn = pp.split(".");
              let ppg = mn[0] + ".-";
              let oneMore = ppg.split("$");
              //console.log("Final Formated Result : ",oneMore[1]);
              element.Vehicle.min_auction_price = oneMore[1];
  

            element.Vehicle.kilometers =this.cp.transform(element.Vehicle.kilometers , 'USD', true ,'1.2-2')

            element.Vehicle.kilometers=(element.Vehicle.kilometers==null)?"0":element.Vehicle.kilometers;

            let pp7 = element.Vehicle.kilometers.replace(",", "'");
            let mn7 = pp7.split(".");
            let oneMore7 =  mn7[0].split("$");
            //console.log("Final Formated Result : ",oneMore[1]);
            element.Vehicle.kilometers = oneMore7[1];


              element.Vehicle.buy_price =this.cp.transform(element.Vehicle.buy_price , 'USD', true ,'1.2-2')
              
              element.Vehicle.buy_price=(element.Vehicle.buy_price==null)?"0":element.Vehicle.buy_price;
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
                //console.log("Final Formated Result : ",oneMoremax[1]);
                element.max_bid_price = oneMoremax[1];
  
              }
  
           });
        } else {
          this.webService.presentToast(data.message);
        }
      },
      err => {
        this.isProcessed=true;
        this.webService.hideLoading();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log(err);
      }
    );
  }

  fetchMyVehicleAuctionList() {
    this.auctionData = [];
    this.webService.getMyVehicleAuctionList().subscribe((data:any)=>{
      this.webService.hideLoading();
      this.isProcessed=true;
      if(data.success == true){
          var auctionData = data.data || [];
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

              autionViewData.push(element);
              if(index == auctionDataLength-1){
                this.myAuctionData = autionViewData;
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

  fetchMyVehicleAuctionList__() {
    this.webService.getMyVehicleAuctionList().subscribe(
      data => {
        this.isProcessed=true;
        // console.log(data);
        // console.log("car in auction");
        this.webService.hideLoading();
        if (data.success == true) {
          this.myAuctionData = data.data;

          this.myAuctionData.forEach((element,index)=>{
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
            //  console.log("Final Formated Result : ",oneMore1[1]);
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
      },
      err => {
        this.isProcessed=true;
        this.webService.hideLoading();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log(err);
      }
    );
  }

  fetchMyPurchasedVehicleList() {

   

    this.webService.getMyPurchasedVehicleList().subscribe(
      data => {
        // console.log(data);
        this.isProcessed=true;
        this.webService.hideLoading();

        if (data.success == true) {
          this.myAuctionData = data.data;

          this.myAuctionData.forEach((element,index)=>{
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
             // console.log("Final Formated Result : ",oneMore1[1]);
              element.Vehicle.buy_price = oneMore1[1];
  
              if(element.max_bid_price != null ){
  
                element.max_bid_price =this.cp.transform(element.max_bid_price , 'USD', true ,'1.2-2')
  
                let ppmax = element.max_bid_price.replace(",", "'");
                let mnmax = ppmax.split(".");
                let ppgmax = mnmax[0] + ".-";
                let oneMoremax = ppgmax.split("$");
                //console.log("Final Formated Result : ",oneMoremax[1]);
                element.max_bid_price = oneMoremax[1];
  
              }
              if(element.Vehicle.sold_price != null ){
  
                element.Vehicle.sold_price =this.cp.transform(element.Vehicle.sold_price , 'USD', true ,'1.2-2')
  
                let ppmaxe = element.Vehicle.sold_price.replace(",", "'");
                let mnmaxe = ppmaxe.split(".");
                let ppgmaxe = mnmaxe[0] + ".-";
                let oneMoremaxe = ppgmaxe.split("$");
               // console.log("Final Formated Result : ",oneMoremax[1]);
                element.Vehicle.sold_price = oneMoremaxe[1];
  
              } 
  
           });


        } else {
          this.webService.presentToast(data.message);
        }
      },
      err => {
        this.isProcessed=true;
        this.webService.hideLoading();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log(err);
      }
    );
  }

  fetchMySellVehicleList() {
    this.webService.getMySellVehicleList().subscribe(
      data => {
        // console.log(data);
        this.isProcessed=true;
        this.webService.hideLoading();        
        if (data.success == true) {
          this.myAuctionData = data.data;

          this.myAuctionData.forEach((element,index)=>{
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
             // console.log("Final Formated Result : ",oneMore1[1]);
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

              if(element.Vehicle.sold_price != null ){
  
                element.Vehicle.sold_price =this.cp.transform(element.Vehicle.sold_price , 'USD', true ,'1.2-2')
  
                let ppmaxe = element.Vehicle.sold_price.replace(",", "'");
                let mnmaxe = ppmaxe.split(".");
                let ppgmaxe = mnmaxe[0] + ".-";
                let oneMoremaxe = ppgmaxe.split("$");
               // console.log("Final Formated Result : ",oneMoremax[1]);
                element.Vehicle.sold_price = oneMoremaxe[1];
  
              }
  
           });


        } else {
          this.webService.presentToast(data.message);
        }
      },
      err => {
        this.isProcessed=true;
        this.webService.hideLoading();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log(err);
      }
    );
  }

  openVehicleDetailsPage(SelectedVehicle:any) {

    // console.log(SelectedVehicle);

    Array.isArray(SelectedVehicle.VehicleDoc) ? SelectedVehicle.VehicleDoc = SelectedVehicle.VehicleDoc :  SelectedVehicle.VehicleDoc = [];



    console.log(this.actionType);

    
    //return
  
    this.navCtrl.push(VehicleDetailsPage, {
      vehicle: SelectedVehicle,
      actionType: this.actionType
    });
  }

  eventSold(ew){ 
    // console.log(ew,'eventSold',this.auctionData[ew]);  
    if(this.auctionData[ew]){  
      this.auctionData[ew].isOver = true;
    }
  }
}