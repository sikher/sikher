// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'door3.css', 'ngCordova'])

.constant('$ionicLoadingConfig', {
  template: 'Loading...'
})

.run(function($ionicPlatform, $rootScope, $state, $css, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.show();
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.goHome = function() {
    $state.transitionTo('tab.search', {}, { reload: true, inherit: true, notify: true });
    $css.removeAll();
  }

  $rootScope.showLoading = function()
  {
    $ionicLoading.show();
  }
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.search', {
    cache: false,
    url: '/search',
    views: {
      'search': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  .state('tab.view', {
    cache: false,
    url: '/view/:viewAs/:hymnId',
    views: {
      'search': {
        templateUrl: function ($stateParams){
          return 'templates/view-' + $stateParams.viewAs + '.html';
        },
        controller: 'ViewCtrl'
      }
    }
  })
  .state('tab.random', {
    cache: false,
    url: '/random',
    views: {
      'random': {
        controller: 'RandomCtrl'
      }
    }
  })

  .state('tab.favourites', {
      cache: false,
      url: '/favourites',
      views: {
        'favourites': {
          templateUrl: 'templates/favourites.html',
          controller: 'FavouritesCtrl'
        }
      }
  })

  .state('tab.prayers', {
      url: '/prayers',
      views: {
        'prayers': {
          templateUrl: 'templates/prayers.html',
          controller: 'PrayersCtrl'
        }
      }
    })
    .state('tab.prayers-detail', {
      url: '/prayers/:prayerId',
      views: {
        'prayers': {
          templateUrl: 'templates/prayers-detail.html',
          controller: 'PrayersDetailCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'settings': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/search');

});
