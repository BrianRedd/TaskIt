import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";

import { NewUserPage } from "../../pages/newuser/newuser";
import { HomePage } from "../../pages/home/home";

import { UserVO } from "../../shared/UserVO";
import { UserModel } from "../../models/usermodel";
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
  authenticated: boolean = false;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private authService: AuthenticationProvider,
    private getUserService: GetuserdataProvider,
    private storage: Storage,
    public userModel: UserModel,
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
          "password": user.password,
          "remember": true
        });
      } else {
        console.log("From GetUserService: No stored Current TaskIt user");
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
    this.validateUser(this.user.username, this.user.password);
  };

  validateUser(username: string, password: string) {
    this.authService.validateUser(username, password).subscribe(data => {
      this.authenticated = data;
      console.log("this.authenticated", this.authenticated);
      if (this.authenticated) {
        console.log("this.userModel.validateUser()", this.userModel.validateUser());
        this.navCtrl.setRoot(HomePage);
      } else {
        this.badToast("Login Failed; Please Try Again!");
        this.loginForm.patchValue({
          "password": "",
          "remember": false
        });
      }
    })
  }

  openNewUserModal() {
    let modal = this.modalCtrl.create(NewUserPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.isCurrentUserRemembered();
    })
  };

  badToast(msg: string) {
    console.log(msg);
    let toast = this.toastCtrl.create({
      message: msg,
      position: "middle",
      duration: 3000
    });
    toast.present();
  };

}
