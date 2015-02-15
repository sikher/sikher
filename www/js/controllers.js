angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Data, Scripture, Settings, $ionicLoading, Focus, Store, RecentSearches) {
  Focus('search');
  $scope.showResults = false;
  $scope.viewAs = Settings.get('viewAs');
  $scope.scriptures = [];
  $scope.searches = RecentSearches;

  $scope.getResults = function() {
    $ionicLoading.show();
    $scope.showResults = false;

    Scripture.getResults($scope.searchText).then(function(res){
      if (window.cordova && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.close(); }
      $ionicLoading.hide();
      $scope.scriptures = res;
      $scope.showResults = true;
      if($scope.searchText.length > 0) { $scope.addToRecentSearches(); }
    });
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
    $scope.showResults = true;
  });

  if($stateParams.viewAs === 'page')
  {
    $scope.favourite = function(id, hymn, gurmukhi)
    {
      var obj = [{ id: id, hymn: hymn, gurmukhi: gurmukhi}];
      Data.add(obj, Favourites, id);
      Store.set('sikher_favourites', Favourites)
      $ionicPopup.alert({
           title: 'Saved to Favourites',
           template: 'You successfully saved this hymn to Favourites'
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
    $rootScope.keyPress = function(event) {
        if(event.which === 39)
        {
          $ionicSlideBoxDelegate.next();
        }

        if(event.which === 37)
        {
          $ionicSlideBoxDelegate.previous();
        }
    };
  }
})

.controller('RandomCtrl', function($scope, Settings, $state) {
  var max_hymns = 5540;
  $scope.random = function() { return Math.floor((Math.random() * max_hymns) + 1) }
  $state.go('tab.view', { viewAs: Settings.get('viewAs'), hymnId : $scope.random() });
})

.controller('FavouritesCtrl', function($scope, Data, Favourites, Settings, Store) {
  $scope.viewAs = Settings.get('viewAs');
  $scope.favourites = Data.all(Favourites);
  $scope.remove = function(id) {
    Data.remove(Favourites, id);
    Store.set('sikher_favourites', Favourites);
  }
})

.controller('PrayersCtrl', function($scope, Data, Prayers, $ionicLoading) {
  $ionicLoading.show();
  Prayers.get().then(function(res){
    $ionicLoading.hide();
    $scope.prayers = res.data;
  })
})

.controller('PrayersDetailCtrl', function($scope, $stateParams, Data, Prayers, $css, $ionicLoading, URLResolver, $cordovaMedia) {
  $ionicLoading.show();
  $css.bind({href: 'css/prayers-detail.css'}, $scope);

  Prayers.get()
  .then(function(res){

    $scope.prayers = res.data;

    $scope.prayer = $scope.prayers[$stateParams.prayerId];

    Prayers.get($scope.prayer.file).then(function(res){
      $ionicLoading.hide();
      $scope.prayer.audioURI = URLResolver.resolve($scope.prayer.audio);
      $scope.prayer.data = res.data;
    })
  })
})

.controller('SettingsCtrl', function($scope, Settings, Store, RecentSearches, $ionicPopup, $window) {
  $scope.viewAs = Settings.get('viewAs');

  $scope.updateSettings = function() {
    Settings.set('viewAs',$scope.viewAs);
  }

  $scope.clearRecentSearches = function() {
    RecentSearches = [];
    Store.set('sikher_recent', RecentSearches);
    var popup_confirm_clear = $ionicPopup.alert({
         title: 'Cleared Recent Searches',
         template: 'You successfully cleared your recent searches'
    });

    popup_confirm_clear.then(function(res){
      $window.location.reload();
    })
  }
});