import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskDetailPage } from '../taskdetail/taskdetail';
import { NewTaskPage } from "../newtask/newtask";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO, ListVO } from "../../shared/TaskVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { DateconverterProvider } from "../../providers/dateconverter/dateconverter";
import { TaskfilterProvider } from "../../providers/taskfilter/taskfilter";

@IonicPage()
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {
 
  user: UserVO = this.userModel.user;
  Date: any = new Date();
  date: string;
  //time: string;
  tasks: TaskVO[];

  constructor(
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    private taskFilter: TaskfilterProvider,
    public navCtrl: NavController
  ) {
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = taskFilter.filterTasks(tasks, "completed", true);
      this.tasks = taskFilter.sortTasks(this.tasks, "dateScheduled");
      this.tasks = taskFilter.styleTasks(this.tasks);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

  openTaskDetail(event, task) {
    this.navCtrl.push(TaskDetailPage, {
      task: task
    });
  }

}