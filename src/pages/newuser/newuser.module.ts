import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUserPage } from './newuser';

@NgModule({
  declarations: [
    NewUserPage,
  ],
  imports: [
    IonicPageModule.forChild(NewUserPage),
  ],
})
export class NewuserPageModule {}
