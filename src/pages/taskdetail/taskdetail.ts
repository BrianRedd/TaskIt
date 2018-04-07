import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams
  ) {
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = taskFilter.sortTasks(tasks, "id");
      if (!this.task.category) {
        console.log("Category for task #" + this.task.id + " is undefined");
        this.task.category = 5;
        console.log("Category for task #" + this.task.id + " should now be " + this.task.category);
        this.tasks[this.task.id].category = this.task.category;        
        this.getTaskService.setUserTasks(this.user.id, this.tasks);
        console.log("Task should be updated.");
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

}
