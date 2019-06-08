import { Component } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

// IMPORT API AND MODAL PAGE
import { ApiProvider } from "../../providers/api/api";
import { ModalPage } from '../modal/modal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  containers: Array<any> = [];               // CONTAINS ALL AVAILABLE CONTAINERS
  images: Array<any> = [];                   // CONTAINS ALL AVAILABLE IMAGES
  load: boolean = false;                     // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED

  container_to_show_stats: any = null;       // CONTAINER VARIABLE THAT IS PASSED TO 'STATS' COMPONENT
  container_to_show_logs: any = null;        // CONTAINER VARIABLE THAT IS PASSED TO 'LOGS' COMPONENT

  constructor( public api: ApiProvider, public modalCtrl: ModalController, private alertCtrl: AlertController) {
    // GET CONTAINERS AND IMAGES
    this.getAvailableContainers();
    this.getAvailableImages();
  }

///////////////////////////////////////////////////////////////////////////
// GET ALL CONTAINERS 
///////////////////////////////////////////////////////////////////////////
  getAvailableContainers() {
    // ACTIVATE LOAD ICON
    this.load = true;

    this.api.getListOfContainers().subscribe(res => {
        
        // EMPTY CONTAINERS LIST
        this.containers = [];

        // MAP RESULT
        res.map(cont => {
            this.containers.push(cont);
        });

        // setTimeout(() => {
        //     this.getAvailableContainers();
        // }, 2000);

        // STOP LOAD ICON
        setTimeout(() => {
          this.load = false;
        }, 2000);

    },
      err => {
        // setTimeout(() => {
        //     this.getAvailableContainers();
        // }, 2000);

        // STOP LOAD ICON
        setTimeout(() => {
          this.load = false;
        }, 2000);

        // DEBUG MESSAGE
        console.error("ERROR while getListOfContainers: " + JSON.stringify(err));
        let msg = "Error while getting list of containers. Try again.";
        this.alertGlobal(msg);
    });
  }

///////////////////////////////////////////////////////////////////////////
// GET ALL IMAGES
///////////////////////////////////////////////////////////////////////////
  getAvailableImages() {
    this.api.getListOfImages().subscribe(res => {
        
        // EMPTY IMAGES LIST
        this.images = [];

        // MAP RESULT
        res.map(img => {
            this.images.push(img);
        });
    },
      err => {

        // DEBUG MESSAGE
        console.error("ERROR while getListOfContainers: " + JSON.stringify(err));
        let msg = "Error while getting list of images. Try again.";
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
// EVENT EMMITER TO CATCH TRIGGER OF STATS FROM EACH COMPONENT
///////////////////////////////////////////////////////////////////////////
  onStats(contStats) {
    // DEBUG MESSAGE
    console.info('onStats');

    // CHECK IF COMPONENT 'STATS' IS EMPTY
    if (this.container_to_show_stats == null) {
      // CHECK IF STATS ICON OF COMPONENT WAS CLICKED 'toggle',
      // IF YES ACTIVATE STATS COMPONENT BY PASSING CONTAINER
      if (contStats.fun == 'toggle') {
        // DEBUG MESSAGE
        console.log("Activate logs on container: " + contStats.container.Names[0]);

        // ASSIGN STATS COMPONENT
        this.container_to_show_stats = contStats.container;
      }
    } else {
      // COMPONENT 'STATS' IS NON-EMPTY
      // CHECK IF COMPONENT 'STATS' CONTAINS THE SAME COMNTAINER
      // IF YES, DISABLE 'STATS' COMPONET
      if (contStats.container.Id == this.container_to_show_stats.Id) {
        // DEBUG MESSAGE
        console.log("Already Showing logs for this container. Will disable");
        
        // EMPTY 'STATS' COMPONENT
        this.container_to_show_stats = null;
      } else {
        // TWO CASES HERE, FIRST IS THAT THE 'STATS' ICON WAS TOGGLED
        // IN WHICH CASE WE ASSIGN CONTAINER TO 'STATS'
        if (contStats.fun == 'toggle') {
          // DEBUG MESSAGE
          console.log("Activate logs on container: " + contStats.container.Names[0]);
          
          // EMPTY AND ASSIGN AFTER 10MS TO RE-INITIALIZE
          this.container_to_show_stats = null;
          setTimeout(() => {
            this.container_to_show_stats = contStats.container;
          }, 10);
        }
      }
    }
  }

///////////////////////////////////////////////////////////////////////////
// EVENT EMMITER TO CATCH TRIGGER OF LOGS FROM EACH COMPONENT
///////////////////////////////////////////////////////////////////////////
  onLogs(contLogs) {
    // DEBUG MESSAGE
    console.info('onLogs');

    // CHECK IF COMPONENT 'LOGS' IS EMPTY
    if (this.container_to_show_logs == null) {
      // CHECK IF LOGS ICON OF COMPONENT WAS CLICKED 'toggle',
      // IF YES ACTIVATE LOGS COMPONENT BY PASSING CONTAINER
      if (contLogs.fun == 'toggle') {
        // DEBUG MESSAGE
        console.log("Activate logs on container: " + contLogs.container.Names[0]);

        // ASSIGN LOGS COMPONENT
        this.container_to_show_logs = contLogs.container;
      }
    } else {
      // COMPONENT 'LOGS' IS NON-EMPTY
      // CHECK IF COMPONENT 'LOGS' CONTAINS THE SAME COMNTAINER
      // IF YES, DISABLE 'LOGS' COMPONET
      if (contLogs.container.Id == this.container_to_show_logs.Id) {
        // DEBUG MESSAGE
        console.log("Already Showing logs for this container. Will disable");

        // EMPTY 'LOGS' COMPONENT
        this.container_to_show_logs = null;
      } else {
        // TWO CASES HERE, FIRST IS THAT THE 'LOGS' ICON WAS TOGGLED
        // IN WHICH CASE WE ASSIGN CONTAINER TO 'LOGS'
        if (contLogs.fun == 'toggle') {
          // DEBUG MESSAGE
          console.log("Activate logs on container: " + contLogs.container.Names[0]);

          // EMPTY AND ASSIGN AFTER 10MS TO RE-INITIALIZE
          this.container_to_show_logs = null;
          setTimeout(() => {
            this.container_to_show_logs = contLogs.container;
          }, 10);
        }
      }
    }
  }

////////////////////////////// PAGE HELPERS ////////////////////////////////////////

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
