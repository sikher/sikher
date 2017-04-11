import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app';
import { Prayers } from './prayers';

@NgModule({
  declarations: [
    Prayers,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  exports: [
    Prayers
  ]
})
export class PrayersModule {}
