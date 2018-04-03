import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: UserVO = this.userModel.user;

  constructor(
    public navCtrl: NavController, 
    private userModel: UserModel,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
