import { Component } from '@angular/core';
import { IonicPage, NavController, ItemSliding } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { TasksPage } from "../tasks/tasks";
import { TaskDetailPage } from '../taskdetail/taskdetail';

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
  highpriority: number = null;

  constructor(
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    private taskFilter: TaskfilterProvider,
    public navCtrl: NavController
  ) {
    this.updateDate();
    if (!userModel.validateUser()) {
      this.navCtrl.setRoot(LoginPage);
    }
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      //tasks = taskFilter.sortTasks(tasks, "dateScheduled", "asc");
      //tasks = taskFilter.styleTasks(tasks);
      if (!tasks) {
        //console.log("No tasks for user " + this.user.id);
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
          //console.log("Birthday Task:", newtask);
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
          //console.log("Sample Task:", newtask);
        }
        this.tasks = [];
        this.tasks.push(newtask);
        getTaskService.setUserTasks(this.user.id, this.tasks).subscribe(tasks => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = tasks;
        //console.log(this.tasks);
      }
      this.nextDueTasks();
    });
  }

  updateDate() {
    this.date = this.dateService.todaysDateString();
  };

  openTaskPage() {
    this.navCtrl.push(TasksPage);
  }

  openTaskDetail(event, task) {
    this.navCtrl.push(TaskDetailPage, {
      task: task
    });
  }

  nextDueTasks() {
    let next: any = [];
    next = this.taskFilter.filterTasks(this.tasks, "completed", "-1");
    next = this.taskFilter.sortTasks(next, "dateScheduled", "asc");
    next = this.taskFilter.styleTasks(next);
    this.nextdue = next[0].id;
    next = this.taskFilter.filterTasks(next, "priority", 2);
    this.highpriority = next[0].id;
  }

  completeTask(item: ItemSliding, task: any) {
    console.log(task.id, task.title);
    /*task.dateUpdated = this.dateService.todaysDateString();
    if (task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    this.tasks = this.taskFilter.styleTasks(this.tasks);
    this.getTaskService.setUserTasks(this.user.id, this.tasks);*/
  }
  
}
