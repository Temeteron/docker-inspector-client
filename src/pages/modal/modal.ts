import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  loader: any = null;                // LOADER VAR FOR ASYNC REQUESTS
  images: any = null;                // ARRAY THAT CONTAINS AVAILABLE IMAGES
  image_name: any = null;            // VARIABLE TO SAVE IMAGE NAME TO PULL
  load_images: boolean = false;      // BOOLEAN IF IMAGE WAS PULLED = TRUE

  constructor(private loadingCtrl: LoadingController, private api: ApiProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.images = this.navParams.get('images');
  }

///////////////////////////////////////////////////////////////////////////
// CREATE CONTAINER FROM GIVER IMAGE
///////////////////////////////////////////////////////////////////////////
  createContainer(img_name) {
    // SHOW LOADER
    this.presentLoading();
    this.api.createContainer(img_name.toString()).subscribe(res => {
        // DISMISS LOADER
        this.dismissLoader();
        // DISMISS MODAL
        this.dismiss(this.load_images);
    });
  }

///////////////////////////////////////////////////////////////////////////
// PULL IMAGE FROM REPOSITORY
///////////////////////////////////////////////////////////////////////////
  pullImage() {
    // BECAUSE IMAGE WAS PULLED INFORM PARENT TO 
    // GET THE NEW LIST OF IMAGES
    this.load_images = true;

    // SHOW LOADER
    this.presentLoading();
    this.api.pullImage(this.image_name).subscribe(res => {
        // DISMISS LOADER
        this.dismissLoader();
        // DISMISS MODAL
        this.dismiss(this.load_images);
    },
      err => {
        // DISMISS LOADER
        this.dismissLoader();
        // DISMISS MODAL
        this.dismiss(this.load_images);
    });
  }

///////////////////////////////////////////////////////////////////////////
// DISMIIS MODAL
///////////////////////////////////////////////////////////////////////////
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

///////////////////////////////////////////////////////////////////////////
// SHOW LOADER
///////////////////////////////////////////////////////////////////////////
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present();
  }

///////////////////////////////////////////////////////////////////////////
// DISMISS LOADER
///////////////////////////////////////////////////////////////////////////
  dismissLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

}
