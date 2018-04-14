import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Md5 } from "ts-md5/dist/md5";

import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";
import { GetuserdataProvider } from "../../providers/getuserdata/getuserdata";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  users: UserVO[];
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
    private getUserService: GetuserdataProvider,
    public navParams: NavParams
  ) {
    getUserService.getTIUsers().subscribe((users) => {
        this.users = users;
    });
    this.editUserForm = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: [this.user.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      confirm: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: [this.user.email, [Validators.email]],
      birthday: this.user.birthday
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
    this.editUserForm.patchValue({
      firstname: "",
      lastname: ""
    });
    this.edit.name = true;
  };

  editPassword() {
    //this.mmmToast("Coming Soon!", "middle")
    this.editUserForm.patchValue({
      password: "",
      confirm: ""
    });
    this.edit.password = true;
  };

  editEmail() {
    //this.mmmToast("Coming Soon!", "middle")
    this.editUserForm.patchValue({
      email: ""
    });
    this.edit.email = true;
  };

  editBirthday() {
    //this.mmmToast("Coming Soon!", "middle")
    this.edit.birthday = true;
  };

  onSubmit() {
    let err: boolean = false;
    this.user.firstname = this.editUserForm.get("firstname").value;
    this.user.lastname = this.editUserForm.get("lastname").value;
    if (this.editUserForm.get("password").dirty && Md5.hashStr(this.editUserForm.get("password").value) != this.user.password) {
      let password: any = this.editUserForm.get("password").value;
      let confirm: string = this.editUserForm.get("confirm").value;
      if (password != confirm) {
        this.mmmToast("Password and Confirmation do not match", "middle");
        err = true;
      } else {
        password = Md5.hashStr(password);
        this.user.password = password;
      }
    }
    this.user.email = this.editUserForm.get("email").value;
    this.user.birthday = this.editUserForm.get("birthday").value;
    this.users[this.user.id] = this.user;
    if (!err) {
      this.getUserService.setCTIUser(this.user).subscribe((user) => {
          this.getUserService.setTIUsers(this.users).subscribe((users) => {
            this.mmmToast("User " + this.user.username + " updated.", "top");
            this.onCancel();
          });
      });
    };
  };

  onCancel() {
    this.edit.name = false;
    this.edit.password = false;
    this.edit.email = false;
    this.edit.birthday = false;
  };

}
