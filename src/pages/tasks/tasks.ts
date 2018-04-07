import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
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
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
 
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
      this.tasks = taskFilter.sortTasks(tasks, "dateScheduled");
      this.tasks = taskFilter.styleTasks(tasks);
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

  completeTask(item: ItemSliding, task: any) {
    /*let res: any = this.taskFilter.filterTasks(this.tasks, "id", id);
    console.log(res[0]);*/
    console.log(task.id, task.title);
    task.dateUpdated = this.dateService.dateToString(this.Date);
    if (task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    this.tasks = this.taskFilter.styleTasks(this.tasks);
    this.getTaskService.setUserTasks(this.user.id, this.tasks);
  }

}
