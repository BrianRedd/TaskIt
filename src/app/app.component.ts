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
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, icon: string, component: any}>;

 constructor(
      public platform: Platform,
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen
    ) {
    this.initializeApp();

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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    alert("Logged Out!");
    this.nav.setRoot(LoginPage);
  }
}
