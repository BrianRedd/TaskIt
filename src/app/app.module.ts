import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TasksPage } from '../pages/tasks/tasks';
import { CompletedPage } from '../pages/completed/completed';
import { UserPage } from '../pages/user/user';
import { NewTaskPage } from '../pages/newtask/newtask';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { NewUserPage } from "../pages/newuser/newuser";
import { TaskDetailPage } from "../pages/taskdetail/taskdetail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserModel } from "../models/usermodel";
import { GetuserdataProvider } from '../providers/getuserdata/getuserdata';
import { GettaskdataProvider } from '../providers/gettaskdata/gettaskdata';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { DateconverterProvider } from '../providers/dateconverter/dateconverter';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TasksPage,
    CompletedPage,
    UserPage,
    NewTaskPage,
    AboutPage,
    LoginPage,
    NewUserPage,
    TaskDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TasksPage,
    CompletedPage,
    UserPage,
    NewTaskPage,
    AboutPage,
    LoginPage,
    NewUserPage,
    TaskDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserModel,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetuserdataProvider,
    GettaskdataProvider,
    AuthenticationProvider,
    DateconverterProvider
  ]
})
export class AppModule {}
