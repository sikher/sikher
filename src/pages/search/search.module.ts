import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app';
import { Search } from './search';

@NgModule({
  declarations: [
    Search,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  exports: [
    Search
  ]
})
export class SearchModule {}
