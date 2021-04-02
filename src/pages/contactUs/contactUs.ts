import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../providers/web-service';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

declare var google;

@Component({
    templateUrl: "contactUs.html",
    selector: "page-contactus"
})

export class ContactUsPage{

    @ViewChild('map') mapElement: ElementRef;
    map: any;

    ContactForm : FormGroup;
    public validation_messages:any;

    contact: {
        user_type: string,
        marketplace: string,
        type: string,
        topic: string,
        my_request: string,
        prefix_name: string,
        first_name: string,
        last_name: string,
        email: string
    } = {
            user_type: "",
            marketplace: "",
            type: "",
            topic: "",
            my_request: "",
            prefix_name: "",
            first_name: "",
            last_name: "",
            email: ""
        };

    constructor(public navCtrl: NavController, 
                private webService: WebService, 
                public fb: FormBuilder, 
                public translate: TranslateService,
                public events: Events,
                private callNumber: CallNumber) {

        events.subscribe('language:change',()=>{
            console.log('ev');
            this.validation_messages = {
                'contact_type': [
                    { type: 'required', message: this.translate.instant('lbl_type_required') }
                ],
                'contact_topic': [
                    { type: 'required', message: this.translate.instant('lbl_topic_required') }
                ],
                'contact_my_request': [
                    { type: 'required', message: this.translate.instant('lbl_my_request_required') }
                ],
                'contact_first_name': [
                    { type: 'required', message: this.translate.instant('lbl_first_name_required') }
                ],
                'contact_last_name': [
                    { type: 'required', message: this.translate.instant('lbl_surname_required') }
                ],
                'contact_email': [
                    { type: 'required', message: this.translate.instant('lbl_email_required') },
                    { type: 'email', message: this.translate.instant('lbl_email_valid') }
                ]
            };
        })
        this.validation_messages = {
            'contact_type': [
                { type: 'required', message: this.translate.instant('lbl_type_required') }
            ],
            'contact_topic': [
                { type: 'required', message: this.translate.instant('lbl_topic_required') }
            ],
            'contact_my_request': [
                { type: 'required', message: this.translate.instant('lbl_my_request_required') }
            ],
            'contact_first_name': [
                { type: 'required', message: this.translate.instant('lbl_first_name_required') }
            ],
            'contact_last_name': [
                { type: 'required', message: this.translate.instant('lbl_surname_required') }
            ],
            'contact_email': [
                { type: 'required', message: this.translate.instant('lbl_email_required') },
                { type: 'email', message: this.translate.instant('lbl_email_valid') }
            ]
        };
        this.ContactForm = this.fb.group({
            'contact_user_type' : [null,Validators.compose([Validators.required])],
            'contact_marketplace' : [null,Validators.compose([Validators.required])],
            'contact_type' : [null, Validators.compose([Validators.required])],
            'contact_topic' : [null, Validators.compose([Validators.required])],
            'contact_my_request' : [null, Validators.compose([Validators.required])],
            'contact_prefix_name' : [null,Validators.compose([Validators.required])],
            'contact_first_name' : [null, Validators.compose([Validators.required])],
            'contact_last_name' : [null, Validators.compose([Validators.required])],
            'contact_email' : [null, Validators.compose([Validators.required, Validators.email])]
      });
    }

    ionViewDidLoad() {
       this.loadMap();         
    }    
    

    loadMap() {
        setTimeout(()=>{
            let latLng = new google.maps.LatLng(47.269598, 8.716965);

            let mapOptions = {
                center: latLng,
                zoom: 50,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h6>Eintauschfahrzeuge24.ch GmbH</h6>' +
                '<div id="bodyContent">' +
                '<p>Oberzelgstrasse 3</p>' +
                '<p>8618 Oetwil am See ZH</p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: 'Uluru (Ayers Rock)'
            });
            marker.addListener('click', function () {
                infowindow.open(this.map, marker);
            });
        },500)

        

    }

    request() {

        if( this.ContactForm.valid ){
            this.webService.contactUs(this.contact).subscribe(
                data => {
                    // console.log(data);
                    if (data.success == true) {
                        this.webService.loading.dismiss();
                        this.webService.presentToast(data.message);
                        this.ContactForm.reset();
                        this.contact={
                                        user_type: "",
                                        marketplace: "",
                                        type: "",
                                        topic: "",
                                        my_request: "",
                                        prefix_name: "",
                                        first_name: "",
                                        last_name: "",
                                        email: ""
                                    }
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
        } else {
            this.webService.presentToast( this.translate.instant('lbl_invalid_form') );
        }

        
    };

    callMe(phnumber:any){
        this.callNumber.callNumber(phnumber, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    };
}