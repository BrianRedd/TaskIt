import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { TaskDetailPage } from '../taskdetail/taskdetail';
import { NewTaskPage } from "../newtask/newtask";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO, ListVO } from "../../shared/TaskVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { DateconverterProvider } from "../../providers/dateconverter/dateconverter";

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
 
  user: UserVO = this.userModel.user;
  datetime: any = new Date();
  date: string;
  time: string;
  tasks: TaskVO[];

  constructor(
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    public navCtrl: NavController
  ) {
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = tasks;
      //sort by due date and set custom parameters for display purposes
      let temp: TaskVO;
      for (var i: number = 0; i < this.tasks.length -1; i++) {
        for (var ii: number = i; ii < this.tasks.length; ii++ ) {
          if (this.tasks[ii].dateScheduled < this.tasks[i].dateScheduled) {
            temp = this.tasks[ii];
            this.tasks[ii] = this.tasks[i];
            this.tasks[i] = temp;
          }
        }
      }
      for (i = 0; i< this.tasks.length; i++) {
        tasks[i].flag = "";
        tasks[i].flagcolor = "";
        tasks[i].style = "";
        if (tasks[i].priority === 0) {
          tasks[i].flag = "trending-down";
          tasks[i].flagcolor = "archive";
        } else if (tasks[i].priority === 2) {
          tasks[i].flag = "trending-up";
          tasks[i].flagcolor = "primary";
          tasks[i].style += " bold";
        }
        if (tasks[i].recurring) {
          tasks[i].style += " italic";
        }
        if (this.dateService.stringToDate(tasks[i].dateScheduled) < this.datetime) {
          if (!tasks[i].flag) {
            tasks[i].flag = "warning";
          }
          tasks[i].flagcolor = "red";
          tasks[i].style += " red";
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

  openTaskDetail(event, task) {
    this.navCtrl.push(TaskDetailPage, {
      task: task
    });
  }

  openNewTaskPage() {
    this.navCtrl.push(NewTaskPage);
  }

  completeTask(item: ItemSliding, id: number) {

  }

}
