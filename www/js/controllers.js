angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Data, Scripture, Settings, $ionicLoading, Focus, Store, RecentSearches, $filter, AppSettings) {
  Focus('search');
  $scope.showResults = false;
  $scope.search = Settings['search'];
  $scope.searchPlaceholder = $filter('placeholder')($scope.search)[0];
  $scope.viewAs = Settings['viewAs'];
  $scope.scriptures = [];
  $scope.searches = RecentSearches;
  $scope.totalResults = AppSettings.totalResults;

  $scope.optionalField = function(field) {
      if (field) {
          return field + ' - ';
      } else {
          return '';
      }
  }

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
      if($filter('placeholder')($scope.search)[2] === 'words')
      {
        Scripture.getResultsByWords($scope.searchText, $scope.search).then(function(res){
          if (window.cordova && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.close(); }
          $ionicLoading.hide();
          $scope.scriptures = res;
          $scope.showResults = true;
          if($scope.searchText.length > 0) { $scope.addToRecentSearches(); }
        });
      }
      else {
        Scripture.getResultsByFirstLetters($scope.searchText, $scope.search).then(function(res){
          if (window.cordova && window.cordova.plugins.Keyboard) { cordova.plugins.Keyboard.close(); }
          $ionicLoading.hide();
          $scope.scriptures = res;
          $scope.showResults = true;
          if($scope.searchText.length > 0) { $scope.addToRecentSearches(); }
        });
      }
    }
  }

	$scope.addToRecentSearches = function () {
		//stop inserting duplicate record
		for (var i = 0; i < RecentSearches.length; i++) {
			if (RecentSearches[i].searchText === $scope.searchText
				&& RecentSearches[i].searchType === $scope.search
				) {
        return;
			}
		}

		RecentSearches.push({
			searchText: $scope.searchText,
			searchType: $scope.search
		});
		Store.set('sikher_recent', RecentSearches);
	};

  $scope.getRecentSearchClass = function (searchType) {
    if (searchType === '') {
      return;
    }
    return $filter('placeholder')(searchType)[1];
	};
})

.controller('ViewCtrl', function($scope, $stateParams, Data, Scripture, Favourites, $ionicSlideBoxDelegate, $css, $state, $timeout, $ionicLoading, Store, $ionicPopup, $rootScope, $window, $filter, $ionicActionSheet, $http){
  $ionicLoading.show();
  $scope.showResults = false;

  Scripture.getHymn($stateParams.hymnId).then(function(res){
    $ionicLoading.hide();
    $scope.scriptures = res;
    $scope.page = res[0].page;
    $scope.optionalField = function(field) {
        if (field) {
            return field + ' - ';
        } else {
            return '';
        }
    }
    $scope.scriptureName = res[0].scripture;
    $scope.showResults = true;
    $window.document.title = 'Page ' + $scope.page + ' - ' + $filter('scripture')($scope.scriptureName);
  });

  $scope.share = function(arrayId) {
    var screenshot;

    // On Desktop
    if (window.process) {
        return true;
    }

    if (arrayId || arrayId === 0) {
        screenshot = new canvasScreenshot({data:[$scope.scriptures[arrayId]]})
    } else {
        screenshot = new canvasScreenshot({data:$scope.scriptures});
    }

    screenshot.then(function(image){
        if(isMobile.any() && window.plugins.socialsharing) {
            window.plugins.socialsharing.share(
                null,
                'sikher',
                image,
                null
            );
        } else {
            window.open(image, '_blank');
        }
    })
  }

  $scope.showActionSheet = function(_id, hymn, gurmukhi, arrayId) {
    var hideSheet = $ionicActionSheet.show({
        buttons: [
            { text: 'Share Hymn' },
            { text: 'Share Line' },
            { text: 'Add Line to Favourites' }
        ],
        cancelText: 'Cancel',
        buttonClicked: function(index) {
            if(index === 0) {
                $scope.share();
            }
            if(index === 1) {
                $scope.share(arrayId);
            }
            if(index === 2) {
                $scope.favourite(_id, hymn, gurmukhi);
            }
            return true;
        }
    });
  }

  if($stateParams.viewAs === 'hymn')
  {
    $scope.nextHymnMobile = function() { if(isMobile.any()) $scope.nextHymn(); }
    $scope.previousHymnMobile = function() { if(isMobile.any()) $scope.previousHymn(); }
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
  var max_hymns = 5911;
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

.controller('PrayersDetailCtrl', function($scope, $stateParams, Data, Prayers, $css, $ionicLoading, URLResolver, $state, $timeout, $ionicSlideBoxDelegate, Slicer, $window) {

    $scope.handlers = {};

    $scope.handlers.onTouchEnd = function(direction, event, index, length, slides) {
      $scope.needMore(direction);
      return;
    };

    $scope.handlers.onPrevEnd = function(index, length, slides){
      $scope.needMore('previous');
      return;
    };

    $scope.handlers.onNextEnd = function(index, length, slides){
      $scope.needMore('next');
      return;
    };

  $ionicLoading.show();
  $scope.showResults = false;

  Prayers.get().then(function(res){
    $scope.prayers = res.data;
    $scope.prayer = $scope.prayers[$stateParams.prayerId];

    Prayers.get($scope.prayer.file).then(function(res){
      $scope.prayer.audioURI = URLResolver.resolve($scope.prayer.audio);
      $scope.prayer.data = res.data;
      Slicer.init({data: res.data, datalimit: 20, buffer: 2, set: 0});
      $scope.prayer.dataSlice = Slicer.getData(Slicer.getCurrentSet());
      $ionicLoading.hide();
      $scope.showResults = true;
      $window.document.title = $scope.prayer.name;
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

    $scope.gotoSlide = function (fullIndex) {
      var index = fullIndex % Slicer.getDataLimit();
      Slicer.update({set:Slicer.getSet(fullIndex)});
      $scope.prayer.dataSlice = Slicer.getData(Slicer.getCurrentSet());
      $ionicSlideBoxDelegate.update();
      $ionicSlideBoxDelegate.slide(index);
    }

    $scope.nextSlide = function(){
      $ionicSlideBoxDelegate.next();
    };

    $scope.previousSlide = function(){
      $ionicSlideBoxDelegate.previous();
    };

    $scope.needMore = function(direction) {
      $ionicSlideBoxDelegate.update();
      if(Slicer.needData($ionicSlideBoxDelegate.currentIndex()))
      {
        if(direction === 'next') {
          Slicer.update({set:Slicer.getCurrentSet()+1});
          $scope.prayer.dataSlice = Slicer.getData(Slicer.getCurrentSet());
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.slide(Slicer.getStartIndex(),0);
          return;
        }

        if(direction === 'previous') {
          Slicer.update({set:Slicer.getCurrentSet()-1});
          $scope.prayer.dataSlice = Slicer.getData(Slicer.getCurrentSet());
          $ionicSlideBoxDelegate.update();
          $ionicSlideBoxDelegate.slide(Slicer.getEndIndex(),0);
          return;
        }
      }
    }

    $scope.showNavigator = false;
    $scope.toggleNavigator = function() { if($scope.showNavigator===false) { $scope.showNavigator = true; } else { $scope.showNavigator = false; } }
  }
})

.controller('SettingsCtrl', function($scope, Settings, Store, RecentSearches, $ionicPopup, $window) {
  var popup_settings_saved = {
       title: 'Settings Saved',
       template: 'Your settings have been saved'
  };

  $scope.search = Settings['search'];
  $scope.viewAs = Settings['viewAs'];
  $scope.font = Settings['font'];

  $scope.updateSettings = function() {
    Settings['search'] = $scope.search;
    Settings['viewAs'] = $scope.viewAs;
    Settings['font'] = $scope.font;

    Store.set('sikher_settings', Settings);

    $ionicPopup.alert(popup_settings_saved);
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

  $scope.exportFavouritesBool = function() {
      if(Store.get('sikher_favourites').length > 0) {
          return false;
      } else {
          return true;
      }
  }

  $scope.importFavouritesBool = function() {
      if(isMobile.any()) {
          return 'hidden';
      } else {
          return false;
      }
  }

  $scope.exportFavourites = function() {
    var fileName = 'favourites.json';
    var data = JSON.stringify(Store.get('sikher_favourites'));
    var uri = 'data:application/json;base64,' + btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));

     if(isMobile.any() && cordova.file) {
        window.resolveLocalFileSystemURL(isMobile.iOS() ? cordova.file.syncedDataDirectory : cordova.file.externalDataDirectory, function(dir) {
            dir.getFile(fileName, {create:true, exclusive: false}, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.write(data);
                    $ionicPopup.alert(popup_settings_saved);
                }, cordovaFileFailHandler);
            });
        });
    } else {
        var elem = document.createElement('a');
        elem.download = fileName;
        elem.className = 'download';
        elem.href = uri;
        elem.click();
        elem = null;
    }
  }

  $scope.importFavourites = function() {
    var fileName = 'cdvfile://localhost/files/favourites.json';

    if(isMobile.any() && cordova.file) {
       window.resolveLocalFileSystemURL(fileName, function(File) {
           File.file(function(file){
               readWithFileReader(file);
           }, cordovaFileFailHandler)
       });
   } else {
       var elem = document.getElementById('favouritesImport');
       var file = elem.files[0];
       if(file) {
           readWithFileReader(file);
       } else {
           $ionicPopup.alert({
               title: 'First select a file to import',
               template: 'You must first select a file to import'
           });
       }
   }

    function readWithFileReader(file) {
        var reader = new FileReader();
        reader.onload = function(evt){
            var confirmPopup = $ionicPopup.confirm({
              title: 'Importing Favourites',
              template: 'You are about to import some favourites, which will replace all your current favourites, are you sure you want to proceed?'
            });
            confirmPopup.then(function(yes) {
                if(yes) {
                    Store.set('sikher_favourites', JSON.parse(evt.target.result));
                    var saved = $ionicPopup.alert(popup_settings_saved);
                    saved.then(function(){
                        $window.location.reload();
                    });
                } else {
                    $ionicPopup.alert({
                         title: 'Favourites have not been changed',
                         template: 'Relax, we did not make any changes to your favourites'
                    });
                }
            });
        };
        reader.readAsText(file);
    }
  }

  function cordovaFileFailHandler(evt) {
    var msg = '';
    switch (evt.code) {
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
      default:
        msg = 'Unknown Error';
        break;
    };
    console.warn(msg);
  }
});