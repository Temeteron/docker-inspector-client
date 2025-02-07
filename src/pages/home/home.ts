import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

// IMPORT API AND MODAL PAGE
import { ApiProvider } from '../../providers/api/api';
import { ModalPage } from '../modal/modal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  containers: Array<any> = [];               // CONTAINS ALL AVAILABLE CONTAINERS
  images: Array<any> = [];                   // CONTAINS ALL AVAILABLE IMAGES
  loading: boolean = false;                     // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED

  container_to_show_stats: any = null;       // CONTAINER VARIABLE THAT IS PASSED TO 'STATS' COMPONENT
  container_to_show_logs: any = null;        // CONTAINER VARIABLE THAT IS PASSED TO 'LOGS' COMPONENT

  // MESSAGE TO SHOW IF THERE ARE NO CONTAINERS AVAILABLE
  no_containers_messsage: string = "Currently there are no containers. Create one from the bottom right button.";

  constructor( public api: ApiProvider, public modalCtrl: ModalController, private alertCtrl: AlertController) {
    // GET CONTAINERS AND IMAGES
    this.refreshContainers();
    this.getAvailableImages();
  }

///////////////////////////////////////////////////////////////////////////
// GET ALL CONTAINERS 
///////////////////////////////////////////////////////////////////////////
  getAvailableContainers() {
    // DEBUG MESSAGE
    // console.log("getAvailableContainers");

    // ACTIVATE LOAD ICON
    this.loading = true;

    this.api.getListOfContainers().subscribe(res => {
        // DEBUG MESSAGE
        // console.log('Res getListOfContainers: ' + JSON.stringify(res));

        // REFRESH CONTAINERS LIST
        this.containers = res;
        this.loading = false;
    },
      err => {

        // STOP LOAD ICON
          this.loading = false;

        // DEBUG MESSAGE
        console.error("Error while getListOfContainers: " + JSON.stringify(err));

        // ERROR MESSAGE TO SHOW
        let msg = `Error while getting list of containers. Status: ${err.status}.`;
        this.alertGlobal(msg);
    });
  }


  refreshContainers() {
    // DEBUG MESSAGE
    // console.log('refreshContainers');

    this.loading = true;

    this.api.getListOfContainers().subscribe(res => {
        // DEBUG MESSAGE
        // console.log('Res getListOfContainers: ' + JSON.stringify(res));

        // REFRESH CONTAINERS LIST
        this.containers = res;
        this.loading = false;

        setTimeout(() => {
          this.refreshContainers();
        }, this.api.TIME_TO_REFRESH);
    });
  }

///////////////////////////////////////////////////////////////////////////
// GET ALL IMAGES
///////////////////////////////////////////////////////////////////////////
  getAvailableImages() {
    this.api.getListOfImages().subscribe(res => {
        // DEBUG MESSAGE
        // console.log('Res getListOfImages: ' + JSON.stringify(res));

        // EMPTY IMAGES LIST
        this.images = [];

        // MAP RESULT
        res.map(img => {
            this.images.push(img);
        });
    },
      err => {
        // DEBUG MESSAGE
        console.error("Error while getListOfImages: " + JSON.stringify(err));

        // ERROR MESSAGE TO SHOW
        let msg = `Error while getting list of images. Status: ${err.status}.`;
        this.alertGlobal(msg);
    });
  }

///////////////////////////////////////////////////////////////////////////
// MODAL TO CREATE CONTAINER FROM AVAILABLE IMAGE
// AND/OR DOWNLOAD A NEW IMAGE BY WRITING THE NAME OF REPO
///////////////////////////////////////////////////////////////////////////
  createContainerModal() {
    // CREATE MODAL AND PASS IMAGES
    let modal = this.modalCtrl.create(ModalPage, {
        images: this.images
    });

    // ON DISMISS OF MODAL GET NEW AVAILABLE IMAGES (IF ANY WAS PULLED)
    // AND CONTAINERS LIST
    modal.onDidDismiss(data => {

      if (data) {

        // UPDATE IMAGES
        if (data.load_images) {
          this.getAvailableImages();
        }

        // UPPDATE CONTAINERS
        if (data.load_containers) {
          this.getAvailableContainers();
        }

        // SHOW INFO MESSAGE
        if (data.message) {
          this.alertGlobal(data.message);
        }

      }

    });

    // SHOW MODAL
    modal.present();
  }

/////////////////// COMMUNICATION WITH CONTAINER COMPONENTS  ////////////////////////

///////////////////////////////////////////////////////////////////////////
// CONTAINER'S STATE CHANGED (START, STOP, DELETE)
///////////////////////////////////////////////////////////////////////////
  stateOfContainerChanged(stateObj) {
    // console.log('stateOfContainerChanged');

    // IF STOP DISABLE STATS,LOGS IF WERE ENABLED FOR THAT CONTAINER
    if (stateObj.fun == 'stop') {
      this.container_to_show_stats = this.assignDeactivateStatsLogs(stateObj.container, this.container_to_show_stats);
      this.container_to_show_logs = this.assignDeactivateStatsLogs(stateObj.container, this.container_to_show_logs);
    }

    this.getAvailableContainers();
  }

///////////////////////////////////////////////////////////////////////////
// HELP FUNCTION TO DEACTIVATE STATS-LOGS
// COMPONENT IF SELECTED CONTAINER STOPPED
///////////////////////////////////////////////////////////////////////////
  assignDeactivateStatsLogs(container, component) {
    return (component ? ((container.Id == component.Id) ? null : component) : null);
  }

///////////////////////////////////////////////////////////////////////////
// EVENT EMMITER TO CATCH TRIGGER OF STATS FROM EACH COMPONENT
///////////////////////////////////////////////////////////////////////////
  onStats(container) {
    // DEBUG MESSAGE
    // console.info('onStats');

    // CHECK IF COMPONENT 'STATS' CONTAINS THE SAME COMNTAINER
    // IF YES, DISABLE 'STATS' COMPONET
    if (this.container_to_show_stats && (container.Id == this.container_to_show_stats.Id)) {
      // DEBUG MESSAGE
      // console.log("Already Showing stats for this container. Will disable");
      
      // EMPTY 'STATS' COMPONENT
      this.container_to_show_stats = null;
    } else {
      // DEBUG MESSAGE
      // console.log("Activate stats on container: " + container.Names[0]);
      
      // EMPTY AND ASSIGN AFTER 10MS TO RE-INITIALIZE
      this.container_to_show_stats = null;
      setTimeout(() => {
        this.container_to_show_stats = container;
      }, 10);
    }
  }

///////////////////////////////////////////////////////////////////////////
// EVENT EMMITER TO CATCH TRIGGER OF LOGS FROM EACH COMPONENT
///////////////////////////////////////////////////////////////////////////
  onLogs(container) {
    // DEBUG MESSAGE
    // console.info('onLogs');

    // CHECK IF COMPONENT 'LOGS' CONTAINS THE SAME COMNTAINER
    // IF YES, DISABLE 'LOGS' COMPONET
    if (this.container_to_show_logs && (container.Id == this.container_to_show_logs.Id)) {
      // DEBUG MESSAGE
      // console.log("Already Showing logs for this container. Will disable");

      // EMPTY 'LOGS' COMPONENT
      this.container_to_show_logs = null;
    } else {
      // DEBUG MESSAGE
      // console.log("Activate logs on container: " + container.Names[0]);

      // EMPTY AND ASSIGN AFTER 10MS TO RE-INITIALIZE
      this.container_to_show_logs = null;
      setTimeout(() => {
        this.container_to_show_logs = container;
      }, 10);
    }
  }

///////////////////////////////////////////////////////////////////////////
// EVENT EMMITER TO DACTIVATE STATS BECAUSE
// CONTAINER IS NO LONGER RUNNING
///////////////////////////////////////////////////////////////////////////
  disableStatsComponent() {
    this.container_to_show_stats = null;
  }

////////////////////////// PAGE HELPERS ///////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// IMPROVE FOR LOOPS REMDERIMG PERFORMANCE
///////////////////////////////////////////////////////////////////////////
  trackByFn(index, item) {
    return item.Id;
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
