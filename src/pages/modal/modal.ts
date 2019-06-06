import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Events, AlertController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  images: any = null;


  constructor(public navCtrl: NavController, public events: Events, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private api: ApiProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.images = this.navParams.get('images');
  }

  createContainer() {
    console.log("Creating Container");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present();
  }

}
