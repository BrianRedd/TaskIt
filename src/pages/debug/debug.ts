import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { UserVO } from "../../shared/UserVO";
import { TaskVO } from "../../shared/TaskVO";
import { CategoryVO, Categories } from "../../shared/CategoryVO";
import { GettaskdataProvider } from "../../providers/gettaskdata/gettaskdata";
import { GetuserdataProvider } from "../../providers/getuserdata/getuserdata";
import { UserModel } from '../../models/usermodel';

@IonicPage()
@Component({
  selector: 'page-debug',
  templateUrl: 'debug.html',
})
export class DebugPage {

  datatype: string;
  user: UserVO = this.userModel.user;
  users: UserVO[];
  tasks: TaskVO[];

  constructor(
    public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private userModel: UserModel,
    private getTaskService: GettaskdataProvider,
    private getUserService: GetuserdataProvider,
    public navParams: NavParams
  ) {
    this.datatype = navParams.get("datatype");
    getUserService.getTIUsers().subscribe((users) => {
      this.users = users;
    })
    getTaskService.getUserTasks(this.user.id).subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DebugPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
