import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";

import { NewUserPage } from "../../pages/newuser/newuser";

import { AuthenticationProvider } from "../../providers/authentication/authentication";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  user: any = {username: "", password: ""};

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private authService: AuthenticationProvider,
    private storage: Storage,
    public navParams: NavParams
  ) {
    storage.get("CTIuser").then((user) => {
      if (user) {
        console.log("Stored Current TaskIt user:", user);
        this.loginForm.patchValue({
          "username": user.username,
          "password": user.password
        });
      } else {
        console.log("No stored Current TaskIt user");
        //TO DO: look for "users" in storage, if no users, then open Modal
        //should be able to remember users but not remember current user
        this.openNewUserModal();
      }
    });
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      remember: true
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit() {
    this.user.username = this.loginForm.get("username").value;
    this.user.password = this.loginForm.get("password").value;
    if (this.loginForm.get("remember").value) {
      this.storage.set("CTIuser", this.user);
    } else {
      this.storage.remove("CTIuser");
    }
    //TO DO: Check credentials against "users" stored in memory
  };

  openNewUserModal() {
    let modal = this.modalCtrl.create(NewUserPage);
    modal.present();
    modal.onDidDismiss(() => {

    })
  };

}
