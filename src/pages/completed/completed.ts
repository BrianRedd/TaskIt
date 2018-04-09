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
  tasks: TaskVO[];

  constructor(
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    private taskFilter: TaskfilterProvider,
    public navCtrl: NavController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CompletedPage');
    this.getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = this.taskFilter.filterTasks(tasks, "completed", true);
      this.tasks = this.taskFilter.sortTasks(this.tasks, "dateUpdated", "desc");
      this.tasks = this.taskFilter.styleTasks(this.tasks);
    });
  }

  openTaskDetail(event, task) {
    this.navCtrl.push(TaskDetailPage, {
      task: task
    });
  }

}