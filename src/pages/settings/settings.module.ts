import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app';
import { Settings } from './settings';

@NgModule({
  declarations: [
    Settings,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  exports: [
    Settings
  ]
})
export class SettingsModule {}
