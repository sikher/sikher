angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Data, Scripture, Settings, $ionicLoading, Focus, Store, RecentSearches) {
  Focus('search');
  $scope.showResults = false;
  $scope.search = Settings['search'];
  $scope.viewAs = Settings['viewAs'];
  $scope.scriptures = [];
  $scope.searches = RecentSearches;

  $scope.getResults = function() {
    $ionicLoading.show();
    $scope.showResults = false;
    var page_search = /^\d+$/;
    if(page_search.test($scope.searchText))
    {
      Scripture.getPage($scope.searchText).then(function(res){
        if (window.cordova && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.close(); }
        $ionicLoading.hide();
        $scope.scriptures = res;
        $scope.showResults = true;
        if($scope.searchText.length > 0) { $scope.addToRecentSearches(); }
      });
    }
    else
    {
      Scripture.getResults($scope.searchText, $scope.search).then(function(res){
        if (window.cordova && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.close(); }
        $ionicLoading.hide();
        $scope.scriptures = res;
        $scope.showResults = true;
        if($scope.searchText.length > 0) { $scope.addToRecentSearches(); }
      });
    }
  }

  $scope.addToRecentSearches = function() {
    RecentSearches.push($scope.searchText);
    Store.set('sikher_recent', RecentSearches);
  }

})

.controller('ViewCtrl', function($scope, $stateParams, Data, Scripture, Favourites, $ionicSlideBoxDelegate, $css, $state, $timeout, $ionicLoading, Store, $ionicPopup, $rootScope){
  $ionicLoading.show();
  $scope.showResults = false;

  Scripture.getHymn($stateParams.hymnId).then(function(res){
    $ionicLoading.hide();
    $scope.scriptures = res;
    $scope.page = res[0].page;
    $scope.scriptureName = res[0].scripture;
    $scope.showResults = true;
  });

  if($stateParams.viewAs === 'hymn')
  {
    $scope.nextHymn = function() { $state.go($state.$current, {viewAs: $stateParams.viewAs, hymnId : Number($stateParams.hymnId) + 1}); }
    $scope.previousHymn = function() { $state.go($state.$current, {viewAs: $stateParams.viewAs, hymnId : Number($stateParams.hymnId) - 1}); }
    $scope.favourite = function(id, hymn, gurmukhi)
    {
      var obj = [{ id: id, hymn: hymn, gurmukhi: gurmukhi}];
      Data.add(obj, Favourites, id);
      Store.set('sikher_favourites', Favourites)
      $ionicPopup.alert({
           title: 'Favourite Added',
           template: 'This hymn has been added to your favourites'
      });
    }
  }
  else if($stateParams.viewAs === 'slides')
  {
    $css.bind({href: 'css/view-slides.css'}, $scope);
    $scope.closeSlideshow = function() { $state.go('tab.search'); $timeout(function(){$css.removeAll()},700); }
    $scope.nextSlide = function() { $ionicSlideBoxDelegate.next(); }
    $scope.previousSlide = function() { $ionicSlideBoxDelegate.previous(); }
    $scope.gotoSlide = function (index) { $ionicSlideBoxDelegate.slide(index); }
    $scope.showNavigator = false;
    $scope.toggleNavigator = function() { if($scope.showNavigator===false) { $scope.showNavigator = true; } else { $scope.showNavigator = false; } }
  }
})

.controller('RandomCtrl', function($scope, Settings, $state) {
  var max_hymns = 5540;
  $scope.random = function() { return Math.floor((Math.random() * max_hymns) + 1) }
  $state.go('tab.view', { viewAs: Settings['viewAs'], hymnId : $scope.random() });
})

.controller('FavouritesCtrl', function($scope, Data, Favourites, Settings, Store) {
  $scope.viewAs = Settings['viewAs'];
  $scope.favourites = Data.all(Favourites);
  $scope.remove = function(id) {
    Data.remove(Favourites, id);
    Store.set('sikher_favourites', Favourites);
  }
})

.controller('PrayersCtrl', function($scope, Data, Prayers, $ionicLoading, Settings) {
  $ionicLoading.show();
  $scope.viewAs = Settings['viewAs'];
  Prayers.get().then(function(res){
    $ionicLoading.hide();
    $scope.prayers = res.data;
  })
})

.controller('PrayersDetailCtrl', function($scope, $stateParams, Data, Prayers, $css, $ionicLoading, URLResolver, $state, $timeout, $ionicSlideBoxDelegate, Slicer, DataLimit) {
  $ionicLoading.show();
  $scope.showResults = false;

  Prayers.get().then(function(res){
    $scope.prayers = res.data;
    $scope.prayer = $scope.prayers[$stateParams.prayerId];

    Prayers.get($scope.prayer.file).then(function(res){
      $scope.prayer.audioURI = URLResolver.resolve($scope.prayer.audio);
      $scope.prayer.data = res.data;
      $scope.prayer.dataSlice = Slicer.slice(res.data,0);
      $ionicLoading.hide();
      $scope.showResults = true;
    })
  })

  if($stateParams.viewAs === 'hymn')
  {
    $css.bind({href: 'css/prayers-hymn.css'}, $scope);
  }
  else if($stateParams.viewAs === 'slides')
  {
    $css.bind({href: 'css/view-slides.css'}, $scope);
    $scope.closePrayersSlideshow = function() { $state.go('tab.prayers'); $timeout(function(){$css.removeAll()},700); }
    $scope.nextSlide = function(fullIndex) { $scope.needMore(fullIndex, 'next'); }
    $scope.previousSlide = function(fullIndex) { $scope.needMore(fullIndex, 'previous'); }
    $scope.gotoSlide = function (fullIndex) {
      for(var i=0;i<$scope.prayer.dataSlice.length;i++){
        if($scope.prayer.dataSlice[i]._id === fullIndex) {
          $ionicSlideBoxDelegate.slide(fullIndex - 1 % DataLimit);
          return;
        }
      }

      $scope.prayer.dataSlice = Slicer.slice($scope.prayer.data, fullIndex);
      $ionicSlideBoxDelegate.update();
      $ionicSlideBoxDelegate.slide(fullIndex - 1 % DataLimit);
    }
    $scope.needMore = function(fullIndex, direction) {

      // TODO:
      // Let's make sure this works with swipe too
      // At truly the end of the data set, after which is returns empty, do not do anything
      // Try to ensure that once a new slice is received there is some kind of slide transition

      var index = $ionicSlideBoxDelegate.currentIndex();

      // console.log('index', index, 'fullIndex', fullIndex, 'direction', direction);

      if(Slicer.isEnd(index) === true) {
        if(direction === 'next') {
          $scope.prayer.dataSlice = Slicer.slice($scope.prayer.data, fullIndex);
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.slide(0); // Showing first slide
          return;
        }
      }

      if(Slicer.isStart(index) === true) {
        if(direction === 'previous') {
          if(fullIndex === 1) { return; } // If scripture is at beginning, line 1, do not allow to go back
          
          $scope.prayer.dataSlice = Slicer.slice($scope.prayer.data, fullIndex-2);
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.slide(DataLimit - 1); // Showing end slide
          return;
        }
      }

      if(direction === 'next') {
        $ionicSlideBoxDelegate.next();
        return;
      }

      if(direction === 'previous') {
        $ionicSlideBoxDelegate.previous();
        return;
      }
    }
    $scope.showNavigator = false;
    $scope.toggleNavigator = function() { if($scope.showNavigator===false) { $scope.showNavigator = true; } else { $scope.showNavigator = false; } }
  }
})

.controller('SettingsCtrl', function($scope, Settings, Store, RecentSearches, $ionicPopup, $window) {
  $scope.search = Settings['search'];
  $scope.viewAs = Settings['viewAs'];
  $scope.font = Settings['font'];

  $scope.updateSettings = function() {
    Settings['search'] = $scope.search;
    Settings['viewAs'] = $scope.viewAs;
    Settings['font'] = $scope.font;

    Store.set('sikher_settings', Settings);

    $ionicPopup.alert({
         title: 'Settings Saved',
         template: 'Your settings have been saved'
    });
  }

  $scope.clearRecentSearches = function() {
    RecentSearches = [];
    Store.set('sikher_recent', RecentSearches);
    var popup_confirm_clear = $ionicPopup.alert({
         title: 'Recent Searches Cleared',
         template: 'Your recent searches have been cleared'
    });

    popup_confirm_clear.then(function(res){
      $window.location.reload();
    })
  }
});