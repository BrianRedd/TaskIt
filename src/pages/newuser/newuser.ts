import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";

import { UserVO } from "../../shared/UserVO";

@IonicPage()
@Component({
  selector: 'page-newuser',
  templateUrl: 'newuser.html',
})
export class NewUserPage {

  newuserForm: FormGroup;
  users: UserVO[];
  user: UserVO = {
    id: null,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    birthday: "",
    image: "Later"
  };
  newid: number;
  newuser: boolean = false;

  constructor(
    public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    storage.get("TIusers").then((users) => {
      if (users) {
        console.log("New User: " + users.length + " users remembered");
        this.users = users;
        this.newid = users.length;
      } else {
        console.log("New User: no users remembered");
        this.users = [];
        this.newid = 0;
        this.newuser = true;
      }
    });
    this.newuserForm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      username: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      confirm: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: ["", [Validators.email]],
      birthday: ""
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewuserPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  badToast(msg: string) {
    console.log(msg);
    let toast = this.toastCtrl.create({
      message: msg,
      position: "middle",
      duration: 3000
    });
    toast.present();
  };

  onSubmit() {
    let isvalid: boolean = true;
    let errmess: boolean = false;
    console.log("New User: user before form:", this.user);
    if (this.newuserForm.get("password").value != this.newuserForm.get("confirm").value) {
      this.badToast("Passwords don't match!");
      errmess = true;
      isvalid = false;
      this.newuserForm.patchValue({
        password: "",
        confirm: ""
      });
    }
    if (!this.newuser) {
      let dup: boolean = false;
      for (var i: number = 0; i < this.users.length; i++) {
        if (this.newuserForm.get("username").value === this.users[i].username) {
          dup = true;
        }
        if (dup) {
          this.badToast("Username must be unique!");
          errmess = true;
          isvalid = false;
        }
      }
    }
    if (isvalid) {
      this.user.id = this.newid;
      this.user.firstname = this.newuserForm.get("firstname").value;
      this.user.lastname = this.newuserForm.get("lastname").value;
      this.user.username = this.newuserForm.get("username").value;
      this.user.password = this.newuserForm.get("password").value;
      this.user.email = this.newuserForm.get("email").value;      
      this.user.birthday = this.newuserForm.get("birthday").value;
      this.user.image = "Later";
      console.log("New User: user after form:", this.user);
      this.users.push(this.user);
      this.storage.set("CTIuser", this.user).then(() => {
        this.storage.set("TIusers", this.users).then(() => {
          this.viewCtrl.dismiss();
        });
      });
    } else {
      if (!errmess) {
        this.badToast("Error with form; try again.");
      }
    }
  }
}