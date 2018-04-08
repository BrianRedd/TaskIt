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
  editUserForm: FormGroup;
  edit: any = [{
    "name": false,
    "password": false,
    "email": false,
    "birthday": false
  }];

  constructor(
    public navCtrl: NavController, 
    private userModel: UserModel,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public navParams: NavParams
  ) {
    this.editUserForm = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: [this.user.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      confirm: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: [this.user.email, [Validators.email]],
      birthday: ""
    });
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
    //this.mmmToast("Coming Soon!", "middle")
    this.edit.name = true;
  };

  editPassword() {
    //this.mmmToast("Coming Soon!", "middle")
    this.edit.password = true;
  };

  editEmail() {
    //this.mmmToast("Coming Soon!", "middle")
    this.edit.email = true;
  };

  editBirthday() {
    //this.mmmToast("Coming Soon!", "middle")
    this.edit.birthday = true;
  };

  onSubmit() {};

  onCancel() {
    this.edit.name = false;
    this.edit.password = false;
    this.edit.email = false;
    this.edit.birthday = false;
  };

}
