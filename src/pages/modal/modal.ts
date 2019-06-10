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

  // EXAMPLE REPO NAMES TO PULL IMAGE
  example_images: Array<string> = ['chentex/random-logger:latest', 'enhariharan/infinite-loop:latest', 'hello-world:latest'];

  constructor(private loadingCtrl: LoadingController, private api: ApiProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.images = this.navParams.get('images');
  }

///////////////////////////////////////////////////////////////////////////
// PULL IMAGE FROM REPOSITORY
///////////////////////////////////////////////////////////////////////////
  pullImage() {
    // BECAUSE A NEW IMAGE WAS PULLED INFORM PARENT TO 
    // GET THE NEW LIST OF IMAGES
    let objMsg = {
      'load_images': true,
      'load_containers': false,
      'message': ''
    };

    // SHOW LOADER
    this.presentLoading();
    this.api.pullImage(this.image_name).subscribe(res => {
        // DEBUG MESSAGE
        // console.log('Res pullImage: ' + JSON.stringify(res));

        // DISMISS LOADER
        this.dismissLoader();

        // CHECK IF THERE IS A WARNING AND RETURN MESSAGE
        objMsg.message = (res.status == 'Warning') ? (`Warning. ${res.message}`) : (res[res.length-1].status);

        // DISMISS MODAL
        this.dismiss(objMsg);
    },
      err => {
        // DEBUG MESSAGE
        console.error('Error pullImage: ' + JSON.stringify(err));

        // DISMISS LOADER
        this.dismissLoader();

        // ERROR MESSAGE TO SHOW
        objMsg.message = `Error: ${err.status}. ${err.statusText}`;
        // CHECK IF SERVER IS DOWN, IF YES DONT MAKE FURTHER REQUESTS
        objMsg.load_images = err.status == 0 ? false : true;

        // DISMISS MODAL
        this.dismiss(objMsg);
    });
  }

///////////////////////////////////////////////////////////////////////////
// CREATE CONTAINER FROM GIVEN IMAGE
///////////////////////////////////////////////////////////////////////////
  createContainer(img_name) {
    // BECAUSE A NEW CONTAINER WAS CREATED INFORM PARENT TO 
    // GET THE NEW LIST OF CONTAINERS
    let objMsg = {
      'load_images': false,
      'load_containers': true,
      'message': ''
    };

    // SHOW LOADER
    this.presentLoading();
    this.api.createContainer(img_name.toString()).subscribe(res => {
        // DEBUG MESSAGE
        // console.log('Res createContainer: ' + JSON.stringify(res));

        // DISMISS LOADER
        this.dismissLoader();

        // DISMISS MODAL
        this.dismiss(null);
    },
      err => {
        // DEBUG MESSAGE
        console.error('Error createContainer: ' + JSON.stringify(err));

        // DISMISS LOADER
        this.dismissLoader();

        // ERROR MESSAGE TO SHOW
        objMsg.message = `Error ${err.status}: ${err.statusText}`;
        // CHECK IF SERVER IS DOWN, IF YES DONT MAKE FURTHER REQUESTS
        objMsg.load_containers = err.status == 0 ? false : true;

        // DISMISS MODAL
        this.dismiss(objMsg);
    });
  }

  ////////////////////TO DOO////////////

///////////////////////////////////////////////////////////////////////////
// DELETE IMAGE
///////////////////////////////////////////////////////////////////////////
  deleteImage(img_name) {
    console.log('deleteImage: ' + img_name);
    // BECAUSE A NEW CONTAINER WAS CREATED INFORM PARENT TO 
    // GET THE NEW LIST OF CONTAINERS
    let objMsg = {
      'load_images': true,
      'load_containers': false,
      'message': ''
    };


    // SHOW LOADER
    this.presentLoading();
    this.api.deleteImage(img_name.toString()).subscribe(res => {
        // DEBUG MESSAGE
        // console.log('Res deleteImage: ' + JSON.stringify(res));

        // DISMISS LOADER
        this.dismissLoader();

        // MESSAGE TO SHOW
        objMsg.message = 'Image deleted';

        // DISMISS MODAL
        this.dismiss(objMsg);
    },
      err => {
        // DEBUG MESSAGE
        console.error('Error deleteImage: ' + JSON.stringify(err));

        // DISMISS LOADER
        this.dismissLoader();

        // ERROR MESSAGE TO SHOW
        objMsg.message = `Error ${err.status}: ${err.statusText}`;
        // CHECK IF SERVER IS DOWN, IF YES DONT MAKE FURTHER REQUESTS
        objMsg.load_containers = err.status == 0 ? false : true;

        // DISMISS MODAL
        this.dismiss(objMsg);
    });
  }

///////////////////////////////////////////////////////////////////////////
// SELECT IMAGE TO PULL
///////////////////////////////////////////////////////////////////////////
  selectImageToPull(name) {
    this.image_name = name;
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
