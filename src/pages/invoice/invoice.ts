import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Platform, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


/**
 * Generated class for the InvoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 @Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {

  invoiceData:Array<any>=[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private webService: WebService,
      private transfer: Transfer, 
      private toastCtrl: ToastController,
      public platform: Platform,
      private file: File, 
      public translate: TranslateService,
      private cp: CurrencyPipe)
      //public localNotifications: LocalNotifications)
      {
   
  }

  ngOnInit() {
    this.getInvoices();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  getInvoices(){
    this.webService.getInvoices().subscribe(
      data => {
        //console.log(data);
        this.webService.hideLoading();
        if (data.success == true) {          
          this.invoiceData = data.data.invoiceData;
          this.invoiceData.forEach(( element , index )=> {
            element.Vehicle.buy_price =this.cp.transform(element.Vehicle.buy_price , 'USD', "symbol" ,'1.2-2')
            let pp = element.Vehicle.buy_price.replace(",", "'");
            let mn = pp.split(".");
            let ppg = mn[0] + ".-";
            let oneMore = ppg.split("$");
            //console.log("Final Formated Result : ",oneMore[1]);
            element.Vehicle.buy_price = oneMore[1];
            element.biding_amount = oneMore[1];
          });
          // console.log(this.invoiceData);
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

  download(fileName, invoiceUrl) {
    // to load pdf and provide option to download.
    console.log(fileName,invoiceUrl);
    window.open(invoiceUrl,'_system');
    
    //Temporary Added
    //  this.webService.showLoading();
    //  const fileTransfer: TransferObject = this.transfer.create();
    //   fileTransfer.download(invoiceUrl, this.file.externalDataDirectory + fileName,true).then((entry) => {
    //    this.webService.hideLoading();
    //    //  this.localNotifications.schedule({
    //    //    text: 'Pdf Download Successfully',
    //    //    led: 'FF0000',
    //    //    sound: this.setSound(),
    //    //  });
    //    this.webService.presentToast( this.translate.instant('lbl_file_download_successfully') );
    //  }, (error) => {
    //    this.webService.hideLoading();
    //    this.webService.presentToast(this.translate.instant('lbl_unable_to_download_file') );
    //  });
    // }

  }

  presentToast(url,mssg) {
    let toast = this.toastCtrl.create({
      message: mssg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      window.open(url,'_system');
    });

    toast.present();
  }
}
