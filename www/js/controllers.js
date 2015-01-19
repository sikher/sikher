angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Data, Scripture) {
  $scope.scriptures = Data.all(Scripture);
})

.controller('RandomCtrl', function($scope, Data, Scripture) {
  var max_hymns = 6;
  $scope.random = function() { return Math.floor((Math.random() * max_hymns) + 1) }
  $scope.scriptures = Data.filter(Scripture, $scope.random(), 'hymn');
})

.controller('ViewCtrl', function($scope, $stateParams, Data, Scripture){
  $scope.scriptures = Data.filter(Scripture, $stateParams.hymnId, 'hymn');
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
  $scope.prayer = Data.get(Prayers, $stateParams.prayerId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settingsOptions = [
    {value: 'page', label: 'Page'},
    {value: 'slides', label: 'Slides'}
  ];

  $scope.settings = $scope.settingsOptions[0];
});
