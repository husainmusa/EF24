import { Component,NgZone } from '@angular/core';
import { NavController,NavParams, Platform, LoadingController, ToastController, ActionSheetController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { WebService } from '../../providers/web-service';
import { StepThreePage } from '../step-three/step-three';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators , AbstractControl, ValidationErrors } from '@angular/forms';
import { formDirectiveProvider } from '@angular/forms/src/directives/ng_form';
import { Events } from 'ionic-angular';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
/**
 * Generated class for the StepTwoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-step-two',
  templateUrl: 'step-two.html',
})
export class StepTwoPage {
  StepTwoForm : FormGroup;

  lastImage: string = null;
  loading: Loading;
  orderBy: string;
  vehicleTempId: string = window.localStorage.getItem('vehicle_temp_id');
  radioValue: number;
  public photos = [];
  public imagePath: string = "assets/images/cars/";
  public docPath: string = "assets/images/cars/";
  public upload = [];
  public vehicleDocs: string;
  public isEdit = false;
  public docs = [];
  showCards: boolean = true;
  public alternativeImages = [] ;

  counter:any=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public toastCtrl: ToastController,
    private webService: WebService,
    public fb: FormBuilder,
    private imageResizer: ImageResizer,
    public zone:NgZone,
    public events: Events,
    public translate: TranslateService) 
  {
    events.subscribe('language:change',()=>{

    })
    if (this.vehicleTempId == null) {
      this.vehicleTempId = this.navParams.get('vehicle_temp_id');
    }

    if (window.localStorage.getItem('vehicle_temp_id') != null) {
      this.webService.getVehicleImages(window.localStorage.getItem('vehicle_temp_id')).subscribe(
        data => {
          console.log('herez')
          console.log(data); 


          if (data.success == true) {
            this.webService.loading.dismiss();
            this.webService.presentToast(data.message);

            if (Object.keys(data.data.vehicleImages).length > 0) {
              this.photos = data.data.vehicleImages;
             // this.photos.push({ id: null, imageUrl: this.imagePath + "upload-image.png" });
              this.isEdit = true;

              this.photos.forEach((element,index) => {
                if(element.imageUrl==null){
                  element.imageUrl= this.alternativeImages[index].imageUrl
                 // console.log(index);
                }else{
                  console.log('else.........',element.imageUrl);
                  this.counter=this.counter + 1;
                }
              });

            }else{

            }



            if (Object.keys(data.data.vehicleDocs).length > 0) {
              this.docs = data.data.vehicleDocs;
              this.docs.push({ id: null, imageUrl: this.docPath + "upload-doc.png" });
            }

            // if (Object.keys(data.data.vehicleImages).length > 0) {
            //   this.photos = data.data.vehicleImages.Vehicle;
            // }

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



//     this.StepTwoForm = this.fb.group({
//       //company_commercial_register : [1, Validators.compose([Validators.required])],
//       'company_CC' : [1], 
    
      
// });



// let formData =  this.StepTwoForm.value ;

// if(formData.company_CC == '0'){

//   console.log('data work');

//   this.showCards = false;
// }

 };

  getAllImages(){

    if (window.localStorage.getItem('vehicle_temp_id') != null) {
      this.webService.getVehicleImages(window.localStorage.getItem('vehicle_temp_id')).subscribe(
        data => {

          // console.log(data);


          if (data.success == true) {
            this.webService.loading.dismiss();
            this.webService.presentToast(data.message);

            if (Object.keys(data.data.vehicleImages).length > 0) {
              this.photos = data.data.vehicleImages;
             // this.photos.push({ id: null, imageUrl: this.imagePath + "upload-image.png" });
              this.isEdit = true;

              this.photos.forEach((element,index) => {
                if(element.imageUrl==null){
                  element.imageUrl= this.alternativeImages[index].imageUrl
                 // console.log(index);
                }
              });

            }else{

            }



            if (Object.keys(data.data.vehicleDocs).length > 0) {
              this.docs = data.data.vehicleDocs;
              this.docs.push({ id: null, imageUrl: this.docPath + "upload-doc.png" });
            }

            // if (Object.keys(data.data.vehicleImages).length > 0) {
            //   this.photos = data.data.vehicleImages.Vehicle;
            // }

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

    console.log(this.radioValue);

  };

  selected(value: string) {
    this.zone.run(()=>{
      this.orderBy = value;
    })
    

    if(this.orderBy == "orderBy2"){
      
      this.zone.run(()=>{
        this.showCards = false;
      })
    }else{
      this.zone.run(()=>{
        this.showCards = true;
      })
      
    }

    console.log(this.orderBy);
  }

 

  ngOnInit() {
    // this.photos = [
    //   this.imagePath + "1.png",
    //   this.imagePath + "2.png",
    //   this.imagePath + "3.png",
    //   this.imagePath + "4.png",
    //   this.imagePath + "5.png",
    //   this.imagePath + "6.png",
    //   this.imagePath + "7.png",
    //   this.imagePath + "8.png",
    //   this.imagePath + "9.png",
    //   this.imagePath + "10.png",
    //   this.imagePath + "11.png",
    //   this.imagePath + "12.png"
    // ];

    //if( this.isEdit == true ){
    this.photos = [
      { id: null, imageUrl: this.imagePath + "1.png" },
      { id: null, imageUrl: this.imagePath + "2.png" },
      { id: null, imageUrl: this.imagePath + "3.png" },
      { id: null, imageUrl: this.imagePath + "4.png" },
      { id: null, imageUrl: this.imagePath + "5.png" },
      { id: null, imageUrl: this.imagePath + "6.png" },
      { id: null, imageUrl: this.imagePath + "7.png" },
      { id: null, imageUrl: this.imagePath + "8.png" },
      { id: null, imageUrl: this.imagePath + "9.png" },
      { id: null, imageUrl: this.imagePath + "10.png" },
      { id: null, imageUrl: this.imagePath + "11.png" },
      { id: null, imageUrl: this.imagePath + "12.png" }
    ];

    this.alternativeImages=[
      { id: null, imageUrl: this.imagePath + "1.png" },
      { id: null, imageUrl: this.imagePath + "2.png" },
      { id: null, imageUrl: this.imagePath + "3.png" },
      { id: null, imageUrl: this.imagePath + "4.png" },
      { id: null, imageUrl: this.imagePath + "5.png" },
      { id: null, imageUrl: this.imagePath + "6.png" },
      { id: null, imageUrl: this.imagePath + "7.png" },
      { id: null, imageUrl: this.imagePath + "8.png" },
      { id: null, imageUrl: this.imagePath + "9.png" },
      { id: null, imageUrl: this.imagePath + "10.png" },
      { id: null, imageUrl: this.imagePath + "11.png" },
      { id: null, imageUrl: this.imagePath + "12.png" }
    ];
    //} else {

    //}

    //this.vehicleDocs = this.docPath + 'vehicle-docs.png';

    this.docs = [
      { id: null, imageUrl: this.docPath + "upload-doc.png" },
    ];

  }

  deletePhoto(index) {
    this.photos[index] = this.imagePath + index + ".png";
  }

  public askCameraOption(actionType, seqFile, fileId) {
    let actionSheet = this.actionSheetCtrl.create({
      title:this.translate.instant('lbl_select_image_source'),
      buttons: [
        {
          text: this.translate.instant('lbl_load_from_library'),
          handler: () => {
            this.takeActionPicture(this.camera.PictureSourceType.PHOTOLIBRARY, actionType, seqFile, fileId);
          }
        },
        {
          text:this.translate.instant('lbl_user_camera'),
          handler: () => {
            this.takeActionPicture(this.camera.PictureSourceType.CAMERA , actionType, seqFile, fileId);
            
          }
        },
        {
          text: this.translate.instant('lbl_cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  
  public validatedFile(imagePath,callback:any){
    let options = {
      uri: imagePath,
      folderName: 'EF24',
      quality: 90,
      width: 1280,
      height: 1280
     } as ImageResizerOptions;

    (<any>window).resolveLocalFileSystemURI(imagePath,(fileEntry:any)=>{

      fileEntry.file((fileObj:any)=>{       
        var fileType = fileObj.type  || "__UNKNOW__" ;  
        var sizeInMB = parseFloat((fileObj.size / (1024*1024)).toFixed(2));      

        console.log("Size = " , fileObj,'fileType',fileType);

        if(fileType.indexOf('image')!=-1){          
          if(sizeInMB>=5){            
              console.log('options',options);
              this.imageResizer.resize(options).then((filePath: string) =>{
                console.log('FilePath', filePath);
                callback(filePath);
              }).catch(e =>{
                callback(imagePath);
                console.log('resize Error',e);
              });
          }else{
            callback(imagePath);
          }
        }else{
          console.log("IN-VALID");
          callback(imagePath);
        }

      },(e:any)=>{
        callback(imagePath);
      });

    },(e:any)=>{      
      console.log('resolveLocalFileSystemURI ERRRO',e);
      callback(imagePath);
    })
  }
  //correctPath, currentName, this.createFileName(), seqFile, fileId,actionType
  private copyUploadedFileToLocalDir(namePath, currentName, newFileName, seq, imageId,actionType) {


    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        if(actionType=='VEHICLE'){
          this.lastImage = newFileName;
          this.photos[seq] = newFileName;
          this.uploadImage(newFileName, seq, imageId,2);
        }else{
          this.docs[seq] = newFileName;
          this.uploadImage(newFileName, seq, imageId,1);
          // this.uploadDocs(newFileName, seq, imageId);
        }
    }, error => {
      if(this.loading) this.loading.dismiss();
      this.presentToast( this.translate.instant('lbl_file_storing_error') );
    });



  }

  

  public takeActionPicture(sourceType,actionType, seqFile, fileId) {

    var cameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      //targetHeight :370,
      // targetWidth:490,
    };

    /*
              console.log('filePath',filePath)
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

              let tmp = imagePath.replace(correctPath,'');
    
              console.log('correctPath',correctPath)
              console.log('currentName',currentName)  
              console.log(tmp,'this.file.lastIndexOf',imagePath.substr(imagePath.lastIndexOf('/') + 1)) ;

              console.log('getImagePathWithName',this.getImagePathWithName(filePath));

              ELSE

              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    */
    if(sourceType>0)cameraOptions['allowEdit']=true;
    this.presentLoader();
    this.camera.getPicture(cameraOptions).then((capturedImage:any) => {
      console.log('capturedImage',capturedImage)
      let doAction=(imagePath:any)=>{
          console.log('doAction capturedImage',imagePath);
         
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath).then(filePath => {
              let imageInfo = this.getImagePathWithName(filePath);  
              this.copyUploadedFileToLocalDir(imageInfo.path, imageInfo.name, this.createFileName(), seqFile, fileId,actionType);
            })
          }else{
              let imageInfo = this.getImagePathWithName(imagePath);  
              this.copyUploadedFileToLocalDir(imageInfo.path, imageInfo.name,this.createFileName(), seqFile, fileId,actionType);
          }
      }

      this.validatedFile(capturedImage,doAction);

    },(err:any)=>{
      if(this.loading) this.loading.dismiss();
      this.presentToast( this.translate.instant('lbl_selecting_image_error') );
    })


  }//EOF takeActionPicture
  /**
   * name
   */
  public getImagePathWithName(imgStr:any) {
      let lastIndex = imgStr.lastIndexOf('/');
      let correctPath = imgStr.substr(0, lastIndex + 1);
      let imageTmp = imgStr.split('/');
      let imageName = imageTmp[imageTmp.length-1];
      if(imageName.indexOf('?')!=-1){
        imageName = imageName.split('?')[0];
      }
      return {
        name : imageName,
        path :correctPath
      };
  }

  public presentActionSheet(seq, imageId) {

    /*let actionSheet = this.actionSheetCtrl.create({
      title:this.translate.instant('lbl_select_image_source'),
      buttons: [
        {
          text: this.translate.instant('lbl_load_from_library'),
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, seq, imageId);
          }
        },
        {
          text:this.translate.instant('lbl_user_camera'),
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA , seq, imageId);
            
          }
        },
        {
          text: this.translate.instant('lbl_cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();*/

    this.askCameraOption('VEHICLE',seq, imageId);
    
  }



  public takePicture(sourceType, seq, imageId) {
    var options ;
    if(sourceType == 0){

      options = {
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG
      };

      

    }else{

      options = {
        quality: 50,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        allowEdit : true ,
        targetHeight :490,
        targetWidth:500,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG
      };

      

    }
   

    // console.log(options);

    this.camera.getPicture(options).then((imagePath) => {

      // console.log(imagePath);

      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            console.log('filePath',filePath);
            console.log('correctPath',correctPath);
            console.log('currentName',currentName);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), seq, imageId);
          });
      } else {

        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

        console.log(correctPath);
        
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), seq, imageId);
      }
    }, (err) => {
      this.presentToast( this.translate.instant('lbl_selecting_image_error') );
    });
  }

  next() {
    //this.uploadImage();
    //this.navCtrl.setRoot(StepThreePage);

    // console.log(this.photos);

    // this.photos.forEach((element)=>{
    //   if(element.id != null ){
    //     this.counter = this.counter + 1 ; 
    //   }
    // });

    console.log(this.counter);
    console.log('doc',this.orderBy,this.docs);
    let isDoc=false;
    this.docs.forEach((doc)=>{if(!isDoc){if(doc.id && doc.id!=null){ isDoc=true;}}});
    console.log('docsddd',isDoc,this.showCards);
    if(this.counter == 0 ){
      this.presentToast(this.translate.instant('lbl_select_image'));
    }
    else if(this.showCards && !isDoc){
      this.presentToast(this.translate.instant('lbl_select_doc'));
    }
    else{
      this.navCtrl.push(StepThreePage, {
        vehicle_temp_id: this.vehicleTempId
      });

    }

    

  }

  public uploadImage(image, seq, imageId,vehicle_img_type) {


    // Destination URL
    var url = this.webService.baseUrl + "api/uploadVehicleImageFile";
    //var url = this.webService.baseUrl + "api/uploadVehicleImages";
    // File for Upload
    var targetPath = this.pathForImage(image);
    // File name only
    var filename = image;
    var options = {
      fileKey: "data[VehicleDoc][image]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers :{language:window.localStorage.getItem('language')},
      params: { 'fileName': filename, 'vehicle_id': this.vehicleTempId, 'vehicle_img_id': imageId,'vehicle_img_type':vehicle_img_type }
    };
    const fileTransfer: TransferObject = this.transfer.create();
    fileTransfer.upload(targetPath, url, options).then(data => {
      if(this.loading) this.loading.dismiss();
      var responseData = JSON.parse(data.response);
      console.log('responseData',responseData);
      if (responseData.success == true) {
        if(vehicle_img_type==1){
          this.docs[seq] = { id: responseData.data.id, imageUrl: responseData.data.imageUrl  };
          let keepGoing = true;
          if (this.docs.length) {
            this.docs.forEach(element => {
              if (keepGoing) {
                if (element.id == null) {
                  keepGoing = false;
                }
              }
            });
          }
          if (keepGoing) {
            this.docs.push({ id: null, imageUrl: this.docPath + "upload-doc.png" });
          }
          this.presentToast( this.translate.instant('lbl_vehicle_document_uploaded_successfully') );
        }else{
          this.counter = this.counter + 1 ; 
          this.photos[seq] = { id: responseData.data.id, imageUrl: responseData.data.imageUrl ,   type:responseData.type };
          let keepGoing = true;
          if (this.photos.length) {
            this.photos.forEach(element => {
              if (keepGoing) {
                if (element.id == null) {
                  keepGoing = false;
                }
              }
            });
          }
          if (keepGoing) {
            this.isEdit = true;
          }
          this.presentToast( this.translate.instant('lbl_vehicle_image_upload_successfully') );
        }
      } else {
        this.getAllImages();
        this.presentToast(responseData.message);
      }
    }, err => {
      if(this.loading) this.loading.dismiss();
      this.presentToast( this.translate.instant('lbl_file_upload_error') );
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName, seq, imageId) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.photos[seq] = newFileName;

      this.uploadImage(newFileName, seq, imageId,2);

    }, error => {
      this.presentToast( this.translate.instant('lbl_file_storing_error') );
    });
  }

  private copyDocToLocalDir(namePath, currentName, newFileName, seq, docId) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      //this.vehicleDocs = newFileName;
      this.docs[seq] = newFileName;

      this.uploadDocs(newFileName, seq, docId);
    }, error => {
      this.presentToast( this.translate.instant('lbl_file_storing_error') );
    });
  }

  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad StepTwoPage');
  }


  presentActionSheetDoc(seq, docId) {
    /*let actionSheet = this.actionSheetCtrl.create({
      title: this.translate.instant('lbl_select_image_source'),
      buttons: [
        {
          text: this.translate.instant('lbl_load_from_library'),
          handler: () => {
            this.takeDocs(this.camera.PictureSourceType.PHOTOLIBRARY, seq, docId);
          }
        },
        {
          text: this.translate.instant('lbl_user_camera'),
          handler: () => {
            this.takeDocs(this.camera.PictureSourceType.CAMERA, seq, docId);
          }
        },
        {
          text: this.translate.instant('lbl_cancel'),
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();*/

    this.askCameraOption('VEHICLE_DOC',seq, docId);
  }

  takeDocs(sourceType, seq, docId) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imagePath) => {

      console.log(imagePath);
      // this.getFileSize(imagePath,res=>{
        // if(res<6){
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                
                this.copyDocToLocalDir(correctPath, currentName, this.createFileName(), seq, docId);
              });
          } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

            this.copyDocToLocalDir(correctPath, currentName, this.createFileName(), seq, docId);
          }
        // }else{
        //   this.presentToast( this.translate.instant('lbl_sie_konnen_beliebige') );
        // }
      // })
      
    }, (err) => {
      this.presentToast( this.translate.instant('lbl_selecting_image_error') );
    });
  }

  public uploadDocs(image, seq, docId) {


    // console.log("GGGGGGGGGGGGGG");
    // console.log(seq, docId);


    // Destination URL
    var url = this.webService.baseUrl + "api/uploadVehicleDocs";

    // File for Upload
    var targetPath = this.pathForImage(image);

    // File name only
    var filename = image;

    var options = {
      fileKey: "data[VehicleDoc][doc]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers :{language:window.localStorage.getItem('language')},
      params: { 'fileName': filename, 'vehicle_id': this.vehicleTempId, 'vehicle_img_id': docId }
    };

    // console.log(options);


    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: this.translate.instant('lbl_uploading'),
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    console.log(options,targetPath,url)
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismiss()
      var responseData = JSON.parse(data.response);

      console.log('data.response',data.response);
      if (responseData.success == true) {
        //this.vehicleDocs = responseData.data.imageUrl;

        this.docs[seq] = { id: responseData.data.id, imageUrl: responseData.data.imageUrl  };

        let keepGoing = true;
        if (this.docs.length) {
          this.docs.forEach(element => {
            if (keepGoing) {
              if (element.id == null) {
                keepGoing = false;
              }
            }
          });
        }
        if (keepGoing) {
          this.docs.push({ id: null, imageUrl: this.docPath + "upload-doc.png" });
        }
      this.presentToast( this.translate.instant('lbl_vehicle_document_uploaded_successfully') );
      } else {
      this.presentToast(responseData.message);
      }
    }, err => {
      this.loading.dismiss()
      this.presentToast( this.translate.instant('lbl_file_upload_error') );
    });
    //this.navCtrl.setRoot(StepThreePage);
  }

  deleteVehicleImage(vehicleImageId, index) {

    this.webService.deleteVehicleImage(vehicleImageId).subscribe(
      data => {

        // console.log(data);
        
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);

          this.photos[index] = { id: vehicleImageId , imageUrl:this.alternativeImages[index].imageUrl , type:0 }
          this.counter = this.counter - 1 ; 
          //this.photos.splice(index, 1);
          //delete this.photos[index] ;

          // this.photos = this.photos.filter(function (item, key) {
          //   return key !== index
          // });
        } else {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
        }
      },err => {
        this.webService.loading.dismiss();
        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
        console.log(err);
      }
    );
  }

  deleteVehicleDoc(vehicleDocId, index) {

    this.webService.deleteVehicleDoc(vehicleDocId).subscribe(
      data => {
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);

          this.docs = this.docs.filter(function (item, key) {
            return key !== index
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

  presentLoader(){
    this.loading = this.loadingCtrl.create({
      content: this.translate.instant('lbl_uploading'),
    });
    this.loading.present();
  }

}
