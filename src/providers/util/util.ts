import { Injectable } from '@angular/core';
import {LoadingController, ToastController,Loading, ModalController, AlertController, Platform} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UtilProvider {
  loading: Loading;
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public modalController: ModalController,
    public platform: Platform, private translate: TranslateService,
  ) {
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 5000
    });
  
    this.loading.onDidDismiss(() => {
    });
    this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  //FOR PRESENT TOAST
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  //FOR BASIC TOAST
  presentCustomToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'dark-trans',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
  }

  //FOR ERROR TOAST
  presentErrorToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'error-toast',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
  }

  //FOR DATA NOT FOUND ERROR
  presentAlertData() {
    let alert = this.alertCtrl.create({
      title: 'Data not found',
      subTitle: 'Something went wrong',
      cssClass: 'alertDanger',
      buttons: [
        {
          text: 'Try Again!',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.presentErrorToast('No result found');
          }
        }
      ]
    });
    alert.present();
  }

  //FOR BASIC SERVER ERROR
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Server Error',
      subTitle: 'Something went wrong',
      cssClass: 'alertDanger',
      buttons: [
        {
          text: 'Try Again!',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

  //FOR CONFIRM NETWORK ERROR
  presentNetwork() {
    let alert = this.alertCtrl.create({
      title: 'Network Error',
      message: 'Internet not connected please try again.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            //this.navCtrl.push(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  //FOR DATA NOT FOUND ERROR
  addressAlertData() {
    let alert = this.alertCtrl.create({
      title: 'Data not found',
      subTitle:'Something went wrong',
      cssClass: 'alertDanger',
      buttons: [
        {
          text: 'ok',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
