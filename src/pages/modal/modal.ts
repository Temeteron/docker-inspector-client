import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Events } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  loader: any = null;
  images: any = null;
  image_name: any = null;
  load_images: boolean = false;

  constructor(public navCtrl: NavController, public events: Events, private loadingCtrl: LoadingController, private api: ApiProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.images = this.navParams.get('images');
  }

  createContainer(img_name) {
    // console.log(JSON.stringify(img_name.toString()));
    this.api.createContainer(img_name.toString()).subscribe(res => {
        this.loader = false;
        this.dismiss(this.load_images);
    });
  }

  pullImage() {
    this.load_images = true;
    this.presentLoading();
    // console.log("Will pull: " + this.image_name);
    this.api.pullImage(this.image_name).subscribe(res => {
        // console.log('Pull img: ' + JSON.stringify(res));
        this.dismissLoader();
        this.dismiss(this.load_images);
    },
      err => {
        this.dismissLoader();
        this.dismiss(this.load_images);
    });
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present();
  }

  dismissLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

}
