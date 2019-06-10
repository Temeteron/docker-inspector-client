webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_modal__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// IMPORT API AND MODAL PAGE


// import { Poll } from '../../utils/poll';
var HomePage = /** @class */ (function () {
    function HomePage(api, modalCtrl, alertCtrl) {
        this.api = api;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.containers = []; // CONTAINS ALL AVAILABLE CONTAINERS
        this.images = []; // CONTAINS ALL AVAILABLE IMAGES
        this.loading = false; // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED
        this.container_to_show_stats = null; // CONTAINER VARIABLE THAT IS PASSED TO 'STATS' COMPONENT
        this.container_to_show_logs = null; // CONTAINER VARIABLE THAT IS PASSED TO 'LOGS' COMPONENT
        // MESSAGE TO SHOW IF THERE ARE NO CONTAINERS AVAILABLE
        this.no_containers_messsage = "Currently there are no containers. Create one from the bottom right button.";
        // GET CONTAINERS AND IMAGES
        this.refreshContainers();
        this.getAvailableImages();
    }
    // kapoou() {
    //   new Poll(() => this.refreshContainers(), this.api.TIME_TO_REFRESH);
    // }
    ///////////////////////////////////////////////////////////////////////////
    // GET ALL CONTAINERS 
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.getAvailableContainers = function () {
        var _this = this;
        console.log("getAvailableContainers");
        // ACTIVATE LOAD ICON
        this.loading = true;
        this.api.getListOfContainers().subscribe(function (res) {
            // DEBUG MESSAGE
            // console.log('Res getListOfContainers: ' + JSON.stringify(res));
            // REFRESH CONTAINERS LIST
            _this.containers = res;
            // STOP LOAD ICON
            // setTimeout(() => {
            _this.loading = false;
            // }, this.TIME_TO_REFRESH);
        }, function (err) {
            // STOP LOAD ICON
            _this.loading = false;
            // DEBUG MESSAGE
            console.error("Error while getListOfContainers: " + JSON.stringify(err));
            // ERROR MESSAGE TO SHOW
            var msg = "Error while getting list of containers. Status: " + err.status + ".";
            _this.alertGlobal(msg);
        });
    };
    HomePage.prototype.refreshContainers = function () {
        var _this = this;
        return new Promise(function () {
            console.log('refreshContainers');
            _this.loading = true;
            _this.api.getListOfContainers().subscribe(function (res) {
                // DEBUG MESSAGE
                // console.log('Res getListOfContainers: ' + JSON.stringify(res));
                // REFRESH CONTAINERS LIST
                _this.containers = res;
                _this.loading = false;
                // setTimeout(() => {
                //   this.load = false;
                // }, this.TIME_TO_REFRESH - 2000);
                setTimeout(function () {
                    _this.refreshContainers();
                }, _this.api.TIME_TO_REFRESH);
            });
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // GET ALL IMAGES
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.getAvailableImages = function () {
        var _this = this;
        this.api.getListOfImages().subscribe(function (res) {
            // DEBUG MESSAGE
            // console.log('Res getListOfImages: ' + JSON.stringify(res));
            // EMPTY IMAGES LIST
            _this.images = [];
            // MAP RESULT
            res.map(function (img) {
                _this.images.push(img);
            });
        }, function (err) {
            // DEBUG MESSAGE
            console.error("Error while getListOfImages: " + JSON.stringify(err));
            // ERROR MESSAGE TO SHOW
            var msg = "Error while getting list of images. Status: " + err.status + ".";
            _this.alertGlobal(msg);
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // MODAL TO CREATE CONTAINER FROM AVAILABLE IMAGE
    // AND/OR DOWNLOAD A NEW IMAGE BY WRITING THE NAME OF REPO
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.createContainerModal = function () {
        var _this = this;
        // CREATE MODAL AND PASS IMAGES
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modal_modal__["a" /* ModalPage */], {
            images: this.images
        });
        // ON DISMISS OF MODAL GET NEW AVAILABLE IMAGES (IF ANY WAS PULLED)
        // AND CONTAINERS LIST
        modal.onDidDismiss(function (data) {
            if (data) {
                // UPDATE IMAGES
                if (data.load_images) {
                    _this.getAvailableImages();
                }
                // UPPDATE CONTAINERS
                if (data.load_containers) {
                    _this.getAvailableContainers();
                }
                // SHOW INFO MESSAGE
                if (data.message) {
                    _this.alertGlobal(data.message);
                }
            }
        });
        // SHOW MODAL
        modal.present();
    };
    /////////////////// COMMUNICATION WITH CONTAINER COMPONENTS  ////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // CONTAINER'S STATE CHANGED (START, STOP, DELETE)
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.stateOfContainerChanged = function (stateObj) {
        console.log('stateOfContainerChanged');
        // IF STOP DISABLE STATS,LOGS IF WERE ENABLED FOR THAT CONTAINER
        if (stateObj.fun == 'stop') {
            this.container_to_show_stats = this.assignDeactivateStatsLogs(stateObj.container, this.container_to_show_stats);
            this.container_to_show_logs = this.assignDeactivateStatsLogs(stateObj.container, this.container_to_show_logs);
        }
        this.getAvailableContainers();
    };
    ///////////////////////////////////////////////////////////////////////////
    // HELP FUNCTION TO DEACTIVATE STATS-LOGS
    // COMPONENT IF SELECTED CONTAINER STOPPED
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.assignDeactivateStatsLogs = function (container, component) {
        return (component ? ((container.Id == component.Id) ? null : component) : null);
    };
    ///////////////////////////////////////////////////////////////////////////
    // EVENT EMMITER TO CATCH TRIGGER OF STATS FROM EACH COMPONENT
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.onStats = function (container) {
        var _this = this;
        // DEBUG MESSAGE
        console.info('onStats');
        // CHECK IF COMPONENT 'STATS' CONTAINS THE SAME COMNTAINER
        // IF YES, DISABLE 'STATS' COMPONET
        if (this.container_to_show_stats && (container.Id == this.container_to_show_stats.Id)) {
            // DEBUG MESSAGE
            console.log("Already Showing stats for this container. Will disable");
            // EMPTY 'STATS' COMPONENT
            this.container_to_show_stats = null;
        }
        else {
            // DEBUG MESSAGE
            console.log("Activate stats on container: " + container.Names[0]);
            // EMPTY AND ASSIGN AFTER 10MS TO RE-INITIALIZE
            this.container_to_show_stats = null;
            setTimeout(function () {
                _this.container_to_show_stats = container;
            }, 10);
        }
    };
    ///////////////////////////////////////////////////////////////////////////
    // EVENT EMMITER TO CATCH TRIGGER OF LOGS FROM EACH COMPONENT
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.onLogs = function (container) {
        var _this = this;
        // DEBUG MESSAGE
        console.info('onLogs');
        // CHECK IF COMPONENT 'LOGS' CONTAINS THE SAME COMNTAINER
        // IF YES, DISABLE 'LOGS' COMPONET
        if (this.container_to_show_logs && (container.Id == this.container_to_show_logs.Id)) {
            // DEBUG MESSAGE
            console.log("Already Showing logs for this container. Will disable");
            // EMPTY 'LOGS' COMPONENT
            this.container_to_show_logs = null;
        }
        else {
            // DEBUG MESSAGE
            console.log("Activate logs on container: " + container.Names[0]);
            // EMPTY AND ASSIGN AFTER 10MS TO RE-INITIALIZE
            this.container_to_show_logs = null;
            setTimeout(function () {
                _this.container_to_show_logs = container;
            }, 10);
        }
    };
    ///////////////////////////////////////////////////////////////////////////
    // EVENT EMMITER TO DACTIVATE STATS BECAUSE
    // CONTAINER IS NO LONGER RUNNING
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.disableStatsComponent = function () {
        this.container_to_show_stats = null;
    };
    ////////////////////////// PAGE HELPERS ///////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // IMPROVE FOR LOOPS REMDERIMG PERFORMANCE
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.trackByFn = function (index, item) {
        return item.Id;
    };
    ///////////////////////////////////////////////////////////////////////////
    // ALERT MESSAGE FOR ERRORS
    ///////////////////////////////////////////////////////////////////////////
    HomePage.prototype.alertGlobal = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'TRADELINE',
            subTitle: msg,
            buttons: ['ok']
        });
        alert.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title class="navTitle">Docker Inspector</ion-title>\n    <ion-spinner name="crescent" color="success" *ngIf="loading"></ion-spinner>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-template">\n  <div class="template-center">\n\n    <div *ngIf="!containers.length" class="alignTextCenter title-font">\n      {{ no_containers_messsage }}\n    </div>\n\n    <ion-card *ngIf="containers.length">\n      <ion-grid>\n\n        <ion-row class="padding-top8">\n          <ion-col class="title-font">\n            <b>\n              Container\n            </b>\n          </ion-col>\n\n          <ion-col class="title-font">\n            <b>\n              Image\n            </b>\n          </ion-col>\n\n          <ion-col class="title-font">\n            <b>\n              Status\n            </b>\n          </ion-col>\n\n          <ion-col class="title-font">\n            <b>\n              Actions\n            </b>\n          </ion-col>\n        </ion-row>\n\n          <ion-row class="no-padding">\n            <ion-col>\n              <hr>\n            </ion-col>\n          </ion-row>\n\n        <span *ngFor="let cont of containers; trackBy: trackByFn">\n          <container [container]="cont" (stats)="onStats($event)" (logs)="onLogs($event)" (changedState)="stateOfContainerChanged($event)"></container>\n        </span>\n      </ion-grid>\n    </ion-card>\n\n    <div *ngIf="container_to_show_stats" class="padding-top8">\n      <stats [container]="container_to_show_stats" (containerStopped)="disableStatsComponent($event)"></stats>\n    </div>\n\n    <div *ngIf="container_to_show_logs" class="padding-top8">\n      <logs [container]="container_to_show_logs"></logs>\n    </div>\n\n  </div>\n\n  <ion-fab class="fab-class">\n    <button ion-fab color="secondary" title="Create Container - Pull Image" (click)="createContainerModal()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ModalPage = /** @class */ (function () {
    function ModalPage(loadingCtrl, api, navParams, viewCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.api = api;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.loader = null; // LOADER VAR FOR ASYNC REQUESTS
        this.images = null; // ARRAY THAT CONTAINS AVAILABLE IMAGES
        this.image_name = null; // VARIABLE TO SAVE IMAGE NAME TO PULL
        // EXAMPLE REPO NAMES TO PULL IMAGE
        this.example_images = ['chentex/random-logger:latest', 'enhariharan/infinite-loop:latest', 'hello-world:latest'];
        this.images = this.navParams.get('images');
    }
    ///////////////////////////////////////////////////////////////////////////
    // PULL IMAGE FROM REPOSITORY
    ///////////////////////////////////////////////////////////////////////////
    ModalPage.prototype.pullImage = function () {
        var _this = this;
        // BECAUSE A NEW IMAGE WAS PULLED INFORM PARENT TO 
        // GET THE NEW LIST OF IMAGES
        var objMsg = {
            'load_images': true,
            'load_containers': false,
            'message': ''
        };
        // SHOW LOADER
        this.presentLoading();
        this.api.pullImage(this.image_name).subscribe(function (res) {
            // DEBUG MESSAGE
            // console.log('Res pullImage: ' + JSON.stringify(res));
            // DISMISS LOADER
            _this.dismissLoader();
            // CHECK IF THERE IS A WARNING AND RETURN MESSAGE
            objMsg.message = (res.status == 'Warning') ? ("Warning. " + res.message) : (res[res.length - 1].status);
            // DISMISS MODAL
            _this.dismiss(objMsg);
        }, function (err) {
            // DEBUG MESSAGE
            console.error('Error pullImage: ' + JSON.stringify(err));
            // DISMISS LOADER
            _this.dismissLoader();
            // ERROR MESSAGE TO SHOW
            objMsg.message = "Error: " + err.status + ". " + err.statusText;
            // CHECK IF SERVER IS DOWN, IF YES DONT MAKE FURTHER REQUESTS
            objMsg.load_images = err.status == 0 ? false : true;
            // DISMISS MODAL
            _this.dismiss(objMsg);
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // CREATE CONTAINER FROM GIVEN IMAGE
    ///////////////////////////////////////////////////////////////////////////
    ModalPage.prototype.createContainer = function (img_name) {
        var _this = this;
        // BECAUSE A NEW CONTAINER WAS CREATED INFORM PARENT TO 
        // GET THE NEW LIST OF CONTAINERS
        var objMsg = {
            'load_images': false,
            'load_containers': true,
            'message': ''
        };
        // SHOW LOADER
        this.presentLoading();
        this.api.createContainer(img_name.toString()).subscribe(function (res) {
            // DEBUG MESSAGE
            // console.log('Res createContainer: ' + JSON.stringify(res));
            // DISMISS LOADER
            _this.dismissLoader();
            // DISMISS MODAL
            _this.dismiss(null);
        }, function (err) {
            // DEBUG MESSAGE
            console.error('Error createContainer: ' + JSON.stringify(err));
            // DISMISS LOADER
            _this.dismissLoader();
            // ERROR MESSAGE TO SHOW
            objMsg.message = "Error " + err.status + ": " + err.statusText;
            // CHECK IF SERVER IS DOWN, IF YES DONT MAKE FURTHER REQUESTS
            objMsg.load_containers = err.status == 0 ? false : true;
            // DISMISS MODAL
            _this.dismiss(objMsg);
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // DELETE IMAGE
    ///////////////////////////////////////////////////////////////////////////
    ModalPage.prototype.deleteImage = function (img_name) {
        var _this = this;
        console.log('deleteImage: ' + img_name);
        // BECAUSE A NEW CONTAINER WAS CREATED INFORM PARENT TO 
        // GET THE NEW LIST OF CONTAINERS
        var objMsg = {
            'load_images': true,
            'load_containers': false,
            'message': ''
        };
        // SHOW LOADER
        this.presentLoading();
        this.api.deleteImage(img_name.toString()).subscribe(function (res) {
            // DEBUG MESSAGE
            // console.log('Res deleteImage: ' + JSON.stringify(res));
            // DISMISS LOADER
            _this.dismissLoader();
            // MESSAGE TO SHOW
            objMsg.message = 'Image deleted';
            // DISMISS MODAL
            _this.dismiss(objMsg);
        }, function (err) {
            // DEBUG MESSAGE
            console.error('Error deleteImage: ' + JSON.stringify(err));
            // DISMISS LOADER
            _this.dismissLoader();
            // ERROR MESSAGE TO SHOW
            objMsg.message = "Error " + err.status + ": " + err.statusText;
            // CHECK IF SERVER IS DOWN, IF YES DONT MAKE FURTHER REQUESTS
            objMsg.load_containers = err.status == 0 ? false : true;
            // DISMISS MODAL
            _this.dismiss(objMsg);
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // SELECT IMAGE TO PULL
    ///////////////////////////////////////////////////////////////////////////
    ModalPage.prototype.selectImageToPull = function (name) {
        this.image_name = name;
    };
    ////////////////////////////// PAGE HELPERS ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // DISMIIS MODAL
    ///////////////////////////////////////////////////////////////////////////
    ModalPage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    ///////////////////////////////////////////////////////////////////////////
    // SHOW LOADER
    ///////////////////////////////////////////////////////////////////////////
    ModalPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        this.loader.present();
    };
    ///////////////////////////////////////////////////////////////////////////
    // DISMISS LOADER
    ///////////////////////////////////////////////////////////////////////////
    ModalPage.prototype.dismissLoader = function () {
        if (this.loader) {
            this.loader.dismiss();
            this.loader = null;
        }
    };
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-modal',template:/*ion-inline-start:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/pages/modal/modal.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title class="navTitle">Create/Pull - Container/Image</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only title="Κλείσιμο" (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="background-template">\n  <div class="template-center">\n\n    <div *ngIf="images.length>0">\n      <ion-title class="align-center padding-title">\n        Available Images\n      </ion-title>\n\n      <ion-list *ngFor="let img of images;">\n        <ion-item>\n          <div class="inline">\n            {{ img.RepoTags[0] }}\n          </div>\n\n          <div class="inline" item-end>\n            <ion-icon color="secondary" class="cursorCs" name="add" title="Create container" (click)="createContainer([img.RepoTags[0]])" item-end></ion-icon>\n            <ion-icon color="danger" class="cursorCs" name="close" title="Delete image" (click)="deleteImage([img.RepoTags[0]])" item-end></ion-icon>\n          </div>\n        </ion-item>\n      </ion-list>\n\n      <hr>\n    </div>\n\n    <ion-title class="align-center padding-title">\n      Pull new image\n    </ion-title>\n\n    <ion-item>\n      <ion-label>Docker repo name</ion-label>\n      <ion-input type="text" [(ngModel)]="image_name" value=""></ion-input>\n    </ion-item>\n\n    <br>\n\n    <div class="align-center">\n      <h6>Examples</h6>\n      <div *ngFor="let name of example_images;">\n        <div (click)="selectImageToPull(name)" class="cursorCs">{{ name }}</div>\n      </div>\n    </div>\n\n    <div  class="align-center">\n      <button ion-button round (click)="pullImage()">\n        Pull\n      </button>\n    </div>\n\n\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/pages/modal/modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home_module__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_modal_modal__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_api_api__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_modal_modal__["a" /* ModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home_module__["a" /* HomePageModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_modal_modal__["a" /* ModalPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_10__providers_api_api__["a" /* ApiProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar color="dark">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav main [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(278);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__container_container__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stats_stats__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logs_logs__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__container_container__["a" /* ContainerComponent */],
                __WEBPACK_IMPORTED_MODULE_3__stats_stats__["a" /* StatsComponent */],
                __WEBPACK_IMPORTED_MODULE_4__logs_logs__["a" /* LogsComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__container_container__["a" /* ContainerComponent */])],
            exports: [__WEBPACK_IMPORTED_MODULE_1__container_container__["a" /* ContainerComponent */],
                __WEBPACK_IMPORTED_MODULE_3__stats_stats__["a" /* StatsComponent */],
                __WEBPACK_IMPORTED_MODULE_4__logs_logs__["a" /* LogsComponent */]],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContainerComponent = /** @class */ (function () {
    function ContainerComponent(api, loadingCtrl, alertCtrl) {
        this.api = api;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.stats = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */](); // VAR TO COMMUNICATE WITH PAREMT ABOUT STATS
        this.logs = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */](); // VAR TO COMMUNICATE WITH PAREMT ABOUT LOGS
        this.changedState = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */](); // VAR TO COMMUNICATE WITH PARENT BECAUSE STATE CHANGED
        this.colorStatus = 'colorBlue'; // VAR TO CHANGE COLOR GREEN-BLUE DEPENDING ON STATUS
        this.activeStats = false; // VAR THAT INDICATES IF STATS ARE ACTIVE
        this.activeLogs = false; // VAR THAT INDICATES IF LOGS ARE ACTIVE
        this.loader = null; // LOADER VAR FOR ASYNC REQUESTS
    }
    ///////////////////////////////////////////////////////////////////////////
    // CHECK IF CONTAINER IS RUNNING, SO THAT WE CAN 
    // GIVE THE USER BUTTONS TO ACTIVATE STATS OR LOGS
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.checkRunning = function (state) {
        if (state == 'running') {
            this.colorStatus = 'colorGreen';
            return true;
        }
        else {
            this.colorStatus = 'colorBlue';
            return false;
        }
    };
    ///////////////////////////////////////////////////////////////////////////
    // EMIT EVENT TO INFORM PARENT THAT STATS/LOGS
    // WAS TOGGLED, BY CLICKING BUTTONS
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.toggleStatsLogs = function (toggleComponent) {
        this[toggleComponent].emit(this.container);
    };
    ///////////////////////////////////////////////////////////////////////////
    // START CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.start = function () {
        var _this = this;
        // SHOW LOADER
        this.presentLoading();
        // CALL TO SERVER
        this.api.startContainer(this.container.Id).subscribe(function (res) {
            console.log('Res startContainer: ' + JSON.stringify(res));
            // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
            _this.stateChanged('start');
            //DISMISS LOADER
            _this.dismissInitLoader();
        }, function (err) {
            // DEBUG MESSAGE
            console.error("Error startContainer: " + JSON.stringify(err));
            //DISMISS LOADER
            _this.dismissInitLoader();
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // STOP CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.stop = function () {
        var _this = this;
        // SHOW LOADER
        this.presentLoading();
        // CALL TO SERVER
        this.api.stopContainer(this.container.Id).subscribe(function (res) {
            // DEBUG MESSAGE
            console.log('Res stopContainer: ' + JSON.stringify(res));
            // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
            _this.stateChanged('stop');
            //DISMISS LOADER
            _this.dismissInitLoader();
        }, function (err) {
            // DEBUG MESSAGE
            console.error("Error stopContainer: " + JSON.stringify(err));
            //DISMISS LOADER
            _this.dismissInitLoader();
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // DELETE CONTAINER, IF IT IS RUNNING
    // NOTHING WILL HAPPEN, EMPTY RESPONSE FROM SERVER
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.delete = function () {
        var _this = this;
        // SHOW LOADER
        this.presentLoading();
        // CALL TO SERVER
        this.api.deleteContainer(this.container.Id).subscribe(function (res) {
            // DEBUG MESSAGE
            console.log('Res deleteContainer: ' + JSON.stringify(res));
            // EMIT EVENT TO PARENT TO CHANGE STATE OF CONTAINER
            _this.stateChanged('delete');
            //DISMISS LOADER
            _this.dismissInitLoader();
        }, function (err) {
            // DEBUG MESSAGE
            console.error("Error deleteContainer: " + JSON.stringify(err));
            //DISMISS LOADER
            _this.dismissInitLoader();
            // ERROR MESSAGE TO SHOW
            var msg = "Error: " + err.status + ". " + err.statusText + ". Cannot delete while running.";
            _this.alertGlobal(msg);
        });
    };
    ///////////////////////////////////////////////////////////////////////////
    // EMIT EVENT TO PARENT THAT
    // STATE WAS CHANGED (RUNNING, EXITED, CREATED)
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.stateChanged = function (fun) {
        // DEBUG MESSAGE
        console.log("stateChanged");
        var stateObj = {
            "container": this.container,
            "fun": fun
        };
        this.changedState.emit(stateObj);
    };
    ////////////////////////////// PAGE HELPERS ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // SHOW LOADING POPUP
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",
        });
        this.loader.present();
    };
    ///////////////////////////////////////////////////////////////////////////
    // DISMISS LOADER POPUP
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.dismissInitLoader = function () {
        if (this.loader) {
            this.loader.dismiss();
            this.loader = null;
        }
    };
    ///////////////////////////////////////////////////////////////////////////
    // ALERT MESSAGE FOR ERRORS
    ///////////////////////////////////////////////////////////////////////////
    ContainerComponent.prototype.alertGlobal = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'TRADELINE',
            subTitle: msg,
            buttons: ['ok']
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], ContainerComponent.prototype, "container", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], ContainerComponent.prototype, "stats", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], ContainerComponent.prototype, "logs", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], ContainerComponent.prototype, "changedState", void 0);
    ContainerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'container',template:/*ion-inline-start:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/components/container/container.html"*/'<ion-row class="paddingRow">\n	<ion-col>\n		<div class="{{colorStatus}}">\n			{{ container.Names[0] }}\n		</div>\n	</ion-col>\n\n	<ion-col>\n		<div>\n			{{ container.Image }}\n		</div>\n	</ion-col>\n\n	<ion-col>\n		<div>\n			<span>\n				{{ container.State }}\n			</span>\n			<span *ngIf="checkRunning(container.State)" class="inline">\n				<ion-icon color="dark" class="cursorCs padding-action-btns" name="stats" title="Stats" (click)="toggleStatsLogs(\'stats\')"></ion-icon>\n				<ion-icon color="primary" class="cursorCs padding-action-btns" name="paper" title="Logs" (click)="toggleStatsLogs(\'logs\')"></ion-icon>\n			</span>\n		</div>\n	</ion-col>\n\n\n	<ion-col>\n		<div>\n			<ion-icon color="secondary" class="cursorCs padding-action-btns" name="play" title="Start" (click)="start()"></ion-icon>\n			<ion-icon color="primary" class="cursorCs padding-action-btns" name="square" title="Stop" (click)="stop()"></ion-icon>\n			<ion-icon color="danger" class="cursorCs padding-action-btns" name="trash" title="Delete" (click)="delete()"></ion-icon>\n		</div>\n	</ion-col>\n</ion-row>\n'/*ion-inline-end:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/components/container/container.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ContainerComponent);
    return ContainerComponent;
}());

//# sourceMappingURL=container.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_api_api__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StatsComponent = /** @class */ (function () {
    function StatsComponent(api) {
        var _this = this;
        this.api = api;
        this.container = null; // INPUT OF COMPONENT
        this.containerStopped = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */](); // VAR TO COMMUNICATE WITH PAREMT ABOUT UNEXPECTED ERROR
        this.stats = null; // STATS OBJECT
        this.loading = false; // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED
        setTimeout(function () {
            _this.getStats();
        }, 0);
    }
    ///////////////////////////////////////////////////////////////////////////
    // GET STATS FOR RUNNING CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    StatsComponent.prototype.getStats = function () {
        var _this = this;
        // CHECK IF CONTAINER IS PASSED
        if (this.container) {
            this.loading = true;
            // CALL TO SERVER
            this.api.getStatsOfContainer(this.container.Id).subscribe(function (res) {
                // DEBUG MESSAGE
                // console.log('Res getStatsOfContainer: ' + JSON.stringify(res));
                _this.loading = false;
                // DEACTIVATE COMPONENT - CONTAINER HAS STOPPED
                if (!res.pids_stats.current) {
                    console.warn('CONTAINER STOPPED - DISABLING STATS');
                    _this.disableStatsComponent();
                }
                else {
                    _this.stats = res;
                    setTimeout(function () {
                        _this.getStats();
                    }, _this.api.TIME_TO_REFRESH);
                }
            }, function (err) {
                // DEBUG MESSAGE
                _this.loading = false;
                console.error("Error while getStatsOfContainer: " + JSON.stringify(err));
                // DEACTIVATE COMPONENT - CONTAINER HAS STOPPED
                _this.disableStatsComponent();
            });
        }
    };
    ///////////////////////////////////////////////////////////////////////////
    // EMIT EVENT TO PARENT TO DISABLE COMPONENT
    ///////////////////////////////////////////////////////////////////////////
    StatsComponent.prototype.disableStatsComponent = function () {
        this.containerStopped.emit(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], StatsComponent.prototype, "container", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], StatsComponent.prototype, "containerStopped", void 0);
    StatsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'stats',template:/*ion-inline-start:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/components/stats/stats.html"*/'<div>\n  <ion-card>\n    <ion-grid class="paddingGrid">\n\n      <ion-row class="posRelative paddingRow">\n        \n        <ion-col title="Statistics" class="alignTextCenter">\n          <div class="title-font">\n            <b>Stats of Container</b>\n          </div>\n        </ion-col>\n\n        <ion-col title="Name of container" class="alignTextCenter">\n          <div class="colorGreen title-font undeline">\n              <b>{{ container?.Names[0] }}</b>\n          </div>\n        </ion-col>\n\n        <ion-col title="Time" class="alignTextCenter">\n          <div class="title-font">\n            <b>{{ stats?.read | date: \'mediumTime\'}}</b>\n          </div>\n        </ion-col>\n\n        <div class="posAbsoluteRight">\n          <ion-spinner name="crescent" *ngIf="loading"></ion-spinner>\n        </div>\n\n      </ion-row>\n\n      <ion-row class="paddingRow height85">\n        \n        <ion-col title="CPU" class="alignTextCenter">\n          <div>\n            CPU Usage\n          </div>\n          <div>\n            <ion-icon name="speedometer"></ion-icon>\n          </div>\n          <div>\n            <ion-badge>{{ stats?.cpu_stats?.cpu_usage?.total_usage }}</ion-badge>\n          </div>\n        </ion-col>\n\n        <ion-col title="Online CPU" class="alignTextCenter">\n            <div>\n              Online cpus\n            </div>\n            <div>\n              <ion-icon name="bulb"></ion-icon>\n            </div>\n            <div>\n              <ion-badge>{{ stats?.cpu_stats?.online_cpus }}</ion-badge>\n            </div>\n        </ion-col>\n\n        <ion-col title="Memory" class="alignTextCenter">\n          <div>\n            Memory\n          </div>\n          <div>\n            <ion-icon name="eye"></ion-icon>\n          </div>\n\n          <div>\n            <ion-badge>{{ stats?.memory_stats?.usage }}</ion-badge>\n          </div>\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n</div>\n'/*ion-inline-end:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/components/stats/stats.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_api_api__["a" /* ApiProvider */]])
    ], StatsComponent);
    return StatsComponent;
}());

//# sourceMappingURL=stats.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_api_api__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogsComponent = /** @class */ (function () {
    function LogsComponent(api) {
        var _this = this;
        this.api = api;
        this.logs = []; // LOGS ARRAY
        this.date = new Date(); // CURRENT DATE
        this.loading = false; // BOOLEAN TO SHOW LOADER WHEN ASYNC FUNCTION IS CALLED
        // GET LOGS
        setTimeout(function () {
            _this.getLogs();
        }, 0);
        // PUSH INIT LOG TO ARRAY OF LOGS
        var dateToPrint = this.getMediumDate();
        var logToAdd = dateToPrint + ' ...';
        this.logs.push(logToAdd);
    }
    ///////////////////////////////////////////////////////////////////////////
    // GET LOGS FROM SERVER
    ///////////////////////////////////////////////////////////////////////////
    LogsComponent.prototype.getLogs = function () {
        var _this = this;
        // CHECK IF CONTAINER IS PASSED
        if (this.container) {
            this.loading = true;
            // CALL TO SERVER
            this.api.getLogsOfContainer(this.container.Id).subscribe(function (res) {
                // DEBUG MESSAGE
                // console.log('Res getLogsOfContainer: ' + JSON.stringify(res));
                _this.loading = false;
                // UPDATE DATE
                _this.date = new Date();
                // IF LOG IS NON-EMPTY CONCAT OUTPUT
                if (res) {
                    _this.addToLogs(res.split('\n'));
                }
                setTimeout(function () {
                    _this.getLogs();
                }, _this.api.TIME_TO_REFRESH);
            }, function (err) {
                // DEBUG MESSAGE
                _this.loading = false;
                console.error("Error while getLogsOfContainer: " + JSON.stringify(err));
            });
        }
    };
    ///////////////////////////////////////////////////////////////////////////
    // CONCAT LOGS TO OUTPUT - 10 LOGS MAX
    ///////////////////////////////////////////////////////////////////////////
    LogsComponent.prototype.addToLogs = function (log) {
        var helpLogs = this.logs.concat(log);
        this.logs = helpLogs.slice(Math.max(helpLogs.length - 10, 0));
    };
    ///////////////////////////////////////////////////////////////////////////
    // FORMAT DATE
    ///////////////////////////////////////////////////////////////////////////
    LogsComponent.prototype.getMediumDate = function () {
        this.date = new Date();
        return '(' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds() + ')';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], LogsComponent.prototype, "container", void 0);
    LogsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'logs',template:/*ion-inline-start:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/components/logs/logs.html"*/'<div>\n  <ion-card>\n    <ion-grid class="paddingGrid">\n      <ion-row class="posRelative paddingRow">\n          \n          <ion-col title="Statistics" class="alignTextCenter">\n            <div class="title-font">\n                <b>Logs of Container</b>\n            </div>\n          </ion-col>\n\n          <ion-col title="Name of container" class="alignTextCenter">\n            <div class="colorGreen title-font undeline">\n                <b>{{ container?.Names[0] }}</b>\n            </div>\n          </ion-col>\n\n          <ion-col title="Time" class="alignTextCenter">\n            <div class="title-font">\n              <b>{{ date | date: \'mediumTime\'}}</b>\n            </div>\n          </ion-col>\n\n          <div class="posAbsoluteRight">\n            <ion-spinner name="crescent" *ngIf="loading"></ion-spinner>\n          </div>\n\n        </ion-row>\n\n        <ion-row>\n          <ion-col class="padding-of-logs">\n            <div class="background-logs max-logs-height">\n                <div *ngFor="let log of logs;">\n                    {{ log }}\n                </div>\n            </div>\n          </ion-col>\n        </ion-row>\n    </ion-grid>\n  </ion-card>\n</div>'/*ion-inline-end:"/home/jim/Workspace/docker_inspector/docker_inspector_client/src/components/logs/logs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_api_api__["a" /* ApiProvider */]])
    ], LogsComponent);
    return LogsComponent;
}());

//# sourceMappingURL=logs.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiProvider = /** @class */ (function () {
    function ApiProvider(http) {
        this.http = http;
        this.TIME_TO_REFRESH = 2000; // CONSTANT THAT INDICADES HOW OFTEN WE REFRESH COMPONENTS
        this.baseApiUrl = 'http://localhost:3000'; // SERVER ADDRESS TO MAKE REQUESTS
    }
    ///////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// GET //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // GET STATS OF CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.getStatsOfContainer = function (id) {
        return this.http.get(this.baseApiUrl + "/get_stats_of_container/" + id);
    };
    ///////////////////////////////////////////////////////////////////////////
    // GET STATS OF CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.getLogsOfContainer = function (id) {
        return this.http.get(this.baseApiUrl + "/get_logs_of_container/" + id);
    };
    ///////////////////////////////////////////////////////////////////////////
    // GET LIST OF CONTAINERS
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.getListOfContainers = function () {
        return this.http.get(this.baseApiUrl + "/get_list_of_containers");
    };
    ///////////////////////////////////////////////////////////////////////////
    // GET LIST AVAILABLE IMAGES
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.getListOfImages = function () {
        return this.http.get(this.baseApiUrl + "/get_list_of_images");
    };
    ///////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////// POST //////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // PULL DOCKER IMAGE BY NAME
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.pullImage = function (repo_name) {
        var data = { repo_name: repo_name };
        return this.http.post(this.baseApiUrl + "/pull_docker", data);
    };
    ///////////////////////////////////////////////////////////////////////////
    // DELETE DOCKER IMAGE BY NAME
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.deleteImage = function (repo_name) {
        var data = { repo_name: repo_name };
        return this.http.post(this.baseApiUrl + "/delete_docker", data);
    };
    ///////////////////////////////////////////////////////////////////////////
    // CREATE CONTAINER FROM SPECIFIED IMAGE NAME (enhariharan/infinite-loop)
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.createContainer = function (repo_name) {
        var data = { repo_name: repo_name };
        return this.http.post(this.baseApiUrl + "/create_container", data);
    };
    ///////////////////////////////////////////////////////////////////////////
    // START CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.startContainer = function (id) {
        return this.http.post(this.baseApiUrl + "/start_container/" + id, {});
    };
    ///////////////////////////////////////////////////////////////////////////
    // STOP CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.stopContainer = function (id) {
        return this.http.post(this.baseApiUrl + "/stop_container/" + id, {});
    };
    ///////////////////////////////////////////////////////////////////////////
    // DELETE CONTAINER
    ///////////////////////////////////////////////////////////////////////////
    ApiProvider.prototype.deleteContainer = function (id) {
        return this.http.post(this.baseApiUrl + "/delete_container/" + id, {});
    };
    ApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ApiProvider);
    return ApiProvider;
}());

//# sourceMappingURL=api.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map