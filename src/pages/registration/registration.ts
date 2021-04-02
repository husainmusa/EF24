import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebService } from '../../providers/web-service';
import { FormBuilder, FormGroup, Validators , AbstractControl, ValidationErrors } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
//import { UsernameValidator } from '../../app/validators/username';

import { SignInPage } from '../signIn/signIn';




@Component({
    templateUrl: "registration.html",
    selector: "page-registration"
})

export class RegistrationPage {

    RegisterForm : FormGroup;
    public validation_messages:any;
    user_username = "";
    abc :string;
    viewOne : boolean = true ;
    viewTwo : boolean = false ;
    viewThree : boolean = false ;
    formTitle : any ;
    countyList:any

    company: { 
        commercial_register:number, 
        name: string, 
        //addition: string, 
        street: string, 
        pob: string, town: string, country: string, car_dealership: string, 
        motorcycle_dealership: string, com_vehicle_dealership: string } 
        = {
        commercial_register: 1,
        name: "",
        //addition: "",
        street: "",
        pob: "",
        town: "",
        country: "",
        car_dealership: "",
        motorcycle_dealership: "",
        com_vehicle_dealership: ""
    };


    user: { prefix_name: string, fname: string, lname: string, email: string, phone_code: string, phone: string, 
        mobile_code: string, mobile: string, language: string, username: string, password: string, repassword: string, 
        site_reference: string, terms: boolean, carauktion_ag: boolean } = {
        prefix_name: "",
        fname: "",
        lname: "",
        email: "",
        phone_code: "",
        phone: "",
        mobile_code: "",
        mobile: "",
        language: "",
        username: "",
        password: "",
        repassword: "",
        site_reference: "",
        terms: false,
        carauktion_ag: false
    };
    reginList: any;

    constructor(public navCtrl: NavController, private webService: WebService, public translate: TranslateService, public fb: FormBuilder) { //, public usernameValidator: UsernameValidator
        
        this.formTitle= this.translate.instant("lbl_company_data");
        
        this.validation_messages = {
            'company_name': [
                { type: 'required', message: this.translate.instant('lbl_company_name_required') }
            ],
            'company_pob': [
                { type: 'required', message: this.translate.instant('lbl_company_pob_required') }
            ],
            'company_town': [
                { type: 'required', message: this.translate.instant('lbl_company_town_required') }
            ],
            'company_country': [
                { type: 'required', message: this.translate.instant('lbl_company_country_required') }
            ],
            'user_fname': [
                { type: 'required', message: this.translate.instant('lbl_user_first_name_required') }
            ],
            'user_lname': [
                { type: 'required', message: this.translate.instant('lbl_user_last_name_required') }
            ],
            'user_phone': [
                { type: 'required', message: this.translate.instant('lbl_user_phone_required') }
            ],
            'user_language': [
                { type: 'required', message: this.translate.instant('lbl_Preferred_language_required') }
            ],
            'user_username': [
                { type: 'required', message: this.translate.instant('lbl_username_required') }
//{ type: 'minlength', message: 'Username must be at least 4 characters long.' },
//{ type: 'maxlength', message: 'Username cannot be more than 15 characters long.' },
//{ type: 'pattern', message: 'Your username must contain only numbers and letters.' }
                //{ type: 'validUsername', message: 'Your username has already been taken.' }
            ],

            'user_password': [
                { type: 'required', message: this.translate.instant('lbl_password_required') }
            ],
           
            'user_repassword': [
                { type: 'required', message: this.translate.instant('lbl_confirm_password_required') }
            ]  
        };

        

        this.RegisterForm = this.fb.group({
            //company_commercial_register : [1, Validators.compose([Validators.required])],
            'company_CC' : ['0', Validators.compose([Validators.required])],
            'company_name' : [null, Validators.compose([Validators.required])],
            'company_post_code' : [null, Validators.compose([Validators.required])],
            'company_street' : [null, Validators.compose([Validators.required])],
            'company_pob' : [null],
            'company_town' : [null, Validators.compose([Validators.required])],
            'company_country' : [null, Validators.compose([Validators.required])],
            //'company_car_dealership' : [null, Validators.compose([Validators.required])],
            //'company_motorcycle_dealership' : [null, Validators.compose([Validators.required])],
            //'company_vehicle_dealership' : [null, Validators.compose([Validators.required])],
            //'user_prefix_name' : [null, Validators.compose([Validators.required])],
            'user_fname' : [null, Validators.compose([Validators.required])],
            'user_lname': [null, Validators.compose([Validators.required])],
            'user_email': [null, Validators.compose([Validators.required,
                                                     Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')])],
            'user_gender': ['Male', Validators.compose([Validators.required])],
            //'user_phone_code': [null, Validators.compose([Validators.required])],
            'user_phone': [null, Validators.compose([Validators.required])],
            //'user_mobile_code': [null, Validators.compose([Validators.required])],
            'user_mobile': [null],
            'user_language': [null,Validators.compose([Validators.required])],
            'user_username': [null, Validators.compose([Validators.minLength(4),
                                                        Validators.maxLength(15),
                                                        Validators.required
                                                    ])], //, usernameValidator.checkUsername.bind(usernameValidator)
            'user_password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            'user_repassword': [null, Validators.compose([Validators.required])],
            //'user_site_reference': [null, Validators.compose([Validators.required])],
            'user_terms': [ false , Validators.compose([Validators.required])],
            'user_carauktion_ag': [ false , Validators.compose([Validators.required])],
            
      });

      

    }

    register(data) {

        console.log(data);

        
        //this.webService.register(this.company, this.user).subscribe(
            this.webService.register(data).subscribe(
            data => {
                //console.log(data);
                if (data.success == true) {
                    this.webService.loading.dismiss();
                    this.webService.presentToast(data.message);
                   // window.localStorage.setItem('token', data.data.token);
                   // this.navCtrl.setRoot(HomePage);

                   this.navCtrl.setRoot(SignInPage);
                } else {

                    // this.viewOne = false ;
                    // this.viewTwo = false ;
                    // this.viewThree =  false;
                   // this.formTitle ="LOGIN DETAILS";
                   //this.formTitle= this.translate.instant("lbl_login_details");

                    this.webService.loading.dismiss();
                    if(data.message){
                        this.webService.presentToast(data.message);
                    }else{
                        this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                    }
                    // this.webService.presentToast('Benutzer existiert bereits. Bitte geben Sie einen neuen Benutzer ein.');
                }
            },
            err => {
                this.webService.loading.dismiss();
               // this.webService.presentToast(this.translate.instant('lbl_some_error_occured'));
                console.log(err);
            }
        );
    };


    whichView(type : any){
        switch(type){
            case 'next' :{


                console.log(this.RegisterForm.value);

                let formData =  this.RegisterForm.value ;

                let data={
                    stepone:[
                        {
                            "commercial_register":formData.company_CC ,
                            "company_name":formData.company_name ,
                            "street_number":formData.company_street ,
                            "po_box":formData.company_pob ,
                            "company_town":formData.company_town, 
                            "company_country":formData.company_country 
                        }
                    ],
                    steptwo:[],
                    stepthree:[]
                };


                console.log(data);


              //  this.register(data);


                this.viewOne = false;

                this.viewTwo = true ;

                this.viewThree =  false;

                //this.formTitle ="ADMINISTRATOR" 

                this.formTitle= this.translate.instant("lbl_ADMINISTRATOR");



                //this.viewOne ? this.viewOne = false : this.viewTwo = true 

                break;
            }
            case 'previous' : {

                if(this.viewThree){

                this.viewOne = false ;

                this.viewTwo = true ;

                this.viewThree =  false;

                //this.formTitle ="ADMINISTRATOR";

                this.formTitle= this.translate.instant("lbl_ADMINISTRATOR");

                }else{

                this.viewOne = true ;

                this.viewTwo = false ;

                this.viewThree =  false;

                //this.formTitle ="COMPANY DATA"

                this.formTitle= this.translate.instant("lbl_company_data");

                }

                

            break;
            }

            case 'final' : {

                this.viewOne = false ;

                this.viewTwo = false ;

                this.viewThree =  true;

               // this.formTitle ="LOGIN DETAILS"

               this.formTitle= this.translate.instant("lbl_login_details");


                let formData =  this.RegisterForm.value ;


                let data={
                    stepone:[
                        {
                            "commercial_register":formData.company_CC ,
                            "company_name":formData.company_name ,
                            "street_number":formData.company_street ,
                            "po_box":formData.company_pob ,
                            "company_town":formData.company_town, 
                            "company_country":formData.company_country 
                        }
                    ],
                    steptwo:[

                        {
                            "first_name":formData.user_fname ,
                            "sur_name":formData.user_lname ,
                            "user_email":formData.user_email ,
                            "user_gender":formData.user_gender ,
                            "user_telephone":formData.user_phone, 
                            "user_mobile":formData.user_mobile,
                            "user_language":formData.user_language  
                        }


                    ],
                    stepthree:[]
                };

                console.log(data);

                this.register(data);

                

            break;
            }

            case 'submit' : {

                
                let formData =  this.RegisterForm.value ;
                
                    //  this.userInfo();

                let data={
                    stepone:[
                        
                        {
                            "commercial_register":formData.company_CC ,
                            "company_name":formData.company_name ,
                            "street_number":formData.company_street ,
                            "po_box":formData.company_pob ,
                            "postcode":formData.company_post_code ,
                            "company_town":formData.company_town, 
                            "company_country":formData.company_country 
                        }
                    ],
                    steptwo:[

                        {
                            "first_name":formData.user_fname ,
                            "sur_name":formData.user_lname ,
                            "user_email":formData.user_email ,
                            "user_gender":formData.user_gender ,
                            "user_telephone":formData.user_phone, 
                            "user_mobile":formData.user_mobile,
                            "user_language":formData.user_language 
                        }
                    ],
                    stepthree:[

                       

                        {
                            
                           

                            "user_name":formData.user_username ,
                            "user_password":formData.user_repassword ,
                            "user_terms":formData.user_terms ,
                            "user_carauktion_ag":formData.user_carauktion_ag 
                        }
                    ]
                };

                console.log(data);
                this.register(data);

                

                
            break;
            }

            default :{

                break;
            }
        }

    };

    // myEnterKeyAction(){

    //     console.log('keyboard');
    // }


//   userInfo(){
  
//     };

    ionViewDidLoad() {
        console.log('ionViewDidLoad StepOnePage');

       // this.getCountryList();

       this.getRegion();
    
    
      };

    getCountryList(){

        this.webService.getCountry().subscribe((serverResponse:any)=>{

            console.log(serverResponse);

            if(serverResponse.success){
                this.countyList= serverResponse.data.Country
                this.webService.loading.dismiss();
            }

        },(Err)=>{
            this.webService.loading.dismiss();
            console.log(Err)
        });

    };


    getRegion(){

        this.webService.getRegion().subscribe((serverResponse:any)=>{
    
          console.log(serverResponse);
    
         
    
          if(serverResponse.success){
    
            this.reginList = serverResponse.data.VehicleRegion ;
    
           if(this.webService.loading) this.webService.loading.dismiss();
    
          }
    
        },(Err)=>{
          this.webService.loading.dismiss();
    
          console.log(Err);
        });
    
    
      };

    openLink(){

        console.log("kokokokokokokoko");

    };


}