import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app';
import { Favourites } from './favourites';

@NgModule({
  declarations: [
    Favourites,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  exports: [
    Favourites
  ]
})
export class FavouritesModule {}
