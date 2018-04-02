import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO, ListVO } from "../../shared/TaskVO";
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
  today: any = new Date();
  todayStr: string;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private dateService: DateconverterProvider,
    public navParams: NavParams
  ) {
    this.todayStr = dateService.dateToString(this.today);
    getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.newTaskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: "",
      dateScheduled: "",
      recurring: false,
      priority: 1,
      //category: 0, TO DO
      list: ""
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTaskPage');
  }

  onSubmit() {
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
    let tmplist: any = new ListVO();
    tmplist.id = 0;
    tmplist.title = this.newTaskForm.get("list").value;
    this.task.list = tmplist;
    this.tasks.push(this.task);
    this.getTaskService.setUserTasks(this.user.id, this.tasks).subscribe(tasks => {
      this.tasks = tasks;
    });
    console.log("Tasks updated", this.task, this.tasks);
  };

}
