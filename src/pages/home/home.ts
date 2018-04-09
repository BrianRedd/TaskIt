import { Component } from '@angular/core';
import { IonicPage, NavController, ItemSliding, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { TasksPage } from "../tasks/tasks";
import { TaskDetailPage } from '../taskdetail/taskdetail';
//import { UserPage } from "../user/user"; //**TEMPORARY**

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO } from "../../shared/TaskVO";
import { CategoryVO, Categories } from "../../shared/CategoryVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { TaskfilterProvider } from "../../providers/taskfilter/taskfilter";
import { DateconverterProvider } from "../../providers/dateconverter/dateconverter";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {

  user: UserVO = this.userModel.user;
  date: string;
  tasks: TaskVO[];
  priorityStr: any = ["Low", "Normal", "High"];
  categories = Categories;
  nextdue: number = null;
  nextdue_msg: string;
  highpriority: number = null;
  highpriority_msg: string;

  constructor(
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    private taskFilter: TaskfilterProvider,
    private toastCtrl: ToastController,
    public navCtrl: NavController
  ) {
    console.log('constructor TasksPage');
    this.date = this.dateService.todaysDateString();
    if (!userModel.validateUser()) {
      this.navCtrl.setRoot(LoginPage);
    }
    if (this.user.image === "Later") { //remove filler value for now **TEMPORARY**
      this.user.image = "assets/imgs/generic_user.png";
    }
    //console.log(this.user);
    this.getTaskService.getUserTasks(this.user.id).subscribe(tasks => {     
      //tasks = taskFilter.styleTasks(tasks);
      if (!tasks) {
        console.log("No tasks for user " + this.user.id);
        let newtask: TaskVO = new TaskVO();
        if (this.user.birthday) {
          newtask.id = 0;
          let temp: any = this.dateService.todaysDateString();
          newtask.dateCreated = temp;
          newtask.title = this.user.firstname + "'s Birthday";
          newtask.description = this.user.firstname + " " + this.user.lastname + "'s Birthday";
          temp = this.dateService.nextRecurring(this.user.birthday);
          newtask.dateScheduled = temp;
          newtask.recurring = true;
          newtask.priority = 1;
          newtask.category = 4;
          console.log("Birthday Task:", newtask);
        } else {
          newtask.id = 0;
          let temp: any = this.dateService.todaysDateString();
          newtask.dateCreated = temp;
          newtask.title = this.user.firstname + "'s First Task";
          newtask.description = this.user.firstname + " " + this.user.lastname + "'s First Task";
          newtask.dateScheduled = newtask.dateCreated;
          newtask.recurring = false;
          newtask.priority = 1;
          newtask.category = 5;
          console.log("Sample Task:", newtask);
        }
        this.tasks = [];
        this.tasks.push(newtask);
        this.getTaskService.setUserTasks(this.user.id, this.tasks).subscribe(tasks => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = tasks;
        //console.log(this.tasks);
        this.tasks = this.taskFilter.sortTasks(this.tasks, "id", "asc");
      } 
      this.nextDueTasks();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter TasksPage');
    if (this.tasks) {
      this.updateDate();
    }
  }

  updateDate() {
    this.date = this.dateService.todaysDateString();
    this.nextDueTasks();
  };

  openTaskPage() {
    this.navCtrl.push(TasksPage);
  }

  /*openUserPage() { //**TEMPORARY**
    this.navCtrl.push(UserPage);
  }*/

  openTaskDetail(event, task) {
    this.navCtrl.push(TaskDetailPage, {
      task: task
    });
  }

  nextDueTasks() {
    this.nextdue_msg = "";
    this.highpriority_msg = "";
    let next: TaskVO[] = [];
    let high: TaskVO[] = [];
    next = this.taskFilter.filterTasks(this.tasks, "completed", "-1");
    next = this.taskFilter.sortTasks(next, "dateScheduled", "asc");
    next = this.taskFilter.styleTasks(next);
    if (!next || next.length === 0) {
      this.nextdue_msg = "No Pending Tasks Due";
      this.nextdue = null;
    } else {
      this.nextdue = next[0].id;
      high = this.taskFilter.filterTasks(next, "priority", 2);
      console.log("High Priority tasks", high, high.length);
      if (!high || high.length === 0) {
        this.highpriority_msg = "No High Priority Tasks Due";
        console.log(this.highpriority_msg);
        this.highpriority = null;
      } else {
        this.highpriority = high[0].id;
      }
      if (this.highpriority === this.nextdue) {
        if (high.length > 1) {
          this.highpriority = high[1].id;
        } else {
          this.highpriority = null;
          this.highpriority_msg = "No High Priority Tasks Due";
        }
      }
    }
  }

  completeTask(item: ItemSliding, task: any) {
    console.log(task.id, task.title);
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
    this.nextDueTasks();
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
