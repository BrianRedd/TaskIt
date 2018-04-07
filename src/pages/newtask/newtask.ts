import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { TasksPage } from "../tasks/tasks";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO } from "../../shared/TaskVO";
import { CategoryVO, Categories } from "../../shared/CategoryVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { DateconverterProvider } from "../../providers/dateconverter/dateconverter";

@IonicPage()
@Component({
  selector: 'page-newtask',
  templateUrl: 'newtask.html',
})
export class NewTaskPage {

  user: UserVO = this.userModel.user;
  newTaskForm: FormGroup;
  tasks: TaskVO[];
  task: TaskVO;
  categories = Categories;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    public navParams: NavParams
  ) {
    console.log(this.categories);
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.newTaskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: "",
      dateScheduled: ["", [Validators.required]],
      recurring: false,
      priority: 1,
      category: 0,
      list: ""
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTaskPage');
  }

  onSubmit() {
    this.getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = tasks;
      this.task = new TaskVO();
      this.task.id = this.tasks.length;
      this.task.title = this.newTaskForm.get("title").value;
      if (!this.newTaskForm.get("description").value) {
        this.task.description = this.task.title;
      } else {
        this.task.description = this.newTaskForm.get("description").value;
      }
      this.task.dateScheduled = this.newTaskForm.get("dateScheduled").value;
      this.task.recurring = this.newTaskForm.get("recurring").value;
      this.task.priority = this.newTaskForm.get("priority").value;
      this.task.category = parseInt(this.newTaskForm.get("category").value);
      this.task.dateCreated = this.dateService.todaysDateString();
      //List
      if (this.newTaskForm.get("list").value) {
        let list: any = [];
        let tmplist: any = this.newTaskForm.get("list").value;
        tmplist = tmplist.split("\n");
        console.log(tmplist);
        for (var i: number = 0; i < tmplist.length; i++) {
          list[i] = {
            "id": i,
            "title": tmplist[i],
            "completed": false
          };
        }
        this.task.list = list;
      }
      //add new task to tasks array, push to storage
      console.log("New task", this.task)
      this.tasks.push(this.task);
      this.getTaskService.setUserTasks(this.user.id, this.tasks).subscribe(tasks => {
        this.tasks = tasks;
        console.log("Tasks updated", this.tasks);
        this.navCtrl.push(TasksPage);
      });
    });
  };

}
