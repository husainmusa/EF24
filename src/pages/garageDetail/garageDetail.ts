import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController,NavParams, AlertController, ModalController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: "garageDetail.html",
  selector: "page-garageDetail"
})

export class GarageDetailPage {
  
    baseUrl: string;
    //pageno = 1;
    subUsers:any = [];
    currentPage = 1;
    totalPage = 0;
    totalData = 0;
    perPageData = 10;
    subUser: any;


   
    constructor(public navCtrl: NavController,
        public platform: Platform, 
        public actionSheetCtrl: ActionSheetController,
        public webService: WebService, 
         public translate: TranslateService,
         public navParams: NavParams, 
         private alertCtrl: AlertController, 
         public modalController:ModalController,
         
         
         )
         
         {

          this.subUser = this.navParams.get("subUser");
            //this.pageno = 1;

            // this.baseUrl = this.webService.baseUrl;
      

            // this.webService.carsGarage(this.currentPage).subscribe(
            //     data => {
          
            //       console.log(data);
          
            //      if (data.success == true) {
            //         this.webService.hideLoading();
            //         //console.log("data.message");
            //       this.webService.presentToast(data.message);
            //        this.subUsers = data.data.vehicle_list;
            //        this.totalData = data.data.total_vehicle;
            //         console.log(data.data.total_vehicle);
            //         // console.log(data.data.offer_list[0].id);
            //         // console.log("here");
            //        // this.offers = data.data.offer_list;
            //         // this.buyerArr = data.data.buyerArr;
            //       } else {
            //         this.webService.hideLoading();
            //         this.webService.presentToast(data.message);
            //       }
            //     },
            //     err => {
            //       this.webService.hideLoading();
            //       this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
            //       console.log(err);
            //     }
            //   );
          
  
    }


  

 


}