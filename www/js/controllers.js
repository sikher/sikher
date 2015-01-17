angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Scripture) {
  $scope.scriptures = Scripture.all();
})

.controller('RandomCtrl', function($scope, Scripture) {
})

.controller('FavouritesCtrl', function($scope, Favourites) {
  $scope.favourites = Favourites.all();
  $scope.remove = function(scripture) {
    Favourites.remove(scripture);
  }
})

.controller('PrayersCtrl', function($scope, Prayers) {
  $scope.prayers = Prayers.all();
})

.controller('PrayersDetailCtrl', function($scope, $stateParams, Prayers) {
  $scope.prayer = Prayers.get($stateParams.prayerId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settingsOptions = [
    {value: 'page', label: 'Page'},
    {value: 'slides', label: 'Slides'}
  ];

  $scope.settings = $scope.settingsOptions[0];
});
