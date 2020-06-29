import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditparcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editparcel',
  templateUrl: 'editparcel.html',
})
export class EditparcelPage {

  parcel :any = {}
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.parcel = navParams.data.parcel;
    console.log(this.parcel);
  }

  ionViewDidLoad() {

  }

  saveDetails(){
    this.viewCtrl.dismiss();
  }

  deleteDetails(){
    this.viewCtrl.dismiss();
  }
}
