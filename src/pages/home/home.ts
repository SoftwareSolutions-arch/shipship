import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ItemSliding, Refresher, Searchbar } from 'ionic-angular';
import { SqlProvider } from "../../providers/sql/sql";
import { animate, state, style, transition, trigger } from "@angular/animations";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]
    ),
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ])
  ]
})
export class HomePage {
  @ViewChild('searchbar') searchbar: Searchbar;

  parcelListFull: any = [];
  parcelList: any = [];
  noParcels: boolean = false;
  searchText: any = '';
  isSearchbar: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public sql: SqlProvider,
    public modalCtrl: ModalController) {
    this.getParcels();
  }

  ionViewDidLoad() {
  }

  editParcel(parcel) {
    this.navCtrl.push('EditparcelPage', { parcel: parcel });
  }

  addNewParcel() {
    let modal = this.modalCtrl.create('NewparcelPage');
    modal.onDidDismiss(data => {
      if (data && data.reload) {
        this.getParcels();
      }
    });
    modal.present();
  }

  openDetailpage(item) {
    this.navCtrl.push('DetailsPage', { parcel: item });
  }

  archive(parcel: any, slidingItem: ItemSliding) {
    slidingItem.close();
    this.sql.updateArchive(parcel.id).then(succ => {
      this.parcelList = this.parcelList.filter(item => {
        if (item.id !== parcel.id) {
          return item;
        }
      });
      this.parcelListFull = this.parcelListFull.filter(item => {
        if (item.id !== parcel.id) {
          return item;
        }
      });
    });
  }

  delete(parcel: any, slidingItem: ItemSliding, index) {
    slidingItem.close();
    this.sql.deleteArchive(parcel.id).then(succ => {
      this.parcelList.splice(index, 1);
      this.parcelListFull.splice(index, 1);
    });
  }

  private getParcels() {
    this.sql.getData().then(data => {
      console.log(data);
      this.parcelList = data;
      this.parcelListFull = data;
      this.parcelList.length > 0 ? this.noParcels = false : this.noParcels = true;
    })
  }

  search() {
    console.log('search called !!!');
    if (this.searchText.trim() == '') {
      this.getParcels();
    }
    this.parcelList = this.parcelListFull.filter(item => {
      if (item.courier.includes(this.searchText.trim()) || item.senderParcel.includes(this.searchText.trim())) {
        return item;
      }
    })
  }

  toggleSearch() {
    this.isSearchbar = !this.isSearchbar;
    if (this.isSearchbar) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 200)
    }
  }

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      this.getParcels();
      refresher.complete();
    }, 600);
  }
}
