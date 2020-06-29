import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {SqlProvider} from "../../providers/sql/sql";
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-newparcel',
  templateUrl: 'newparcel.html',
})
export class NewparcelPage {
  parcel = {
    trackerID : '',
    courier : '',
    senderParcel : '',
    content : '',
    isArchive : '0'
  }
  constructor(public navCtrl: NavController,
              public sql: SqlProvider,
              public util: UtilProvider,
              public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewparcelPage');
  }

  addParcel(){
    if (this.parcel.trackerID.trim() == ''){
      this.util.presentToast('Please enter tracking number');
      return;
    }else if (this.parcel.courier.trim() == ''){
      this.util.presentToast('Please enter courier');
      return;
    }
    //trackerID, courier, sender, content, addedDate, isArchive
    let data = [this.parcel.trackerID,this.parcel.courier,this.parcel.senderParcel,this.parcel.content, Date.now().toString(), '0'];
    this.sql.insertData(data).then(succ=>{
      this.parcel = {
        trackerID : '',
        courier : '',
        senderParcel : '',
        content : '',
        isArchive : '0'
      }
      this.viewCtrl.dismiss({reload:true});
    }).catch(err=>{
      console.log('ERROR :',err);
    })
  }

  close(){
    this.viewCtrl.dismiss({reload:false});
  }
}
