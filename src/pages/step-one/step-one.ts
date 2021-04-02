import { Component ,NgZone} from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ToastController, ActionSheetController, Loading } from 'ionic-angular';
import { StepTwoPage } from '../step-two/step-two';
import { WebService } from '../../providers/web-service';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { StepThreePage } from '../step-three/step-three';
import { Events } from 'ionic-angular';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
import { CarGaragePage } from '../cargarage/cargarage';
/**
 * Generated class for the StepOnePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-step-one',
  templateUrl: 'step-one.html',
})
export class StepOnePage {
  

  hideDamage: boolean = true;
  bodyMultiLingual: boolean = true;
  mechanicsMultiLingual: boolean = true;
  hideDamages: boolean = true;
  bodyMultiLinguals: boolean = true;
  current_date_time : any;
  today : any;
  min_date:any;
  max_date:any = "2100" ;
  lastImage: string = null;
  loading: Loading;
  public photos: any;
  public base64Image: string;
  public imagePath: string = "assets/images/cars/";

  Step1Form: FormGroup;
  public validation_messages: any;

  vehicle: {
    brand: string,
    model: string,
    type: string,
    body_type: string,
    doors: string,
    displacement: string,
    wheel_drive: string,
    gear: string,
    fuel: string,
    hp: any,
    kw: any,
    no_of_seats: string,
    first_reg: string,
    kilometers: any,
    exterior_color: string,
    interior_color: string,
    car_finish: string,
    additional_info: string,
    gen_condition: string,
    inspection: string,
    other_condition_eng: string,
    other_body_deu: string,
    other_body_it: string,
    other_body_fr: string,
    frame_no: string,
    model_no: string,
    reg_no: string,
    vehicle_no: string,
    swiss_car: any,
    vehicle_regions: string,
    reg_document: string,
    service_record: string,
    no_of_keys: string,
    is_damage: boolean,
    body_eng: string,
    body_deu: string,
    body_it: string,
    body_fr: string,
    repairs: string,
    mechanics_eng: string,
    mechanics_deu: string,
    mechanics_it: string,
    mechanics_fr: string
  } = {
      brand: "",
      model: "",
      type: "",
      body_type: "",
      doors: "",
      displacement: "",
      wheel_drive: "",
      gear: "",
      fuel: "",
      hp: 0,
      kw: 0,
      no_of_seats: "",
      first_reg: "",
      kilometers: null ,
      exterior_color: "",
      interior_color: "",
      car_finish: "",
      additional_info: "",
      gen_condition: "",
      inspection: "",
      other_condition_eng: "",
      other_body_deu: "",
      other_body_it: "",
      other_body_fr: "",
      frame_no: "",
      model_no: "",
      reg_no: "",
      vehicle_no: "",
      swiss_car: true,
      vehicle_regions: "",
      reg_document: "",
      service_record: "",
      no_of_keys: "",
      is_damage: false,
      body_eng: "",
      body_deu: "",
      body_it: "",
      body_fr: "",
      repairs: "",
      mechanics_eng: "",
      mechanics_deu: "",
      mechanics_it: "",
      mechanics_fr: ""
    };

  vehicleDamage: {
    bottomside: any,
    leftside: any,
    topside: any,
    rightside: any,
    backside: any,
    bottomsideId: number,
    leftsideId:number,
    topsideId: number,
    rightsideId: number,
    backsideId: number,

  } = {
      bottomside: this.imagePath + 'front.png',
      leftside: this.imagePath + 'left.png',
      topside: this.imagePath + 'top.png',
      rightside: this.imagePath + 'right.png',
      backside: this.imagePath + 'back.png',
      bottomsideId: null,
      leftsideId:null,
      topsideId: null,
      rightsideId: null,
      backsideId: null,
    };

    reginList : any ;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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
    public zone:NgZone,
    private imageResizer: ImageResizer,
    public events: Events,
    public translate: TranslateService
  ) {

    events.subscribe('language:change',()=>{
      this.validation_messages = {
        'vehicle_brand': [
          { type: 'required', message: this.translate.instant('lbl_vehicle_brand_required') }
        ],
        'vehicle_model': [
          { type: 'required', message: this.translate.instant('lbl_vehicle_model_required') }
        ],
        'vehicle_body_type': [
          { type: 'required', message: this.translate.instant('lbl_body_type_required')  }
        ],
        'vehicle_doors': [
          { type: 'required', message: this.translate.instant('lbl_door_required') }
        ],
        'vehicle_wheel_drive': [
          { type: 'required', message: this.translate.instant('lbl_wheel_drive_required') }
        ],
        'vehicle_gear': [
          { type: 'required', message: this.translate.instant('lbl_gear_required') }
        ],
        'vehicle_fuel': [
          { type: 'required', message: this.translate.instant('lbl_fuel_required') }
        ],
        'vehicle_hp': [
          { type: 'required', message: this.translate.instant('lbl_hp_required') }
        ],
        'vehicle_kw': [
          { type: 'required', message: this.translate.instant('lbl_kw_required') }
        ],
        'vehicle_first_reg': [
          { type: 'required', message: this.translate.instant('lbl_1st_reg_required') }
        ],
        'vehicle_kilometers': [
          { type: 'required', message: this.translate.instant('lbl_kilometers_required') }
        ],
        'vehicle_exterior_color': [
          { type: 'required', message: this.translate.instant('lbl_exterior_color_required') }
        ],
        'vehicle_interior_color': [
          { type: 'required', message: this.translate.instant('lbl_interior_color_required') }
        ],
        'vehicle_vehicle_regions': [
          { type: 'required', message: this.translate.instant('lbl_vehicle_region_required') }
        ],
        'vehicle_no_of_keys': [
          { type: 'required', message: this.translate.instant('lbl_number_of_keys_required') }
        ]
      
      };
    })
    this.validation_messages = {
      'vehicle_brand': [
        { type: 'required', message: this.translate.instant('lbl_vehicle_brand_required') }
      ],
      'vehicle_model': [
        { type: 'required', message: this.translate.instant('lbl_vehicle_model_required') }
      ],
      'vehicle_body_type': [
        { type: 'required', message: this.translate.instant('lbl_body_type_required')  }
      ],
      'vehicle_doors': [
        { type: 'required', message: this.translate.instant('lbl_door_required') }
      ],
      'vehicle_wheel_drive': [
        { type: 'required', message: this.translate.instant('lbl_wheel_drive_required') }
      ],
      'vehicle_gear': [
        { type: 'required', message: this.translate.instant('lbl_gear_required') }
      ],
      'vehicle_fuel': [
        { type: 'required', message: this.translate.instant('lbl_fuel_required') }
      ],
      'vehicle_hp': [
        { type: 'required', message: this.translate.instant('lbl_hp_required') }
      ],
      'vehicle_kw': [
        { type: 'required', message: this.translate.instant('lbl_kw_required') }
      ],
      'vehicle_first_reg': [
        { type: 'required', message: this.translate.instant('lbl_1st_reg_required') }
      ],
      'vehicle_kilometers': [
        { type: 'required', message: this.translate.instant('lbl_kilometers_required') }
      ],
      'vehicle_exterior_color': [
        { type: 'required', message: this.translate.instant('lbl_exterior_color_required') }
      ],
      'vehicle_interior_color': [
        { type: 'required', message: this.translate.instant('lbl_interior_color_required') }
      ],
      'vehicle_vehicle_regions': [
        { type: 'required', message: this.translate.instant('lbl_vehicle_region_required') }
      ],
      'vehicle_no_of_keys': [
        { type: 'required', message: this.translate.instant('lbl_number_of_keys_required') }
      ]
    
    };

     
      this.Step1Form = this.fb.group({
      'vehicle_brand': [ this.vehicle.brand , Validators.compose([Validators.required])],
      'vehicle_model': [this.vehicle.model, Validators.compose([Validators.required])],
      'vehicle_type': [this.vehicle.type],
      'vehicle_body_type': [this.vehicle.body_type, Validators.compose([Validators.required])],
      'vehicle_doors': [this.vehicle.doors, Validators.compose([Validators.required])],
      //'vehicle_displacement': [this.vehicle.displacement],
      'vehicle_wheel_drive': [this.vehicle.wheel_drive, Validators.compose([Validators.required])],
      'vehicle_gear': [this.vehicle.gear, Validators.compose([Validators.required])],
      'vehicle_fuel': [this.vehicle.fuel, Validators.compose([Validators.required])],
      'vehicle_hp': [this.vehicle.hp, Validators.compose([Validators.required])],
      'vehicle_kw': [this.vehicle.kw, Validators.compose([Validators.required])],
      'vehicle_no_of_seats': [this.vehicle.no_of_seats],
      'vehicle_first_reg': [this.vehicle.first_reg, Validators.compose([Validators.required])],
      'vehicle_kilometers': [ this.vehicle.kilometers, Validators.compose([Validators.required  ])],
      'vehicle_exterior_color': [this.vehicle.exterior_color, Validators.compose([Validators.required])],
      'vehicle_interior_color': [this.vehicle.interior_color, Validators.compose([Validators.required])],
      'vehicle_car_finish': [this.vehicle.car_finish],
      'vehicle_additional_info': [this.vehicle.additional_info],
      'vehicle_gen_condition': [this.vehicle.gen_condition],
      'vehicle_inspection': [this.vehicle.inspection],
      'vehicle_other_condition_eng': [this.vehicle.other_condition_eng],
      'vehicle_other_body_deu': [this.vehicle.other_body_deu],
      'vehicle_other_body_it': [this.vehicle.other_body_it],
      'vehicle_other_body_fr': [this.vehicle.other_body_fr],
      'vehicle_frame_no': [this.vehicle.frame_no],
      'vehicle_model_no': [this.vehicle.model_no],
      'vehicle_reg_no': [this.vehicle.reg_no],
      'vehicle_vehicle_no': [this.vehicle.vehicle_no],
      'vehicle_swiss_car': [ this.vehicle.swiss_car],
      'vehicle_vehicle_regions': [this.vehicle.vehicle_regions, Validators.compose([Validators.required])],
      'vehicle_reg_document': [this.vehicle.reg_document],
      'vehicle_service_record': [this.vehicle.service_record],
      'vehicle_no_of_keys': [this.vehicle.no_of_keys, Validators.compose([Validators.required])],
      'vehicle_is_damage': [this.vehicle.is_damage],
      'vehicle_body_eng': [this.vehicle.body_eng],
      'vehicle_body_deu': [this.vehicle.body_deu],
      'vehicle_body_it': [this.vehicle.body_it],
      'vehicle_body_fr': [this.vehicle.body_fr],
       'vehicle_repairs': [this.vehicle.repairs],
      'vehicle_mechanics_eng': [this.vehicle.mechanics_eng],
      'vehicle_mechanics_deu': [this.vehicle.mechanics_deu],
      'vehicle_mechanics_it': [this.vehicle.mechanics_it],
      'vehicle_mechanics_fr': [this.vehicle.mechanics_fr]
    });
    


    //this.min_date = year+'-'+(month+1) + '-'+day;


    // console.log(this.vehicle.fuel);

   this.Step1Form.get('vehicle_is_damage').valueChanges
    .subscribe(value => {
      if(value) {
        this.Step1Form.get('vehicle_repairs').setValidators(Validators.required)
      } else {
        this.Step1Form.get('vehicle_repairs').clearValidators();
      }

       this.Step1Form.get('vehicle_repairs').updateValueAndValidity();
    }
  )    ;
  }


  
// onEmailValueChanged(value: any){
//   let phoneNumberControl = this.Step1Form.get('vehicle_repairs');

//   // Using setValidators to add and remove validators. No better support for adding and removing validators to controller atm.
//   // See issue: https://github.com/angular/angular/issues/10567
//   if(!value){
//       phoneNumberControl.setValidators([Validators.required, Validators.minLength(4)]);
//   }else {
//       phoneNumberControl.setValidators([Validators.minLength(4)]);
//   }

//   phoneNumberControl.updateValueAndValidity(); //Need to call this to trigger a update
// }


 


  ngOnInit() {


    this.today = new Date().toISOString();
    let current_date:any = new Date();
    this.dateFormat(current_date);


    let new_mindate = this.min_date;

    console.log('ngOnInit');

   // console.log(window.localStorage.getItem('vehicle_temp_id'));

    if (window.localStorage.getItem('vehicle_temp_id') == null) {
      window.localStorage.setItem('vehicle_temp_id', this.navParams.get('vehicle_temp_id'));
        }
                                                                                                                                       
    if (window.localStorage.getItem('vehicle_temp_id') != null) {
      this.webService.getVehicleByTempId(window.localStorage.getItem('vehicle_temp_id')).subscribe(
        data => {
          // console.log(data);
          if (data.success == true) {
            this.webService.loading.dismiss();
            this.webService.presentToast(data.message);

            if (Object.keys(data.data.vehicleData).length > 0) {
              this.vehicle = data.data.vehicleData.Vehicle;

              if(this.vehicle.kilometers == 0){
                this.vehicle.kilometers= null
              }

              if( this.vehicle.is_damage == true ){
                this.vehicle.is_damage = true;
              } else {
                this.vehicle.is_damage = false;
              }

              // if( this.vehicle.swiss_car == true ){
              //   this.vehicle.swiss_car = true;
              // } else {
              //   this.vehicle.swiss_car = false;
                                                                    // }


              if( Object.keys(data.data.vehicleData.VehicleDamage).length > 0 ){

                for(let damageImage of data.data.vehicleData.VehicleDamage) {
                  //this.vehicleDamage = data.vehicleData.VehicleDamage;

                  if( damageImage.left_file_name != null ){
                    this.vehicleDamage.leftside = damageImage.imageUrl;
                    this.vehicleDamage.leftsideId = damageImage.id;
                  } else if( damageImage.right_file_name != null ){
                    this.vehicleDamage.rightside = damageImage.imageUrl;
                    this.vehicleDamage.rightsideId = damageImage.id;
                  }  else if( damageImage.top_file_name != null ){
                    this.vehicleDamage.topside = damageImage.imageUrl;
                    this.vehicleDamage.topsideId = damageImage.id;
                  }  else if( damageImage.bottom_file_name != null ){
                    this.vehicleDamage.bottomside = damageImage.imageUrl;
                    this.vehicleDamage.bottomsideId = damageImage.id;
                  }  else if( damageImage.back_file_name != null ){
                    this.vehicleDamage.backside = damageImage.imageUrl;
                    this.vehicleDamage.backsideId = damageImage.id;
                  }  
                }
              }
            }

            // console.log("Vehicle Data :",this.vehicle);
            this.vehicle.model_no=window.localStorage.getItem("certificate");
            this.vehicle.first_reg=window.localStorage.getItem("first_reg");
          // this.initAutocomplete();
            // console.log(this.vehicle);
            

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
      this.vehicle.model_no=window.localStorage.getItem("certificate");
      this.vehicle.first_reg=window.localStorage.getItem("first_reg");
     // this.initAutocomplete();
      // console.log(this.vehicle);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepOnePage');

      this.getRegion();

  };


  dateFormat(date) {

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = (date.getDate() < 10 ? '0' : '') +date.getDate();
    // let hours = date.getHours();
    // let minutes = date.getMinutes();
    // let ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0'+minutes : minutes;
    this.max_date = (year+1)+"-"+(month+1)+"-"+day;
    this.current_date_time = (month+1) + '/'+ day + '/' + year;
    this.min_date = 2020+'-'+(month+1) + '-'+day;
    
  }

  next(step) {

    // console.log(this.Step1Form.value);

    let fone = this.Step1Form.value ;

    this.vehicle.swiss_car = fone.vehicle_swiss_car


    // console.log(this.vehicle);
    let newDate=this.vehicle.first_reg.split("-");
       // console.log(newDate);
      let NewDateString=newDate[1]+"/"+newDate[0];
      this.vehicle.first_reg=NewDateString;
    this.webService.step1(this.vehicle).subscribe(
      data => {
        // console.log(data);
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);
          window.localStorage.setItem('vehicle_temp_id', data.data.vehicle_temp_id);
          //this.navCtrl.setRoot(StepTwoPage);
          if(step==1){
            this.navCtrl.push(StepTwoPage, {
              vehicle_temp_id: data.data.vehicle_temp_id
            });
          }else{
            this.navCtrl.push(CarGaragePage);
          }
          //  this.navCtrl.push(StepThreePage, {
          //   vehicle_temp_id: data.data.vehicle_temp_id
          // });

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

    //this.navCtrl.setRoot(StepTwoPage);
  }


  hideShowDamage() {
    this.zone.run(()=>{
      this.hideDamage = !this.hideDamage;
    })
    
    
  }

  hideShowDamages() {
    this.zone.run(()=>{
      this.hideDamages = this.hideDamages;
    })
    
    
  }

  deletePhoto(index) {
    this.photos[index] = this.imagePath + index + ".png";
  }

  actionSheet:any;

  public presentActionSheet(type) {
    console.log(type);
     this.actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, type);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, type);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    this.actionSheet.present();
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
  public takePicture(sourceType, type) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    if(sourceType>0)options['allowEdit']=true;
    this.presentLoader();
    this.camera.getPicture(options).then((capturedImage) => {

      console.log('capturedImage',capturedImage)
      let doAction=(imagePath:any)=>{
          console.log('doAction capturedImage',imagePath);
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath).then(filePath => {
              let imageInfo = this.getImagePathWithName(filePath);  
              this.copyFileToLocalDir(imageInfo.path, imageInfo.name, this.createFileName(), type);
            })
          }else{
              let imageInfo = this.getImagePathWithName(imagePath);  
              this.copyFileToLocalDir(imageInfo.path, imageInfo.name,this.createFileName(), type);
          }
      }

      this.validatedFile(capturedImage,doAction);

      // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      //   this.filePath.resolveNativePath(imagePath)
      //     .then(filePath => {
      //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
      //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), type);

      //       this.vehicleDamage[type] = correctPath + currentName;

      //     });
      // } else {
      //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), type);

      //   this.vehicleDamage[type] = correctPath + currentName;
      // }
    }, (err) => {
      if(this.loading) this.loading.dismiss();
      this.presentToast('Error while selecting image.');
    });
  }

  public uploadImage(image, type) {


    // Destination URL
    var url = this.webService.baseUrl + "api/uploadDamageVehicle";

    // File for Upload
    var targetPath = this.pathForImage(image);

    // File name only
    var filename = image;

    /*var options = {
      fileKey: "data[VehicleDamage][" + type + "][]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename, 'vehicle_id': window.localStorage.getItem('vehicle_temp_id') }
    };*/
    var options = {
      fileKey: "data[VehicleDamage][image]",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers :{language:window.localStorage.getItem('language')},
      params: { 'fileName': filename, 'vehicle_id': window.localStorage.getItem('vehicle_temp_id'),'type':type }
    };   

    const fileTransfer: TransferObject = this.transfer.create();

    if( type == 'bottomside' ){
      this.vehicleDamage[type] = this.imagePath + 'front.png';
    } else if( type == 'leftside' ){
      this.vehicleDamage[type] = this.imagePath + 'left.png';
    } else if( type == 'topside' ){
      this.vehicleDamage[type] = this.imagePath + 'top.png';
    } else if( type == 'rightside' ){
      this.vehicleDamage[type] = this.imagePath + 'right.png';
    } else if( type == 'backside' ){
      this.vehicleDamage[type] = this.imagePath + 'back.png';
    }
    console.log('damage vehicle',targetPath, url, options);

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      if(this.loading) this.loading.dismiss();
      var responseData = JSON.parse(data.response);
      console.log('damage responseData',responseData);
      if (responseData.success == true) {
        this.vehicleDamage[type] = responseData.data.imageUrl;
        this.vehicleDamage[type+"Id"] = responseData.data.id;
        this.presentToast( this.translate.instant('lbl_vehicle_damage_image_upload_successfully') );
        //console.log(this.vehicleDamageImage);
      }else{
        this.presentToast(responseData.message);
      }
      
    }, err => {
      if(this.loading) this.loading.dismiss();
      this.presentToast( this.translate.instant('lbl_file_upload_error') );
    });


    //this.navCtrl.setRoot(StepThreePage);
  }
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

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName, type) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage(newFileName, type);
    }, error => {
      if(this.loading) this.loading.dismiss();
      this.presentToast( this.translate.instant('lbl_file_storing_error') );
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
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

  deleteDamagePhoto(vehicleDamageId, type){
    
    this.webService.deleteDamagePhoto(vehicleDamageId, type).subscribe(
      data => {
        console.log(data);
        if (data.success == true) {
          this.webService.loading.dismiss();
          this.webService.presentToast(data.message);

          if( type == 'bottomside' ){
            this.vehicleDamage[type] = this.imagePath + 'front.png';
          } else if( type == 'leftside' ){
            this.vehicleDamage[type] = this.imagePath + 'left.png';
          } else if( type == 'topside' ){
            this.vehicleDamage[type] = this.imagePath + 'top.png';
          } else if( type == 'rightside' ){
            this.vehicleDamage[type] = this.imagePath + 'right.png';
          } else if( type == 'backside' ){
            this.vehicleDamage[type] = this.imagePath + 'back.png';
          }
          
          this.vehicleDamage[type+"Id"] = null;

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

  switchBodyMultiLing(){
    this.bodyMultiLingual = !this.bodyMultiLingual;
  }

  switchMechanicsMultiLing(){
    this.mechanicsMultiLingual = !this.mechanicsMultiLingual;
  }

  switchBodyMultiLings(){
    this.bodyMultiLinguals = !this.bodyMultiLinguals;
  }

  getRegion(){

    this.webService.getRegion().subscribe((serverResponse:any)=>{

      console.log(serverResponse);

     

      if(serverResponse.success){

        this.reginList = serverResponse.data.VehicleRegion ;
        // setTimeout(()=>{
        //   this.webService.loading.dismiss();
        // },1000);
        

      }

    },(Err)=>{
      // setTimeout(()=>{
      //   this.webService.loading.dismiss();
      // },300);
      
      console.log(Err);
    });


  };

  changeto(){

    let data= this.Step1Form.value;
    let val = parseInt(data.vehicle_kilometers)

    this.vehicle.kilometers = val;

  }

  changeToKW(){

   

      let hp = this.vehicle.hp * 0.735499
      this.vehicle.kw = hp.toFixed(2) ;
    
    

  };
  changeToHP(){

    console.log(this.vehicle.kw);

    console.log(this.vehicle.hp);

    let hp = this.vehicle.kw * 1.359621
    this.vehicle.hp = hp.toFixed(2);

    // let hp = (1 * this.vehicle.hp) / 0.74
    //   this.vehicle.hp = hp ;

    // if(this.vehicle.kw == null || this.vehicle.kw == 0 ){
    //   this.vehicle.hp=0;
    // }else{
    //   let hp = (1 * this.vehicle.hp) / 0.74
    //   this.vehicle.hp = hp ;
    // }

    
      
    
  
    //this.vehicle.hp, Validators.compose([Validators.required])],
    //'vehicle_kw': [this.vehicle.kw,

  }
  presentLoader(){
    this.loading = this.loadingCtrl.create({
      content: this.translate.instant('lbl_uploading'),
    });
    this.loading.present();
  }

  

}
