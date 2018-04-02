import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO, ListVO } from "../../shared/TaskVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { DateconverterProvider } from "../../providers/dateconverter/dateconverter";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {

  user: UserVO = this.userModel.user;
  datetime: any = new Date();
  date: string;
  time: string;
  tasks: TaskVO[];
  nextdue: number = null;
  highpriority: number = null;

  constructor(
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    public navCtrl: NavController
  ) {
    this.updateDateTime();
    //console.log("Home: user", this.user);
    //console.log("Home: userModel.validateUser()", userModel.validateUser());
    if (!userModel.validateUser()) {
      this.navCtrl.setRoot(LoginPage);
    }
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      if (!tasks) {
        let newtask: TaskVO = new TaskVO();
        if (this.user.birthday) {          
          let temp: any = this.dateService.dateToString(this.datetime);
          newtask.dateCreated = temp;
          newtask.title = this.user.firstname + "'s Birthday";
          newtask.description = this.user.firstname + " " + this.user.lastname + "'s Birthday";
          temp = this.dateService.nextRecurring(this.user.birthday);
          newtask.dateScheduled = temp;
          newtask.recurring = true;
          console.log("Birthday Task:", newtask);
        } else {
          let temp: any = this.dateService.dateToString(this.datetime);
          newtask.dateCreated = temp;
          newtask.title = this.user.firstname + "'s First Task";
          newtask.description = this.user.firstname + " " + this.user.lastname + "'s First Task";
          newtask.dateScheduled = newtask.dateCreated;
          newtask.recurring = false;
          console.log("Sample Task:", newtask);
        }
        console.log("No tasks for user " + this.user.id);
        this.tasks = [];
        this.tasks.push(newtask);
        getTaskService.setUserTasks(this.user.id, this.tasks).subscribe(tasks => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = tasks;
        console.log(this.tasks);
      }
    });

  }

  updateDateTime() {
    this.datetime = new Date();
    this.date = this.datetime.toDateString();
    this.time = this.datetime.toLocaleTimeString();

  };


  
}
