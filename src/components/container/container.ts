import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";
import { HomePage } from "../../pages/home/home";


@Component({
  selector: 'container',
  templateUrl: 'container.html'
})
export class ContainerComponent {
  @Input() container: any;
  @Output() stats = new EventEmitter<any>();
  @Output() changedState = new EventEmitter<boolean>();
  colorStats: string = 'dark';
  activeStats: boolean = false;
  loader: any = null;

  constructor(public navParams: NavParams, public navCtrl: NavController, public api: ApiProvider, public loadingCtrl: LoadingController) {

  }

  checkRunning(state) {
    if (state == 'running') {
      return true;
    } else {
      return false;
    }
  }

  toggleStats(activate) {
    this.activeStats = activate;
    // this.setColorStats();
    let statsObj = {
      "container": this.container,
      "active": this.activeStats
    }

    this.stats.emit(statsObj);
  }

  start() {
    this.presentLoading();
    this.api.startContainer(this.container.Id).subscribe(res => {
        this.stateChanged();
        this.dismissInitLoader();
    },
      err => {
        this.dismissInitLoader();
        console.log("Error start: " + err);
    });
  }

  stop() {
    this.presentLoading();
    this.api.stopContainer(this.container.Id).subscribe(res => {
        this.toggleStats(false);
        this.stateChanged();
        this.dismissInitLoader();
    },
      err => {
        this.dismissInitLoader();
        console.log("Error stop: " + err);
    });
  }

  delete() {
    this.presentLoading();
    this.api.deleteContainer(this.container.Id).subscribe(res => {
        this.stateChanged();
        this.dismissInitLoader();
    },
      err => {
        this.dismissInitLoader();
        console.log("Error delete: " + err);
    });
  }

  stateChanged() {
    console.log("stateChanged");
    this.changedState.emit(true);
  }

  // setColorStats() {
  //   this.colorStats = this.activeStats ? 'secondary' : 'dark';
  //   console.log('Color: ' + this.colorStats);
  // }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present();
  }

  // refreshHomePage() {
  //   this.navCtrl.setRoot(HomePage);
  // }

  dismissInitLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }
}
