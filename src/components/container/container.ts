import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";

@Component({
  selector: 'container',
  templateUrl: 'container.html'
})
export class ContainerComponent {
  @Input() container: any;                                      // CONTAINER OBJECTS PASSED FROM PARENT
  @Output() stats = new EventEmitter<any>();                    // VAR TO COMMUNICATE WITH PAREMT ABOUT STATS
  @Output() logs = new EventEmitter<any>();                     // VAR TO COMMUNICATE WITH PAREMT ABOUT LOGS
  @Output() changedState = new EventEmitter<boolean>();         // VAR TO COMMUNICATE WITH PARENT BECAUSE STATE CHANGED

  colorStats: string = 'dark';
  activeStats: boolean = false;
  activeLogs: boolean = false;
  loader: any = null;                                           // LOADER VAR FOR ASYNC REQUESTS

  constructor(public api: ApiProvider, public loadingCtrl: LoadingController) {}

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
  toggleStats(fun) {
    // console.info(fun+' Stats');
    // this.activeStats = activate;
    // this.setColorStats();
    let statsObj = {
      "container": this.container,
      "fun": fun
    }

    this.stats.emit(statsObj);
  }

///////////////////////////////////////////////////////////////////////////
// EMIT EVENT TO INFORM PARENT THAT LOGS WAS TOGGLED,
// EITHER BY CLICKING BUTTON OR BY STOPPING THE CONTAINER
///////////////////////////////////////////////////////////////////////////
  toggleLogs(fun) {
    // console.info(fun+' Logs');
    // this.activeLogs = activate;
    // this.setColorStats();
    let logsObj = {
      "container": this.container,
      "fun": fun
    }

    this.logs.emit(logsObj);
  }

///////////////////////////////////////////////////////////////////////////
// START CONTAINER
///////////////////////////////////////////////////////////////////////////
  start() {
    // SHOW LOADER
    this.presentLoading();

    // CALL TO SERVER
    this.api.startContainer(this.container.Id).subscribe(res => {
        // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
        this.stateChanged();
        //DISMISS LOADER
        this.dismissInitLoader();
    },
      err => {
        // DEBUG MESSAGE
        console.error("Error start: " + err);
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
        // DEACTIVATE STATS-LOGS BECAUSE THERE ARE NO STATS-LOGS
        //WHEN CONTAINER IS NOT RUNNING
        this.toggleStats('stop');
        this.toggleLogs('stop');

        // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
        this.stateChanged();
        //DISMISS LOADER
        this.dismissInitLoader();
    },
      err => {
        // DEBUG MESSAGE
        console.error("Error stop: " + err);
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
        // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
        this.stateChanged();
        //DISMISS LOADER
        this.dismissInitLoader();
    },
      err => {
        // DEBUG MESSAGE
        console.error("Error delete: " + err);
        //DISMISS LOADER
        this.dismissInitLoader();
    });
  }


///////////////////////////////////////////////////////////////////////////
// EMIT EVENT TO PARENT THAT
// STATE WAS CHANGED (RUNNING, EXITED, CREATED)
///////////////////////////////////////////////////////////////////////////
  stateChanged() {
    // DEBUG MESSAGE
    console.log("stateChanged");
    this.changedState.emit(true);
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
}
