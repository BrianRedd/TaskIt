import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskVO } from "../../shared/TaskVO";

@IonicPage()
@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html',
})
export class TaskDetailPage {

  task: TaskVO;

  constructor(
    public navCtrl: NavController, 
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
