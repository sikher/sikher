angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Data, Scripture, Settings) {
  $scope.scriptures = Data.all(Scripture);
  $scope.viewAs = Settings.get('viewAs');
})

.controller('ViewCtrl', function($scope, $stateParams, Data, Scripture, $ionicSlideBoxDelegate, $css, $state, $timeout){
  if($stateParams.viewAs === 'page')
  {
    $scope.scriptures = Data.filter(Scripture, $stateParams.hymnId, 'hymn');
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
    $scope.scriptures = Data.filter(Scripture, $stateParams.hymnId, 'hymn');
  }
})

.controller('RandomCtrl', function($scope, Data, Scripture, Settings, $state) {
  var max_hymns = 6;
  $scope.random = function() { return Math.floor((Math.random() * max_hymns) + 1) }
  $state.go('tab.view', { viewAs: Settings.get('viewAs'), hymnId : $scope.random() });
})

.controller('FavouritesCtrl', function($scope, Data, Favourites) {
  $scope.favourites = Data.all(Favourites);
  $scope.remove = function(scripture) {
    Data.remove(Favourites, scripture);
  }
})

.controller('PrayersCtrl', function($scope, Data, Prayers) {
  $scope.prayers = Data.all(Prayers);
})

.controller('PrayersDetailCtrl', function($scope, $stateParams, Data, Prayers) {
  $scope.prayers = Data.get(Prayers, $stateParams.prayerId);
  $scope.prayer = $scope.prayers[0];
})

.controller('SettingsCtrl', function($scope, Settings) {

  $scope.viewAs = Settings.get('viewAs');

  $scope.updateSettings = function() {
    Settings.set('viewAs',$scope.viewAs);
  }
});