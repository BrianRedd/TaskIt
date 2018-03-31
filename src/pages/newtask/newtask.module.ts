import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTaskPage } from './newtask';

@NgModule({
  declarations: [
    NewTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTaskPage),
  ],
})
export class NewtaskPageModule {}
