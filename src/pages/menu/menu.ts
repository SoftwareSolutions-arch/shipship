import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  rootPage = "HomePage";
  constructor(public menuCtrl: MenuController, private socialSharing: SocialSharing,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  openPages(page) {
    this.nav.setRoot(page);
  }

  // social sharing plugin
  shareapp(message, subject, file, url) {
    // Share via
    this.socialSharing.share('ShipShip', 'ShipShip App', null, 'url').then((success) => {
      console.log(success, "success");
      // Success!
    }).catch((error) => {
      console.log(error, "error");
      // Error!
    });
  }

  exitApp() {
    if (window.confirm("Do you want to exit from app")) {
      navigator['app'].exitApp();
    }
  }

  //share via Email
  shareViaEmail() {
    this.socialSharing.shareViaEmail('body', 'subject', ['shipshiptheapp@gmail.com'], null).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
    })
  }
}
