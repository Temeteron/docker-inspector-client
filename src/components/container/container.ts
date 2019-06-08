import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";

@Component({
  selector: 'container',
  templateUrl: 'container.html'
})
export class ContainerComponent {
  @Input() container: any;                                      // CONTAINER OBJECTS PASSED FROM PARENT
  @Output() stats = new EventEmitter<Object>();                    // VAR TO COMMUNICATE WITH PAREMT ABOUT STATS
  @Output() logs = new EventEmitter<Object>();                     // VAR TO COMMUNICATE WITH PAREMT ABOUT LOGS
  @Output() changedState = new EventEmitter<Object>();         // VAR TO COMMUNICATE WITH PARENT BECAUSE STATE CHANGED

  colorStats: string = 'dark';
  activeStats: boolean = false;
  activeLogs: boolean = false;
  loader: any = null;                                           // LOADER VAR FOR ASYNC REQUESTS

  constructor(public api: ApiProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

///////////////////////////////////////////////////////////////////////////
// CHECK IF CONTAINER IS RUNNING, SO THAT WE CAN 
// GIVE THE USER BUTTONS TO ACTIVATE STATS OR LOGS
///////////////////////////////////////////////////////////////////////////
  checkRunning(state) {
    if (state == 'running') {
      return true;
    } else {
      return false;
    }
  }

///////////////////////////////////////////////////////////////////////////
// EMIT EVENT TO INFORM PARENT THAT STATS WAS TOGGLED,
// EITHER BY CLICKING BUTTON OR BY STOPPING THE CONTAINER
///////////////////////////////////////////////////////////////////////////
  toggleStats() {
    // console.info(fun+' Stats');
    // this.activeStats = activate;
    // this.setColorStats();
    // let statsObj = {
    //   "container": this.container,
    //   "fun": fun
    // }

    this.stats.emit(this.container);
  }

///////////////////////////////////////////////////////////////////////////
// EMIT EVENT TO INFORM PARENT THAT LOGS WAS TOGGLED,
// EITHER BY CLICKING BUTTON OR BY STOPPING THE CONTAINER
///////////////////////////////////////////////////////////////////////////
  toggleLogs() {
    // console.info(fun+' Logs');
    // this.activeLogs = activate;
    // this.setColorStats();
    // let logsObj = {
    //   "container": this.container,
    // }

    this.logs.emit(this.container);
  }

///////////////////////////////////////////////////////////////////////////
// START CONTAINER
///////////////////////////////////////////////////////////////////////////
  start() {
    // SHOW LOADER
    this.presentLoading();

    // CALL TO SERVER
    this.api.startContainer(this.container.Id).subscribe(res => {
        console.log('Res startContainer: ' + JSON.stringify(res));

        // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
        this.stateChanged('start');
        //DISMISS LOADER
        this.dismissInitLoader();
    },
      err => {
        // DEBUG MESSAGE
        console.error("Error startContainer: " + JSON.stringify(err));
        //DISMISS LOADER
        this.dismissInitLoader();
    });
  }

///////////////////////////////////////////////////////////////////////////
// STOP CONTAINER
///////////////////////////////////////////////////////////////////////////
  stop() {
    // SHOW LOADER
    this.presentLoading();

    // CALL TO SERVER
    this.api.stopContainer(this.container.Id).subscribe(res => {
        // DEBUG MESSAGE
        console.log('Res stopContainer: ' + JSON.stringify(res));

        // // DEACTIVATE STATS-LOGS BECAUSE THERE ARE NO STATS-LOGS
        // //WHEN CONTAINER IS NOT RUNNING
        // this.toggleStats('stop');
        // this.toggleLogs('stop');

        // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
        this.stateChanged('stop');
        //DISMISS LOADER
        this.dismissInitLoader();
    },
      err => {
        // DEBUG MESSAGE
        console.error("Error stopContainer: " + JSON.stringify(err));

        //DISMISS LOADER
        this.dismissInitLoader();
    });
  }

///////////////////////////////////////////////////////////////////////////
// DELETE CONTAINER, IF IT IS RUNNING
// NOTHING WILL HAPPEN, EMPTY RESPONSE FROM SERVER
///////////////////////////////////////////////////////////////////////////
  delete() {
    // SHOW LOADER
    this.presentLoading();

    // CALL TO SERVER
    this.api.deleteContainer(this.container.Id).subscribe(res => {
      // DEBUG MESSAGE
        console.log('Res deleteContainer: ' + JSON.stringify(res));

        // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
        this.stateChanged('delete');
        //DISMISS LOADER
        this.dismissInitLoader();
    },
      err => {
        // DEBUG MESSAGE
        console.error("Error deleteContainer: " + JSON.stringify(err));

        //DISMISS LOADER
        this.dismissInitLoader();

        // ERROR MESSAGE TO SHOW
        let msg = `Error: ${err.status}. ${err.statusText}. Cannot delete while running.`
        this.alertGlobal(msg);
    });
  }


///////////////////////////////////////////////////////////////////////////
// EMIT EVENT TO PARENT THAT
// STATE WAS CHANGED (RUNNING, EXITED, CREATED)
///////////////////////////////////////////////////////////////////////////
  stateChanged(fun) {
    // DEBUG MESSAGE
    console.log("stateChanged");
    let stateObj = {
      "container": this.container,
      "fun": fun
    }
    this.changedState.emit(stateObj);
  }

  // setColorStats() {
  //   this.colorStats = this.activeStats ? 'secondary' : 'dark';
  //   console.log('Color: ' + this.colorStats);
  // }

////////////////////////////// PAGE HELPERS ////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// SHOW LOADING POPUP
///////////////////////////////////////////////////////////////////////////
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.loader.present();
  }

///////////////////////////////////////////////////////////////////////////
// DISMISS LOADER POPUP
///////////////////////////////////////////////////////////////////////////
  dismissInitLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }

///////////////////////////////////////////////////////////////////////////
// ALERT MESSAGE FOR ERRORS
///////////////////////////////////////////////////////////////////////////
  alertGlobal(msg) {
    let alert = this.alertCtrl.create({
      title: 'TRADELINE',
      subTitle: msg,
      buttons: ['ok']
    });
    alert.present();
  }

}
