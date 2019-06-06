import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";

import { ModalPage } from '../modal/modal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  containers: Array<any> = [];
  images: Array<any> = [];
  loader: any = null;
  load: boolean = false;

  container_to_show_stats: any = null;
  container_to_show_logs: any = null;

  constructor(public navCtrl: NavController, public api: ApiProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.getAvailableContainers();
    this.getAvailableImages();

    setInterval(() => {
        this.getAvailableContainers();
    }, 10000);
  }

///////////////////////////////////////////////////////////////////////////////////

  getAvailableContainers() {
    this.load = true;
    // this.presentLoading();
    this.api.getListOfContainers().subscribe(res => {
        // console.log(JSON.stringify(res));
        this.containers = [];
        res.map(cont => {
            this.containers.push(cont);
        });
        setTimeout(() => {
          this.load = false;
        }, 2000);
        // this.dismissInitLoader();
    },
      err => {
        setTimeout(() => {
          this.load = false;
        }, 2000);
        // this.dismissInitLoader();
        // console.log("ERROR while getListOfContainers: " + JSON.stringify(err));
        let msg = "Error while getting list of containers. Try again.";
        this.alertGlobal(msg);
    });
  }

  getAvailableImages() {
    this.api.getListOfImages().subscribe(res => {
        console.log("Getting available IMAGES");
        this.images = [];
        res.map(img => {
            this.images.push(img);
        });
    },
      err => {
        // console.log("ERROR while getListOfContainers: " + JSON.stringify(err));
        let msg = "Error while getting list of images. Try again.";
        this.alertGlobal(msg);
    });
  }

  createContainerModal() {
    let modal = this.modalCtrl.create(ModalPage, {
        images: this.images
    });

    modal.onDidDismiss(data => {
      // console.log(JSON.stringify(data));
      if (data) {
        this.getAvailableImages();
      }
      this.getAvailableContainers();;
    });

    modal.present();
  }

////////////////////////////// PAGE HELPERS ////////////////////////////////////////

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present();
  }

  dismissInitLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

  alertGlobal(msg) {
    let alert = this.alertCtrl.create({
      title: 'TRADELINE',
      subTitle: msg,
      buttons: ['ok']
    });
    alert.present();
  }

}
