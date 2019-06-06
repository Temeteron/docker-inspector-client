import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { ContainerComponent } from "../../components/container/container";
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

  constructor(public navCtrl: NavController, public api: ApiProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    // this.containers = [
    //  { name: "Container 1", prop: "" },
    //  { name: "Container 2", prop: "" },
    //  { name: "Container 3", prop: "" },
    // ];
    // setInterval(() => {
    //     this.getAvailableContainers();
    // }, 3000);
    this.getAvailableContainers();

    this.getAvailableImages();

  }

  addContainer() {
    let cont = { name: "Container 1", prop: "" };
    this.add(cont);
  }

  add(container) {
    this.containers.push(container);
  }

  getAvailableContainers() {
    this.presentLoading();

    this.api.getListOfContainers().subscribe(res => {
        // console.log(JSON.stringify(res));
        this.containers = [];
        res.map(cont => {
            this.containers.push(cont);
        });
        this.dismissInitLoader();
    },
      err => {
        this.dismissInitLoader();
        // console.log("ERROR while getListOfContainers: " + JSON.stringify(err));
        let msg = "Error while getting list of containers. Try again.";
        this.alertGlobal(msg);
    });
  }

  getAvailableImages() {
    // this.presentLoading();

    this.api.getListOfImages().subscribe(res => {
        // console.log(JSON.stringify(res));
        this.images = [];
        res.map(img => {
            this.images.push(img);
        });
        // console.log(JSON.stringify(this.images))
        // this.dismissInitLoader();
    },
      err => {
        // this.dismissInitLoader();
        // console.log("ERROR while getListOfContainers: " + JSON.stringify(err));
        let msg = "Error while getting list of images. Try again.";
        this.alertGlobal(msg);
    });
  }

  createContainerModal() {
      let modal = this.modalCtrl.create(ModalPage, {
          images: this.images
      });

      modal.present();
  }

  pullImageModal() {

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
