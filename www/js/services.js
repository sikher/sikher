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

.factory('Scripture', function($http) {

return {
    getResults : function(query, field, sql) {
        var query = query || 'mmlg';
        var field = field || 'transliteration_search';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" LIKE '"+query+"%' LIMIT 10";

        return this.http(sql);
    },
    getHymn : function(query, field, sql) {
        var query = query || 8;
        var field = field || 'hymn';
        var sql = sql || "SELECT * FROM scriptures WHERE "+field+" = "+query;

        return this.http(sql);
    },
    http : function(sql, url, method, responseType, cache) {
        var sql = sql;
        var url = url || '/db/sikher.db';
        var method = method || 'GET';
        var responseType = responseType || 'arraybuffer';
        var cache = cache || true;

        delete $http.defaults.headers.common['X-Requested-With'];

        function appendTransform(defaults, transform) {
          // We can't guarantee that the default transformation is an array
          defaults = angular.isArray(defaults) ? defaults : [defaults];

          // Append the new transformation to the defaults
          return defaults.concat(transform);
        }

        function applyTransform(result) {
            var data = [];
            var uInt8Array = new Uint8Array(result);
            var db = new SQL.Database(uInt8Array);
            var stmt = db.prepare(sql);
            while(stmt.step())
            {
                data.push(stmt.getAsObject())
            }
            db.close();
            return data;
        }

        var req = $http({
          url: url,
          method: method,
          responseType: responseType,
          transformResponse: appendTransform($http.defaults.transformResponse, function(res) { return applyTransform(res); }),
          cache: cache
        });

        return req;
    }
}

})

.factory('Prayers', function() {
  var data = [{
    id: 0,
    name: 'Jap Ji Sahib',
    description: 'Song of the Soul',
    audio: '/audio/01_Japji_Sahib.mp3',
    data: [
  {
    "id":1,
    "scripture":"sggs",
    "page":1,
    "line":1,
    "hymn":1,
    "gurmukhi":"< siq nwmu krqw purKu inrBau inrvYru Akwl mUriq AjUnI sYBM gur pRswid ]",
    "transliteration":"Ikoankaar Sathnaam Karathaa Purakh Nirabho Niravair Akaal Moorath Ajoonee Saibhan Gurprasaadh ||",
    "translation":"One Universal Creator God, TheName Is Truth  Creative Being Personified No Fear No Hatred Image Of The Undying, Beyond Birth, Self-Existent. By Guru's Grace~",
    "gurmukhi_search":"<snkpnnAmAsgp",
    "transliteration_search":"iskpnnamasgp"
  }]
  }, {
    id: 1,
    name: 'Jaap Sahib',
    description: 'Song of Recitation',
    audio: '/audio/02_Jaap_Sahib.mp3'
  }, {
    id: 2,
    name: 'Tav Prasad Savaiye',
    description: 'Song By Thy Grace',
    audio: '/audio/03_Tav_Prasaad_Svaiye.mp3'
  }, {
    id: 3,
    name: 'Chaupai Sahib',
    description: 'Song of the Poet',
    audio: '/audio/04_Chaupai_Sahib.mp3'
  }, {
    id: 4,
    name: 'Anand Sahib',
    description: 'Song of Bliss',
    audio: '/audio/05_Anand_Sahib.mp3'
  },
  {
    id: 5,
    name: 'Rehraas Sahib',
    description: 'Song of Continued Essence',
    audio: '/audio/06_Rehraas_Sahib.mp3'
  },
  {
    id: 6,
    name: 'Kirtan Sohila',
    description: 'Song of Rest',
    audio: '/audio/07_Kirtan_Sohila.mp3'
  }];

  return data;
})

.factory('Favourites', function() {
  var data = [];

  return data;
});
