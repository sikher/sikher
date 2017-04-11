import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app';
import { Random } from './random';

@NgModule({
  declarations: [
    Random,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  exports: [
    Random
  ]
})
export class RandomModule {}
