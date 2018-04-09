import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EdittaskPage } from './edittask';

@NgModule({
  declarations: [
    EdittaskPage,
  ],
  imports: [
    IonicPageModule.forChild(EdittaskPage),
  ],
})
export class EdittaskPageModule {}
