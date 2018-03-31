import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TasksPage } from '../pages/tasks/tasks';
import { CompletedPage } from '../pages/completed/completed';
import { UserPage } from '../pages/user/user';
import { NewTaskPage } from '../pages/newtask/newtask';
import { LoginPage } from '../pages/login/login';
import { NewUserPage } from "../pages/newuser/newuser";
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: "home", component: HomePage },
      { title: 'Tasks', icon: "list-box", component: TasksPage },
      { title: 'New Task', icon: "add-circle", component: NewTaskPage },
      { title: 'Completed Tasks', icon: "archive", component: CompletedPage },
      { title: 'User', icon: "contact", component: UserPage },
      { title: 'About', icon: "information-circle", component: AboutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    alert("Logged Out!");
    this.nav.setRoot(LoginPage);
  }
}
