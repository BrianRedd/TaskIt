import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EmailComposer } from "@ionic-native/email-composer";
import { DebugPage } from '../debug/debug';
import { UserModel } from "../../models/usermodel";
import { UserVO } from "../../shared/UserVO";

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  user: UserVO = this.userModel.user;

  constructor(
    public navCtrl: NavController, 
    private modalCtrl: ModalController,
		private emailComposer: EmailComposer,
    private userModel: UserModel,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  openDebugger(datatype: string) {
    let modal = this.modalCtrl.create(DebugPage, {
      datatype: datatype
    });
    modal.present();
  }

  emailBug() {
    let email = {
      to: "me@rbrianredd.com",
      subject: "[Bug Report: TaskIT]",
      body: "[Bug Report: TaskIT]",
      isHtml: true
    }
  }

}
