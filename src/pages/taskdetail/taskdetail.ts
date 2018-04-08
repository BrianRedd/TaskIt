import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO, ListVO } from "../../shared/TaskVO";
import { CategoryVO, Categories } from "../../shared/CategoryVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { TaskfilterProvider } from "../../providers/taskfilter/taskfilter";
import { DateconverterProvider } from "../../providers/dateconverter/dateconverter"; 

@IonicPage()
@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html',
})
export class TaskDetailPage {

  user: UserVO = this.userModel.user;
  task: TaskVO;
  tasks: TaskVO[];
  priorityStr: any = ["Low", "Normal", "High"];
  categories = Categories;

  constructor(
    private userModel: UserModel,
    public navCtrl: NavController, 
    private getTaskService: GettaskdataProvider,
    private taskFilter: TaskfilterProvider,
    private dateService: DateconverterProvider,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = taskFilter.sortTasks(tasks, "id", "asc");
      this.tasks = taskFilter.styleTasks(tasks);
      //category not defined - **TEMPORARY**
      if (!this.task.category) {
        //console.log("Category for task #" + this.task.id + " is undefined");
        this.task.category = 5;
        //console.log("Category for task #" + this.task.id + " should now be " + this.task.category);
        this.tasks[this.task.id].category = this.task.category;        
        this.getTaskService.setUserTasks(this.user.id, this.tasks);
        //console.log("Task should be updated.");
      }
    });
    this.task = navParams.get("task");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailPage');
  }

  completeListItem(item, listitem) {
    if (listitem.completed) {
      listitem.completed = false;
    } else {
      listitem.completed = true;
    }
    this.tasks[this.task.id].list[listitem.id].completed = listitem.completed;
    this.tasks[this.task.id].dateUpdated = this.dateService.todaysDateString();
    this.getTaskService.setUserTasks(this.user.id, this.tasks);
  }

  addListItem() {
    
  }

  completeTask() {
    //console.log(task.id, task.title);
    this.tasks = this.taskFilter.sortTasks(this.tasks, "id", "asc");
    this.task.dateUpdated = this.dateService.todaysDateString();
    if (this.task.completed) {
      this.task.completed = false;
      this.mmmToast("Task " + this.task.title + " restored to active!", "middle");
    } else {
      this.task.completed = true;
      this.mmmToast("Task " + this.task.title + " completed!", "middle");
    }
    this.tasks[this.task.id] = this.task;
    this.tasks = this.taskFilter.styleTasks(this.tasks);
    this.getTaskService.setUserTasks(this.user.id, this.tasks);
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
