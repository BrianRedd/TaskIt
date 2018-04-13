import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
//import { TaskDetailPage } from "../taskdetail/taskdetail";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO } from "../../shared/TaskVO";
import { CategoryVO, Categories } from "../../shared/CategoryVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { TaskfilterProvider } from "../../providers/taskfilter/taskfilter";
import { DateconverterProvider } from "../../providers/dateconverter/dateconverter";
import { TasksPage } from '../tasks/tasks';
import { TaskDetailPage } from '../taskdetail/taskdetail';

@IonicPage()
@Component({
  selector: 'page-edittask',
  templateUrl: 'edittask.html',
})
export class EdittaskPage {

  user: UserVO = this.userModel.user;
  editTaskForm: FormGroup;
  tasks: TaskVO[];
  task: TaskVO;
  clone: boolean;
  listitems: string = "";
  categories = Categories;

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private userModel: UserModel,
    private taskFilter: TaskfilterProvider,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    public navParams: NavParams
  ) {
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = tasks;
      this.tasks = taskFilter.sortTasks(tasks, "id", "asc");
      //console.log("Task Editor task list, sorted", this.tasks);
    });
    this.task = navParams.get("task");
    if (navParams.get("clone")) {
      this.clone = navParams.get("clone");
    } 
    //console.log("Editing:", this.task);
    if (this.task.list && this.task.list.length > 0) {
      for (var i: number = 0; i < this.task.list.length; i++) {
        this.listitems += this.task.list[i].title + "\n";
      }
    }
    this.editTaskForm = this.formBuilder.group({
      title: [this.task.title, [Validators.required]],
      description: this.task.description,
      dateScheduled: [this.task.dateScheduled, [Validators.required]],
      recurring: this.task.recurring,
      priority: this.task.priority,
      category: this.task.category,
      list: this.listitems
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdittaskPage');
  }

  onSubmit() {
    let tt: number;
    if (this.clone) {
      tt = this.tasks.length;
      let clonetask: TaskVO = new TaskVO;
      clonetask.id = tt;
      clonetask.dateCreated = this.dateService.todaysDateString();
      clonetask.completed = false;
      this.tasks.push(clonetask);
    } else {
      tt = this.task.id;
      this.tasks[tt].id = tt;
    }
    this.tasks[tt].title = this.editTaskForm.get("title").value;
    if (!this.editTaskForm.get("description").value) {
      this.tasks[tt].description = this.tasks[tt].title;
    } else {
      this.tasks[tt].description = this.editTaskForm.get("description").value;
    }
    this.tasks[tt].dateScheduled = this.editTaskForm.get("dateScheduled").value;
    this.tasks[tt].recurring = this.editTaskForm.get("recurring").value;
    this.tasks[tt].priority = this.editTaskForm.get("priority").value;
    this.tasks[tt].category = parseInt(this.editTaskForm.get("category").value);
    if (this.clone) {
      this.tasks[tt].dateUpdated = "";
    } else {
      this.tasks[tt].dateUpdated = this.dateService.todaysDateString();
    }
    //List
    if (this.editTaskForm.get("list").value) {
      let newlist: any = [];
      let tmplist: any = this.editTaskForm.get("list").value;
      tmplist = tmplist.split("\n");
      //console.log(tmplist);
      let ii: number = 0;
      for (var i: number = 0; i < tmplist.length; i++) {
        //console.log("i", i, "ii", ii);
        if (tmplist[i]) {
          newlist[ii] = {
            "id": ii,
            "title": tmplist[i],
            "completed": false
          };
          ii++;
        }
      }
      //console.log("newlist", newlist);
      this.tasks[tt].list = newlist;
    }
    this.task = this.tasks[tt];
    //console.log("Updated Task " + tt, this.tasks[tt]);
    this.getTaskService.setUserTasks(this.user.id, this.tasks).subscribe(tasks => {
      this.tasks = tasks;
      //console.log("Tasks updated", this.tasks);
      if (this.clone) {
        this.navCtrl.push(TaskDetailPage, {
          task: this.task
        });
      } else {
        this.navCtrl.pop();
      }
    });
  };

}
