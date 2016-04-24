angular.module('starter.services', [])

.factory('Settings', function(Store) {
    var store = 'sikher_settings';
    var data = Store.get(store);

    var defaults = {
        viewAs : 'hymn',
        font : 'gurbaniakhar',
        search : 'gurmukhi_search'
    }

    if(data.length===0)
    {
      Store.set(store,defaults);
      return Store.get(store);
    }
    else
    {
      return Store.get(store);
    }
})

.factory('Api', function(){
  return {
    urls: {
      getRecords:'http://api2.sikher.com:80/api/v2/sikher/_table/scriptures'
    },
    token: '627bf1d549ffe89818706ec2f3cba4259c690f999eff2990042797fed4f10b7b',
    contentType: 'application/json; charset=utf-8',
    ajax: function(url, method, callback, headers, data) {
        try {
            var req = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0'); // Does XMLHttpRequest exist? If not, it's probably an older version of Internet Explorer
            req.open(method, url, true); // the method is either GET or POST in our case, the url which we want to call to get data from and TRUE to make it an asynchronous request
            if (headers) {
                for(var header in headers){
                  req.setRequestHeader(header, headers[header]); // Set custom headers
                }
            }
            req.onreadystatechange = function () {
                req.readyState > 3 && callback && callback(req.responseText, req); // When the response comes back call the callback function
            };

            if (data) {
                req.send(data) // Send with data
            } else {
                req.send(); // Send without data
            }

        } catch (e) {
            window.console && console.error(e); // If there is an error, show it in the browser's F12 console
        }
    },
    getResults: function(callback, params){
      var url = this.urls['getRecords'];

      if(params){
        url += params;
      }

      var method = 'GET';
      var headers = {
        'Content-type':this.contentType,
        'X-DreamFactory-API-Key':this.token
      };
      this.ajax(url, method, callback, headers);
    }
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

.factory('Scripture', function($http, $q, URLResolver, SikherDB, $window, Api) {

return {
    getResultsByFirstLetters : function(query, field, sql) {
        var query = query || '';
        var field = field || 'gurmukhi_search';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" LIKE '"+query+"%' LIMIT 10";
        var params = '?filter='+field + ' like '+query+'%&limit=10';
        return this.http(sql, params);
    },
    getResultsByWords : function(query, field, sql) {
        var query = query || '';
        var field = field || 'translation';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" LIKE '%"+query+"%' LIMIT 10";
        var params = '?filter='+field + ' like %'+query+'%&limit=10';
        return this.http(sql, params);
    },
    getHymn : function(query, field, sql) {
        var query = query || 1;
        var field = field || 'hymn';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" = "+query;
        var params = '?filter='+field+'='+query;
        return this.http(sql, params);
    },
    getPage : function(query) {
        var query = query || 1;
        var field = field || 'page';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" = "+query;
        var params = '?filter='+field+'='+query;
        return this.http(sql, params);
    },
    http : function(sql, params) {
        var db = String('sikher.db');
        var sql = sql;
        var url = URLResolver.resolve(db);
        var method = 'GET';
        var responseType = 'arraybuffer';
        var cache = true;
        var defer = $q.defer();

        // If mobile let's use the native SQLite access functionality
        if(isMobile.Android() || isMobile.iOS()) {
          if(!SikherDB)
          {
            SikherDB = $window.sqlitePlugin.openDatabase({name:db,createFromLocation: 1});
            console.warn('opening db', SikherDB);
          }

          SikherDB.executeSql(sql,[],function(res) {
            var arr = [];
            for(var i=0;i<res.rows.length;i++){
              arr.push(res.rows.item(i));
            }
            defer.resolve(arr);
          },function (err) {
            defer.resolve(err);
          });
          return defer.promise;
        }

        // If online, but not on desktop, we'll use the Sikher API instead
        if(navigator.onLine && !window.process)
        {
          Api.getResults(function(res) {
            var res = JSON.parse(res);
            if(res.resource)
            {
              defer.resolve(res.resource);
            }
            else
            {
              defer.resolve(res);
            }
          },params);
        }
        else
        {
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

            worker.onerror = function(e) {
              defer.resolve(e.data);
            };
          }
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

  //migrate old structure
  if (data.length > 0 && typeof data[0] ===  'string') {
      for (var i = 0; i < data.length; i++) {
        if (typeof data[i] ===  'string') {
          data[i] = {
            searchText: data[i],
            searchType: ''
          };
        }
      }
      Store.set('sikher_recent', data);
  }

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