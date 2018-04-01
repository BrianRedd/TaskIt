import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";

import { NewUserPage } from "../../pages/newuser/newuser";

//import { UserVO } from "../../shared/UserVO";
import { GetuserdataProvider } from "../../providers/getuserdata/getuserdata";
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
    private getUserService: GetuserdataProvider,
    private storage: Storage,
    public navParams: NavParams
  ) {
    this.isCurrentUserRemembered();
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      remember: false
    });
    getUserService.getTIUsers().subscribe(users => {
      if (!users) {
        this.openNewUserModal();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  isCurrentUserRemembered() {
    this.getUserService.getCTIUser().subscribe(user => {
      if (user) {
        console.log("From GetUserService: Stored Current TaskIt user:", user);
        this.loginForm.patchValue({
          "username": user.username,
          "password": user.password
        });
      } else {
        console.log("From GetUserService: No stored Current TaskIt user");
        //this.openNewUserModal();
      }
    });
  };

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
      this.isCurrentUserRemembered();
    })
  };

}
