import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, reorderArray, AlertController, ActionSheetController } from 'ionic-angular';

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

import { TaskVO, ListVO } from "../../shared/TaskVO";
import { CategoryVO, Categories } from "../../shared/CategoryVO";
import { EdittaskPage } from "../../pages/edittask/edittask";

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
  reorder: boolean = false;

  constructor(
    private userModel: UserModel,
    public navCtrl: NavController, 
    private getTaskService: GettaskdataProvider,
    private taskFilter: TaskfilterProvider,
    private dateService: DateconverterProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
    public navParams: NavParams
  ) {
    this.getTaskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.tasks = this.taskFilter.sortTasks(tasks, "id", "asc");
      this.tasks = this.taskFilter.styleTasks(tasks);
      //category not defined - **TEMPORARY**
      /*if (!this.task.category) {
        //console.log("Category for task #" + this.task.id + " is undefined");
        this.task.category = 5;
        //console.log("Category for task #" + this.task.id + " should now be " + this.task.category);
        this.tasks[this.task.id].category = this.task.category;        
        this.getTaskService.setUserTasks(this.user.id, this.tasks);
        //console.log("Task should be updated.");
      }*/
    });
    this.task = this.navParams.get("task");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter TaskDetailPage');
    let id = this.task.id;
    this.getTaskService.getTask(this.user.id, id).subscribe((task) => {
      this.task = task;
    });
  }

  updateTasks() {
    this.tasks[this.task.id] = this.task;
    this.tasks = this.taskFilter.styleTasks(this.tasks);
    this.tasks[this.task.id].dateUpdated = this.dateService.todaysDateString();
    this.getTaskService.setUserTasks(this.user.id, this.tasks);
  }

  addListItem() {
    if (this.task.completed) {
      this.mmmToast("Action only available on Active tasks", "middle");
      return;
    }
    let alert = this.alertCtrl.create({
      title: "Add List Item",
      inputs: [
        {
          name: "item",
          placeholder: "List Item"
        }
      ], 
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {
            console.log("Action canceled")
          }
        },
        {
          text: "Add",
          handler: (data) => {
            console.log(data.item + " added to list");
            let curlist: any = this.task.list;
            if (!curlist || curlist.length === 0) {
              let newitem: any = [{
                id: 0,
                title: data.item,
                completed: false
              }];
              this.task.list = newitem;
            } else {
              let newitem: any = {
                id: curlist.length,
                title: data.item,
                completed: false
              };
              this.task.list.push(newitem);
            }
            this.updateTasks();
          }
        }
      ]       
    });
    alert.present();
  }

  toggleReorder() {
    this.reorder = !this.reorder;
  }
  
  reorderListItems(indexes: any) {
    this.task.list = reorderArray(this.task.list, indexes);
    this.updateTasks();
  }

  completeListItem(item, listitem) {
    if (listitem.completed) {
      listitem.completed = false;
    } else {
      listitem.completed = true;
    }
    let index: number;
    let curlist: any = this.tasks[this.task.id].list;
    for (var i: number = 0; i < curlist.length; i++) {
      if (curlist[i].id === listitem.id) {
        index = i;
      }
    }
    this.tasks[this.task.id].list[index].completed = listitem.completed;
    this.updateTasks();
  }

  completeTask() {
    //console.log(task.id, task.title);
    this.tasks = this.taskFilter.sortTasks(this.tasks, "id", "asc");
    this.task.dateUpdated = this.dateService.todaysDateString();
    if (this.task.completed) {
      this.restoreTask();
    } else {
      this.task.completed = true;
      this.mmmToast("Task " + this.task.title + " completed!", "middle");
    }
    this.updateTasks();
  }

  restoreTask() {
    let alert = this.alertCtrl.create({
      title: "Un-Complete Task?",
      message: "Are you sure you want to return &quot;" +  this.task.title + "&quot; to non-completed state?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Action canceled!");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.task.completed = false;
            this.mmmToast("Task " + this.task.title + " restored to active!", "middle");
            this.updateTasks();
          }
        }
      ]
    });
    alert.present();
  }

  presentActionSheet() {
    //this.mmmToast("Coming soon!", "middle");
    let status = {
      "msg": "Complete Task",
      "icon": "checkbox-outline"
    };
    if (this.task.completed) {
      status = {
        "msg": "Restore Task",
        "icon": "square-outline"
      };
    }
    let actionSheet = this.actionCtrl.create({
      title: "Advanced Task Options",
      buttons: [
        {
          text: status.msg,
          icon: status.icon,
          handler: () => {
            if (!this.task.completed) {
              this.completeTask();
            } else {
              this.restoreTask();
            }
          }
        }, 
        {
          text: "Edit Task",
          icon: "create",
          handler: () => {
            this.editTask();
          }
        },  
        {
          text: "Clone Task",
          icon: "copy",
          handler: () => {
            this.cloneTask();
          }
        }, 
        {
          text: "Add List Item",
          icon: "add-circle",
          handler: () => {
            this.addListItem();
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  editTask() {
    //console.log(this.task);
    if (this.task.completed) {
      this.mmmToast("Action only available on Active tasks", "middle");
      return;
    }
    this.navCtrl.push(EdittaskPage, {
      task: this.task
    });
  }

  cloneTask() {
    let alert = this.alertCtrl.create({
      title: "Clone Task?",
      message: "Are you sure you want to clone &quot;" +  this.task.title + "&quot;?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("Action canceled!");
          }
        },
        {
          text: "Yes",
          handler: () => {
            let clonetask: TaskVO = new TaskVO;
            clonetask = this.task;
            clonetask.title = "New " + clonetask.title;
            this.navCtrl.push(EdittaskPage, {
              task: clonetask,
              clone: true
            });
          }
        }
      ]
    });
    alert.present();
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
