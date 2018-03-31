import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TasksPage } from '../pages/tasks/tasks';
import { CompletedPage } from '../pages/completed/completed';
import { UserPage } from '../pages/user/user';
import { NewTaskPage } from '../pages/newtask/newtask';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { NewUserPage } from "../pages/newuser/newuser";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    NewUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    NewUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
