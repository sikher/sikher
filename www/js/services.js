angular.module('starter.services', [])

.factory('Settings', function() {

    var data = {
        viewAs : 'page'
    }

    return {
        all: function(){ return data; },
        get: function(setting){ return data[setting]; },
        set: function(setting, value){ data[setting] = value; }
    }
})

.factory('Data', function() {

  return {
        all: function(data) {
          return data;
        },
        add: function(dataFrom, dataTo, dataId) {
          var obj = this.filter(dataFrom, dataId, 'id');
          dataTo.push(obj[0]);
        },
        remove: function(data, dataId) {
          data.splice(data.indexOf(dataId), 1);
        },
        get: function(data, dataId) {
          return [data[dataId]];
        },
        filter: function(data, dataId, field) {
          var output = [];
          for (var i = 0; i < data.length; i++) {
            if (parseInt(data[i][field]) === parseInt(dataId)) {
              output.push(data[i]);
            }
          }
          return output;
        },
    }
})

.factory('Scripture', function($http, $q, URLResolver, SikherDB) {

return {
    getResults : function(query, field, sql) {
        var query = query || '';
        var field = field || 'transliteration_search';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" LIKE '"+query+"%' LIMIT 10";

        return this.http(sql);
    },
    getHymn : function(query, field, sql) {
        var query = query || 1;
        var field = field || 'hymn';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" = "+query;

        return this.http(sql);
    },
    http : function(sql) {
        var sql = sql;
        var url = URLResolver.resolve('db/sikher.db');
        var method = 'GET';
        var responseType = 'arraybuffer';
        var cache = true;
        var defer = $q.defer();

        if(SikherDB === null)
        {
          delete $http.defaults.headers.common['X-Requested-With'];

          $http({
            url: url,
            method: method,
            responseType: responseType,
            cache: cache
          })
          .then(function(result){
            SikherDB = result.data;
            callSQLWorker(SikherDB);
          });
        }
        else
        {
          callSQLWorker(SikherDB);
        }


        function callSQLWorker(db)
        {
          var worker = new Worker("js/worker.js"); // You can find worker.sql.js in this repo

          worker.postMessage({
              arraybuffer: db,
              sql: sql
          });

          worker.onmessage = function(e) {
              defer.resolve(e.data);
              worker.terminate();
          };

          worker.onerror = function(e) {defer.resolve(e.data);};
        }

        return defer.promise;
    }
}

})

.factory('Prayers', function($http, URLResolver) {
  return {
    get : function(url){
        var url = url || 'db/prayers.json';
        var method = 'GET';
        var cache = true;

        var req = $http({
          url: URLResolver.resolve(url),
          method: method,
          cache: cache
        });

        return req;
    }
  };
})

.factory('Favourites', function(Store) {
  var data = Store.get('sikher_favourites');

  return data;
})

.factory('RecentSearches', function(Store) {
  var data = Store.get('sikher_recent');

  return data;
})

.factory('Store', function(){
  
  return {
    get: function (STORAGE_ID)
    {
        var STORAGE_ID = STORAGE_ID || 'sikher';
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },
    set: function (STORAGE_ID, values)
    {
        var STORAGE_ID = STORAGE_ID || 'sikher';
        localStorage.setItem(STORAGE_ID, JSON.stringify(values));
    }
  };
})

.factory('URLResolver', function(){

  return {
    resolve: function(url) {
      if(isMobile.Android()) { return 'file:///android_asset/www/' + url }
      else { return url }
    }
  }
})

.factory('Focus', function($timeout) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  });