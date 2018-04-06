import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskVO } from "../../shared/TaskVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";

@IonicPage()
@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html',
})
export class TaskDetailPage {

  task: TaskVO;
  priorityStr: any = ["Low", "Normal", "High"];

  constructor(
    public navCtrl: NavController, 
    private getTaskService: GettaskdataProvider,
    public navParams: NavParams
  ) {
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
  }

}
