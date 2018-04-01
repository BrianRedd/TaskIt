import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailPage } from './taskdetail';

@NgModule({
  declarations: [
    TaskDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailPage),
  ],
})
export class TaskdetailPageModule {}
