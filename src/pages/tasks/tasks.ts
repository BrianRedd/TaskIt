import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController } from 'ionic-angular';
import { TaskDetailPage } from '../taskdetail/taskdetail';
import { NewTaskPage } from "../newtask/newtask";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO } from "../../shared/TaskVO";
import { CategoryVO, Categories } from "../../shared/CategoryVO";
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
  task: TaskVO;
  tasks: TaskVO[];
  priorityStr: any = ["Low", "Normal", "High"];
  categories = Categories;

  constructor(
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    private taskFilter: TaskfilterProvider,
    private toastCtrl: ToastController,
    public navCtrl: NavController
  ) {
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = taskFilter.sortTasks(tasks, "dateScheduled", "asc");
      this.tasks = taskFilter.styleTasks(tasks);
      for (var i: number = 0; i < tasks.length; i++) {
        if (this.tasks[i].category === NaN || !this.tasks[i].category) {
          this.tasks[i].category = 5;
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

  completeTask(item: ItemSliding, task: any) {
    //console.log(task.id, task.title);
    task.dateUpdated = this.dateService.todaysDateString();
    if (task.completed) {
      task.completed = false;
      this.mmmToast("Task " + task.title + " restored to active!", "middle");
    } else {
      task.completed = true;
      this.mmmToast("Task " + task.title + " completed!", "middle");
    }
    this.tasks = this.taskFilter.styleTasks(this.tasks);
    this.getTaskService.setUserTasks(this.user.id, this.tasks);
    item.close();
  }

  mmmToast(msg: string, pos: string) {
    if (!pos) { pos = "middle"};
    console.log(msg);
    let toast = this.toastCtrl.create({
      message: msg,
      position: pos,
      duration: 2000
    });
    toast.present();
  };

}
