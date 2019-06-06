import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";
import { HomePage } from "../../pages/home/home";


/**
 * Generated class for the ContainerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'container',
  templateUrl: 'container.html'
})
export class ContainerComponent {
  @Input() container: any;
  loader: any = null;


  constructor(public navParams: NavParams, public navCtrl: NavController, public api: ApiProvider, public loadingCtrl: LoadingController,) {
    // console.log(`Name: ${this.navParams.get('name')}`);
    // this.name = this.navParams.get('name');
  }

  start() {
    this.presentLoading();
    this.api.startContainer(this.container.Id).subscribe(res => {
        this.dismissInitLoader();
        this.refreshHomePage();
        // console.log(res);
    },
      err => {
        this.dismissInitLoader();
        console.error(err);
    });
  }

  stop() {
    this.presentLoading();
    this.api.stopContainer(this.container.Id).subscribe(res => {
        this.dismissInitLoader();
        this.refreshHomePage();
        // console.log(res);
    },
      err => {
        this.dismissInitLoader();
        console.error(err);
    });
  }

  delete() {
    this.presentLoading();
    this.api.deleteContainer(this.container.Id).subscribe(res => {
        this.dismissInitLoader();
        this.refreshHomePage();
        // console.log(res);
    },
      err => {
        this.dismissInitLoader();
        console.error(err);
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present();
  }

  refreshHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  dismissInitLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }
}
