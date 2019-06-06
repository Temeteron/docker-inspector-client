import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ModalPage } from '../pages/modal/modal';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { SharedProperties } from '../providers/shared-properties/shared-properties';

@NgModule({
  declarations: [
    MyApp,
    ModalPage,
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiProvider,
    SharedProperties,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
