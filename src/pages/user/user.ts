import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
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

  editName() {
    this.mmmToast("Coming Soon!", "middle")
  };

  editPassword() {
    this.mmmToast("Coming Soon!", "middle")
  };

  editEmail() {
    this.mmmToast("Coming Soon!", "middle")
  };

  editBirthday() {
    this.mmmToast("Coming Soon!", "middle")
  };

}
