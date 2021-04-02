import { Injectable } from '@angular/core';
import { Headers, Http  } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WebService {

  public loading: any;
  public token: string;
  public makes: JSON;
  public models: JSON;
  public vehicleTempId: string;
  //readonly baseUrl: string = 'http://192.168.0.104/carlisting/';
  readonly baseUrl: string = 'https://ef24.ch/';
  readonly baseUrlEurotax: string = "https://ef24.ch/euro/";
  readonly autoApiUrl: string = 'https://ef24.ch/autodat/fetch';
  public translateString: string;

  constructor(public http: Http, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private file: File, public translate: TranslateService) {
     this.token = window.localStorage.getItem('token');

    //this.vehicleTempId = window.localStorage.getItem('vehicle_temp_id');
  }
  

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
    this.loading = null;
  }

  login(account) {
    var url = this.baseUrl + "api/service_login";
    this.showLoading();
    let body = new FormData();
    body.append('username', account.username);
    body.append('password', account.password);
    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  

  //register(company, user) {

  register(data:any) {
    var url = this.baseUrl + "api/service_signup";

     let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');

    this.showLoading();

    let body = new FormData();

   // body.append('stepone', '[{"commercial_register":"0","street":"qqqqq","pob":"5555","postcode":"1234","town":"abc","country":"Germany"}]');

    //https://ef24.ch/api/service_signup
    
   /* body.append('data[Company][name]', company.name);
    body.append('data[Company][addition]', company.addition);
    body.append('data[Company][pob]', company.pob);
    body.append('data[Company][town]', company.town);
    body.append('data[Company][country]', company.country);
    body.append('data[Company][car_dealership]', company.car_dealership);
    body.append('data[Company][motorcycle_dealership]', company.motorcycle_dealership);
    body.append('data[Company][com_vehicle_dealership]', company.com_vehicle_dealership);
    body.append('data[User][prefix_name]', user.prefix_name);
    body.append('data[User][fname]', user.fname);
    body.append('data[User][lname]', user.lname);
    body.append('data[User][email]', user.email);
    body.append('data[User][phone_code]', user.phone_code);
    body.append('data[User][phone]', user.phone);
    body.append('data[User][mobile_code]', user.mobile_code);
    body.append('data[User][mobile]', user.mobile);
    body.append('data[User][language]', user.language);
    body.append('data[User][username]', user.username);
    body.append('data[User][password]', user.password);
    body.append('data[User][repassword]', user.repassword);
    body.append('data[User][site_reference]', user.site_reference);
    body.append('data[User][terms]', user.terms ? "1" : "0");
    body.append('data[User][carauktion_ag]', user.carauktion_ag ? "1" : "0");*/

    var response = this.http.post(url, data ,{headers:headers} ).map(res => res.json());
    return response;
  }

  getAuctionList(sortOn?, make?, model?, region?, minYear?, maxYear?, bodyType? , page? ) {

    var queryString = "?";
    if (sortOn) { queryString = queryString + "sortOn=" + sortOn + "&" }
    if (make) { queryString = queryString + "makeName=" + make + "&" }
    if (model) { queryString = queryString + "modelName=" + model + "&" }
    if (region) { queryString = queryString + "regionCode=" + region + "&" }
    if (minYear) { queryString = queryString + "minYear=" + minYear + "&" }
    if (maxYear) { queryString = queryString + "maxYear=" + maxYear + "&" }
    if (bodyType) { queryString = queryString + "body_type_name=" + bodyType }
    if (page) { queryString = queryString + "page=" + page }

    // console.log(page);
    
     console.log("SEARCH/getAuctionList",queryString);
    
    var url = this.baseUrl + "api/getAuctionList" + queryString;
    //var url = "assets/auction.json";
    this.showLoading();
    let headers = new Headers();
    //console.log('Token: ' + window.localStorage.getItem('token'));
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMyFavouriteVehicleList() {
    var url = this.baseUrl + "api/getMyFavouriteVehicleList";
    this.showLoading();
    let headers = new Headers();

    console.log(window.localStorage.getItem('token')) ;

    
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMyVehicleAuctionList() {
    var url = this.baseUrl + "api/getMyVehicleAuctionList";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMySellVehicleList() {
    var url = this.baseUrl + "api/getMySellVehicleList";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getMyPurchasedVehicleList() {
    var url = this.baseUrl + "api/getMyPurchasedVehicleList";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  setEmailPreferences(email_preference) {
    var url = this.baseUrl + "api/setEmailPreferences";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    let body = new FormData();
    body.append('email_preference', email_preference);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  changePassword(currentPassword, password, confirmPassword,userToken) {

    console.log(userToken) ;

    
    var url = this.baseUrl + "api/changePassword";
    this.showLoading();
    let headers = new Headers();
    //headers.append('token', window.localStorage.getItem('token'));
    headers.append('token', userToken);
    headers.append('language', window.localStorage.getItem('language'));
    let body = new FormData();
    body.append('current_password', currentPassword);
    body.append('password', password);
    body.append('confirm_password', confirmPassword);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  getEmailPreferences() {
    var url = this.baseUrl + "api/getEmailPreferences";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }


  getAllMake(term) {
    var url = this.baseUrl + "vehicles/getAllMakes?term=" + term;
    return this.http.get(url).map(res => res.json());
  }

  getAllModel(term, make_id) {
    var url = this.baseUrl + "vehicles/getModelByMake?term=" + term + "&make_id=" + make_id;
    return this.http.get(url).map(res => res.json());
  }

  getAllRegions() {
    var url = this.baseUrl + "vehicles/getAllRegions";
    return this.http.get(url).map(res => res.json());
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  buyNow(vehicle) {
    var url = this.baseUrl + "api/buyNow";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    let body = new FormData();
    body.append('vehicle_id', vehicle.id);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  uploadImage(file: Blob) {
    var url = this.baseUrl + "api/uploadImage";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    let body = new FormData();
    body.append('ionicfile', file);
    //console.log(body);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  step1(vehicle) {
    var url = this.baseUrl + "api/step1";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    //headers.append('Content-Type', 'multipart/form-data');
    let body = new FormData();

    if (window.localStorage.getItem('vehicle_temp_id') != null) {
      body.append('data[Vehicle][id]', window.localStorage.getItem('vehicle_temp_id'));
    }
    //console.log(vehicle);

    body.append('data[Vehicle][brand]', vehicle.brand);
    body.append('data[Vehicle][model]', vehicle.model);
    body.append('data[Vehicle][type]', vehicle.type);
    body.append('data[Vehicle][body_type]', vehicle.body_type);
    body.append('data[Vehicle][doors]', vehicle.doors);
    body.append('data[Vehicle][displacement]', vehicle.displacement);
    body.append('data[Vehicle][wheel_drive]', vehicle.wheel_drive);
    body.append('data[Vehicle][gear]', vehicle.gear);
    body.append('data[Vehicle][fuel]', vehicle.fuel);
    body.append('data[Vehicle][hp]', vehicle.hp);
    body.append('data[Vehicle][kw]', vehicle.kw);
    body.append('data[Vehicle][no_of_seats]', vehicle.no_of_seats);
    body.append('data[Vehicle][first_reg]', vehicle.first_reg);
    body.append('data[Vehicle][kilometers]', vehicle.kilometers);
    body.append('data[Vehicle][exterior_color]', vehicle.exterior_color);
    body.append('data[Vehicle][interior_color]', vehicle.interior_color);
    body.append('data[Vehicle][additional_info]', vehicle.additional_info);
    body.append('data[Vehicle][gen_condition][]', vehicle.gen_condition);
    body.append('data[Vehicle][inspection]', vehicle.inspection);
    body.append('data[Vehicle][other_condition_eng]', vehicle.other_condition_eng);
    body.append('data[Vehicle][other_condition_deu]', vehicle.other_body_deu);
    body.append('data[Vehicle][other_condition_it]', vehicle.other_body_it);
    body.append('data[Vehicle][other_condition_fr]', vehicle.other_body_fr);
    body.append('data[Vehicle][frame_no]', vehicle.frame_no);
    body.append('data[Vehicle][model_no]', vehicle.model_no);
    body.append('data[Vehicle][reg_no]', vehicle.reg_no);
    body.append('data[Vehicle][vehicle_no]', vehicle.vehicle_no);
    body.append('data[Vehicle][swiss_car]', ((vehicle.swiss_car == true) ? '1' : '0')  );
    body.append('data[Vehicle][vehicle_regions]', vehicle.vehicle_regions);
    body.append('data[Vehicle][reg_document]', vehicle.reg_document);
    body.append('data[Vehicle][service_record]', vehicle.service_record);
    body.append('data[Vehicle][no_of_keys]', vehicle.no_of_keys);
    body.append('data[Vehicle][is_damage]', ((vehicle.is_damage == true) ? '1' : '0'));
    body.append('data[Vehicle][body_eng]', vehicle.body_eng);
    body.append('data[Vehicle][repairs]', vehicle.repairs);
    body.append('data[Vehicle][mechanics_eng]', vehicle.mechanics_eng);
    body.append('data[Vehicle][car_finish]', vehicle.car_finish);
    console.log(vehicle);
    //  body.append('data[VehicleDamage][bottomside][]', vehicleDamage.bottomside);
    //  body.append('data[VehicleDamage][leftside][]', vehicleDamage.leftside);
    //  body.append('data[VehicleDamage][topside][]', vehicleDamage.topside);
    //  body.append('data[VehicleDamage][rightside][]', vehicleDamage.rightside);
    //  body.append('data[VehicleDamage][backside][]', vehicleDamage.backside);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  step2(vehicleImages) { //vehicleDocs
    var url = this.baseUrl + "api/uploadVehicleImages";
    this.showLoading();


    // let vehicleUploadedImages;
    // vehicleImages.forEach(function(i) {
      
        
    // });

    let body = new FormData();
    body.append('data[VehicleDoc][image][]', vehicleImages);
    //body.append('data[VehicleDoc][doc][]', vehicleDocs);

    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  step3(vehicle, vehicleDamage) {
    var url = this.baseUrl + "api/service_signup";
    this.showLoading();

    let body = new FormData();
    body.append('data[Vehicle][min_auction_price]', vehicle.brand);
    body.append('data[Vehicle][auction_duration]', vehicle.brand);
    body.append('data[Vehicle][buy_price]', vehicle.brand);
    body.append('data[Vehicle][transport_medium]', vehicle.brand);
    body.append('data[Vehicle][increase_with]', vehicle.brand);
    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  getCmsPage(pageUrl?, language?) {
    var queryString = "?";
    if (pageUrl) { queryString = queryString + "page_url=" + pageUrl + "&" }
    if (pageUrl) { queryString = queryString + "language=" + language + "&" }
    var url = this.baseUrl + "api/getCmsPage" + queryString;
    // this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;

  }

  contactUs(contact) {

    var url = this.baseUrl + "api/contactUs";
    this.showLoading();
    let body = new FormData();
    body.append('data[user_type]', contact.user_type);
    body.append('data[marketplace]', contact.marketplace);
    body.append('data[type]', contact.type);
    body.append('data[topic]', contact.topic);
    body.append('data[my_request]', contact.my_request);
    body.append('data[prefix_name]', contact.prefix_name);
    body.append('data[first_name]', contact.first_name);
    body.append('data[last_name]', contact.last_name);
    body.append('data[email]', contact.email);
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.post(url, body , { headers: headers }).map(res => res.json());
    return response;
  }

  getLanguage(){
    let StoreLang=window.localStorage.getItem('language');
    return StoreLang;
  }

  getVehicleByTempId(vehicleTempId?) {
    var queryString = "?";
    if (vehicleTempId) { queryString = queryString + "vehicle_temp_id=" + vehicleTempId + "&" }
    var url = this.baseUrl + "api/getVehicleTempDetail" + queryString;
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  activateVehicle(vehicle, isActivate) {
    var url = this.baseUrl + "api/activateVehicle";

    this.showLoading();
    let body = new FormData();
    body.append('data[Vehicle][id]', window.localStorage.getItem('vehicle_temp_id') );
    body.append('data[Vehicle][min_auction_price]', vehicle.min_auction_price);
    body.append('data[Vehicle][auction_duration]', vehicle.auction_duration);
    body.append('data[Vehicle][buy_price]', vehicle.buy_price);
    body.append('data[Vehicle][increase_with]', vehicle.increase_with);
    body.append('data[Vehicle][transport_medium]', vehicle.transport_medium);
    if (isActivate == true) {
      body.append('data[Vehicle][is_active]', '1');
    }

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.post(url, body,{ headers: headers }).map(res => res.json());
    return response;

  }

  updateVehicleStatus() {
    var url = this.baseUrl + "api/activateVehicle";
    this.showLoading();
    let body = new FormData();
    body.append('data[Vehicle][id]', window.localStorage.getItem('vehicle_temp_id'));
    body.append('data[Vehicle][is_active]', '1');
    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  getVehicleBids(vehicleTempId?) {
    var queryString = "?";
    if (vehicleTempId) { queryString = queryString + "vehicle_id=" + vehicleTempId + "&" }
   // var url = this.baseUrl + "api/getRecentOffers";
    var url = this.baseUrl + "api/getVehicleBids" + queryString;
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  bidVehicle(vehicleId, bidAmout){
    var url = this.baseUrl + "api/bidVehicle";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    let body = new FormData();
    body.append('vehicle_id', vehicleId);
    body.append('biding_amount', bidAmout);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }


  recentOffers(vehicleId){

    // var queryString = "?";
    // if (vehicleTempId) { queryString = queryString + "vehicle_id=" + vehicleTempId + "&" }
    var url = this.baseUrl + "api/getRecentOffers" ;
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    let body = new FormData();
    body.append('vehicle_id', vehicleId);
    var response = this.http.post(url,body,{ headers: headers }).map(res => res.json());
    return response;
  }

  carsGarage(nextPageUrl){

   
    var url = this.baseUrl + "api/carInGarage" + '/page:'+nextPageUrl;
    console.log(url);
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));  
    var response = this.http.get(url,{ headers: headers }).map(res => res.json());
    return response;
  }


  getProfileData(){
    var url = this.baseUrl + "api/getProfileData";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getUserData(subUserId){
    var url = this.baseUrl + "api/getUserData/" + subUserId;
    this.showLoading();

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  updateProfileData(company,user){
    var url = this.baseUrl + "api/updateProfileData";
    this.showLoading();

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();
    body.append('data[Company][name]', company.name);
    body.append('data[Company][addition]', company.addition);
    body.append('data[Company][street]', company.street);
    body.append('data[Company][pob]', company.pob);
    body.append('data[Company][postcode]', company.postcode);
    body.append('data[Company][town]', company.town);
    body.append('data[Company][country]', company.country);
    body.append('data[User][prefix_name]', user.prefix_name);
    body.append('data[User][fname]', user.fname);
    body.append('data[User][lname]', user.lname);
    body.append('data[User][phone]', user.phone);
    body.append('data[User][mobile]', user.mobile);
    body.append('data[User][language]', user.language);
    body.append('data[User][site_reference]', user.site_reference);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  getInvoices() {
    var url = this.baseUrl + "api/getInvoices";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  makeFavourite(vehicleId, isFavourite ){
    var url = this.baseUrl + "api/makeFavourite";
    this.showLoading();

    // this.storage.get('token').then((token) => {
    //   window.localStorage.getItem('token') = token;
    // });

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();
    body.append('vehicle_id', vehicleId);
    body.append('is_favourite', isFavourite);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  checkVehicleFavourite(vehicleId){
    var queryString = "?";
    if (vehicleId) { queryString = queryString + "vehicle_id=" + vehicleId }

    var url = this.baseUrl + "api/checkVehicleFavourite" + queryString;
    //this.showLoading();

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  setTempVehicleId(){
    var url = this.baseUrl + "api/getVehicleId";
    this.showLoading();

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;
  }

  getLangByLabel(label){
    this.translate.get('lbl_home').subscribe(
      value => {
        this.translateString = value;
        // value is our translated string
        console.log( 'translated ' + value);
      }
    );
    return this.translateString;
  }

  deleteVehicle(vehicleId){
    var url = this.baseUrl + "api/deleteVehicle";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();
    body.append('vehicle_id', vehicleId);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  checkUsername(username){
    var url = this.baseUrl + "api/check_username";
    // this.showLoading();

    let headers = new Headers();
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();
    body.append('username', username);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  deleteDamagePhoto(vehicleDamageId, imageType){
    var url = this.baseUrl + "api/deleteDamagePhoto";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();
    body.append('vehicle_damge_id', vehicleDamageId);
    body.append('imageType', imageType);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  getVehicleImages(vehicleTempId?) {
    var queryString = "?";
    if (vehicleTempId) { queryString = queryString + "vehicle_temp_id=" + vehicleTempId + "&" }

    var url = this.baseUrl + "api/getVehicleImages" + queryString;
    this.showLoading();

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;

  }

  deleteVehicleImage(vehicleImageId){

    //editVehicleImage
    //var url = this.baseUrl + "api/deleteVehicleImage";

    var url = this.baseUrl + "api/editVehicleImage";
    
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();
    body.append('vehicle_img_id', vehicleImageId);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  deleteVehicleDoc(vehicleImageId){
    var url = this.baseUrl + "api/deleteVehicleDoc";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();
    body.append('vehicle_img_id', vehicleImageId);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  getVehiclesByEuroTax( regDate, modelNumber ){
    var url = this.baseUrlEurotax + "get_vehicle_info_api.php";
    this.showLoading();

     let body = new FormData();
     body.append('model_number', modelNumber);
     body.append('first_registration', regDate);

    //var response = this.http.get('assets/eurotax/get_vehicle_info_api.json').map(res => res.json());
    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  addNewVehicle(vehicle) {
    var url = this.baseUrl + "api/step1";
    this.showLoading();
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    //headers.append('Content-Type', 'multipart/form-data');
    let body = new FormData();

    if (window.localStorage.getItem('vehicle_temp_id') != null) {
      body.append('data[Vehicle][id]', window.localStorage.getItem('vehicle_temp_id'));
    }
    //console.log(vehicle);

    body.append('data[Vehicle][brand]', vehicle.brand);
    body.append('data[Vehicle][model]', vehicle.model);
    body.append('data[Vehicle][type]', vehicle.type);
    body.append('data[Vehicle][body_type]', vehicle.body_type);
    body.append('data[Vehicle][doors]', vehicle.doors);
    body.append('data[Vehicle][displacement]', vehicle.displacement);
    body.append('data[Vehicle][wheel_drive]', vehicle.wheel_drive);
    body.append('data[Vehicle][gear]', vehicle.gear);
    body.append('data[Vehicle][fuel]', vehicle.fuel);
    body.append('data[Vehicle][hp]', vehicle.hp);
    body.append('data[Vehicle][kw]', vehicle.kw);
    body.append('data[Vehicle][no_of_seats]', vehicle.no_of_seats);
    body.append('data[Vehicle][first_reg]', vehicle.first_reg);
    body.append('data[Vehicle][kilometers]', vehicle.kilometers);
    body.append('data[Vehicle][exterior_color]', vehicle.exterior_color);
    body.append('data[Vehicle][interior_color]', vehicle.interior_color);
    body.append('data[Vehicle][additional_info]', vehicle.additional_info);
    body.append('data[Vehicle][gen_condition][]', vehicle.gen_condition);
    body.append('data[Vehicle][inspection]', vehicle.inspection);
    body.append('data[Vehicle][other_condition_eng]', vehicle.other_condition_eng);
    body.append('data[Vehicle][other_condition_deu]', vehicle.other_body_deu);
    body.append('data[Vehicle][other_condition_it]', vehicle.other_body_it);
    body.append('data[Vehicle][other_condition_fr]', vehicle.other_body_fr);
    body.append('data[Vehicle][frame_no]', vehicle.frame_no);
    body.append('data[Vehicle][model_no]', vehicle.model_no);
    body.append('data[Vehicle][reg_no]', vehicle.reg_no);
    body.append('data[Vehicle][vehicle_no]', vehicle.vehicle_no);
    body.append('data[Vehicle][swiss_car]', ((vehicle.swiss_car == true) ? '1' : '0')  );
    body.append('data[Vehicle][vehicle_regions]', vehicle.vehicle_regions);
    body.append('data[Vehicle][reg_document]', vehicle.reg_document);
    body.append('data[Vehicle][service_record]', vehicle.service_record);
    body.append('data[Vehicle][no_of_keys]', vehicle.no_of_keys);
    body.append('data[Vehicle][is_damage]', ((vehicle.is_damage == true) ? '1' : '0'));
    body.append('data[Vehicle][body_eng]', vehicle.body_eng);
    body.append('data[Vehicle][repairs]', vehicle.repairs);
    body.append('data[Vehicle][mechanics_eng]', vehicle.mechanics_eng);
    body.append('data[Vehicle][min_auction_price]', vehicle.min_auction_price);
    body.append('data[Vehicle][auction_duration]', vehicle.auction_duration);
    body.append('data[Vehicle][buy_price]', vehicle.buy_price);
    body.append('data[Vehicle][increase_with]', vehicle.increase_with);
    body.append('data[Vehicle][transport_medium]', vehicle.transport_medium);
    body.append('data[Vehicle][model_num_key]', vehicle.model_num_key);

    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  getEuroMakes( makeYear, makeMonth ){
    var url = this.baseUrlEurotax + "get_vehicle_makes_api.php";
    this.showLoading();

     let body = new FormData();
     body.append('productionYear', makeYear);
     body.append('productionMonth', makeMonth);

    //var response = this.http.get('assets/eurotax/get_vehicle_makes_api.json').map(res => res.json());
    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  getEuroModels( makeId, makeYear, makeMonth ){
    var url = this.baseUrlEurotax + "get_vehicle_models_api.php";
    this.showLoading();

     let body = new FormData();
     body.append('makeId', makeId);
     body.append('productionYear', makeYear);
     body.append('productionMonth', makeMonth);

    //var response = this.http.get('assets/eurotax/get_vehicle_models_api.json').map(res => res.json());
    var response = this.http.post(url, body).map(res => res.json());
    return response;
  }

  getEuroVehicleByMakeModel( makeId, modelId, makeYear, makeMonth ){
    var url = this.baseUrlEurotax + "get_vehicle_information_api.php";
    this.showLoading();

     let body = new FormData();
     body.append('makeId', makeId);
     body.append('modelId', modelId);
     body.append('productionYear', makeYear);
     body.append('productionMonth', makeMonth);

     var response = this.http.post(url, body).map(res => res.json());
    //var response = this.http.get('assets/eurotax/get_vehicle_information_api.json').map(res => res.json());
    return response;
  }

  getSubUsers(){
    var url = this.baseUrl + "api/getSubUsers";
    this.showLoading();

    console.log(window.localStorage.getItem('token'));
    
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    var response = this.http.get(url, { headers: headers }).map(res => res.json());
    return response;    
  }

  deleteSubUser(subUserId){
    var url = this.baseUrl + "api/deleteSubUser";
    this.showLoading();
    
      let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    let body = new FormData();
    body.append('subUserId', subUserId);
    var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  }

  addUpdateUser(user) {
    var url = this.baseUrl + "api/addUpdateUser";
    this.showLoading();

    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));

    let body = new FormData();

    if( user.id ){
      body.append('data[User][id]', user.id);
    }

    body.append('data[User][prefix_name]', user.prefix_name);
    body.append('data[User][fname]', user.fname);
    body.append('data[User][lname]', user.lname);
    body.append('data[User][email]', user.email);
    //body.append('data[User][phone_code]', user.phone_code);
    body.append('data[User][phone]', user.phone);
    //body.append('data[User][mobile_code]', user.mobile_code);
    body.append('data[User][mobile]', user.mobile);
    body.append('data[User][language]', user.language);
    body.append('data[User][username]', user.username);
    body.append('data[User][password]', user.password);
    body.append('data[User][repassword]', user.repassword);
    body.append('data[User][site_reference]', user.site_reference);
    body.append('data[User][biodata]', user.biodata);
    body.append('data[User][status]', user.status);
    body.append('data[User][subUserId]', user.subUserId);

          var response = this.http.post(url, body, { headers: headers }).map(res => res.json());
    return response;
  };

  forgotPassword(userData:any){

    var url = this.baseUrl + "api/forgotPassword";
    this.showLoading();
    let headers = new Headers();    
    headers.append('language', 'en');

    let body = new FormData();
    body.append('email', userData.userEmail);
    return this.http.post(url, body,{headers:headers}).map(res => res.json());
  }

  getCountry(loader:any=true){

    console.log(loader);
    var url = this.baseUrl + "api/country";
    if(loader) this.showLoading();

    // console.log(window.localStorage.getItem('token'));
    
    // let headers = new Headers();
    // headers.append('token', window.localStorage.getItem('token'));
    // headers.append('language', window.localStorage.getItem('language'));

    var response = this.http.get(url).map(res => res.json());
    return response;  

      

  };

  getRegion(){

    var url = this.baseUrl + "api/getRegion";
    // this.showLoading();

     // console.log(window.localStorage.getItem('token'));
    
    // let headers = new Headers();
    // headers.append('token', window.localStorage.getItem('token'));
    // headers.append('language', window.localStorage.getItem('language'));
    // var response = this.http.get(url).map(res => res.json());
    // return response;  

    return this.http.get(url).map(res => res.json());

    

  };

  deleteUser(){

    var url = this.baseUrl + "api/delete_user";
    this.showLoading();
    
    let headers = new Headers();
    headers.append('token', window.localStorage.getItem('token'));
    headers.append('language', window.localStorage.getItem('language'));
    // let body = new FormData();
    // body.append('subUserId', subUserId);

    var response = this.http.post(url, {}, { headers: headers }).map(res => res.json());
    return response;

  };

  getBidPrice(vechileId:any){

    var url = this.baseUrl + "api/getBidPrice";
    //this.showLoading();

    let headers = new Headers();    
    headers.append('language', 'en');

    let body = new FormData();
    body.append('vehicle_id', vechileId);
    return this.http.post(url, body,{headers:headers}).map(res => res.json());
  };


  // Auto API 

  getBrandList(){

      let formData = new FormData() ;

      formData.append('dataName' , 'Marken' );
      formData.append('searchVal' , 'FzArt=01+02;');
      formData.append('language' , 'En+De+Fr+It' );

    return this.http.post( this.autoApiUrl , formData ).map(res => res.json());

  };

  getModleList(data:any){

      let formData = new FormData() ;

      // let language = window.localStorage.getItem('language') == 'en' ? 'En' : window.localStorage.getItem('language') == 'de' ? 'De' 
      // : window.localStorage.getItem('language') == 'fr' ?'Fr':window.localStorage.getItem('language') == 'it' ?'It' :'En' ;

      let language = 'En' ;

      formData.append('dataName' , 'ModellGruppen' );
      formData.append('searchVal' , 'FzArt=01+02;' + 'MarkenNr=' + data );
      formData.append('language' , language );
     // formData.append('MarkenNr' , data );

     //window.localStorage.getItem('language')

    return this.http.post( this.autoApiUrl , formData).map(res => res.json());

  };

  getMinMaxYears(data:any){

      let formData = new FormData() ;

      // let language = window.localStorage.getItem('language') == 'en' ? 'En' : window.localStorage.getItem('language') == 'de' ? 'De' 
      // : window.localStorage.getItem('language') == 'fr' ?'Fr':window.localStorage.getItem('language') == 'it' ?'It' :'En' ;

      let language = 'En' ;

      formData.append('dataName' , 'ModellGruppen' );
      formData.append('searchVal' , 'FzArt=01+02;MarkenNr=' + data + 'ModGrpKey=' + data );
      formData.append('language' , language );
     // formData.append('MarkenNr' , data );

     //window.localStorage.getItem('language')

    return this.http.post( this.autoApiUrl , formData).map(res => res.json());

  };

  getAllModels(data : any,regDate:any){

    let formData = new FormData() ;

    // let language = window.localStorage.getItem('language') == 'en' ? 'En' : window.localStorage.getItem('language') == 'de' ? 'De' 
    //   : window.localStorage.getItem('language') == 'fr' ?'Fr':window.localStorage.getItem('language') == 'it' ?'It' :'En' ;

    let language = 'En' ;

    formData.append('dataName' , 'Fahrzeuge' );
    formData.append('searchVal' , 'TypSchNr=' + data );
    formData.append('Prodyear' , regDate);
    formData.append('type' , 'certificate');
    formData.append('language' , language );
   // formData.append('MarkenNr' , data );

   return this.http.post( this.autoApiUrl , formData).map(res => res.json());

  };

  getModelDetails(data:any){

      let formData = new FormData() ;

      // let language = window.localStorage.getItem('language') == 'en' ? 'En' : window.localStorage.getItem('language') == 'de' ? 'De' 
      // : window.localStorage.getItem('language') == 'fr' ?'Fr':window.localStorage.getItem('language') == 'it' ?'It' :'En' ;

      let language = 'En' ;

      formData.append('dataName' , 'Fahrzeuge' );
      //formData.append('searchVal' , 'FzArt=01;' + 'FzKey=' + data );
      formData.append('searchVal' , 'FzArt=01;FzKey=' + data);
      
      formData.append('language' , language );
      //formData.append('FzKey' , data );

    return this.http.post( this.autoApiUrl , formData ).map(res => res.json());

  };


  // End




  



  // getRecentOffers(vechileId:any){

  //   var url = this.baseUrl + "api/getRecentOffers";
  //   //this.showLoading();

  //   let headers = new Headers();
    
  //   headers.append('language', window.localStorage.getItem('language'));
  //   headers.append('token', window.localStorage.getItem('token'));

  //   let body = new FormData();

  //   body.append('vehicle_id', vechileId);

  //   return this.http.post(url, body,{headers:headers}).map(res => res.json());

    
  // };


}
