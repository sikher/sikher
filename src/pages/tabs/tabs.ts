import { Component } from '@angular/core';

import { Prayers } from '../prayers/prayers';
import { Random } from '../random/random';
import { Search } from '../search/search';
import { Favourites } from '../favourites/favourites';
import { Settings } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Prayers;
  tab2Root = Random;
  tab3Root = Search;
  tab4Root = Favourites;
  tab5Root = Settings;

  constructor() {

  }
}
