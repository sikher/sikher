angular.module('starter.services.slicer', [])

.factory('Slicer', function() {
  var data;
  var set = 0;
  var datalimit;
  var buffer;

  function init(config) {
    if (config.data) {
      data = config.data;
    }

    if (config.set) {
      set = config.set;
    }

    if (config.datalimit) {
      datalimit = config.datalimit;
    }

    if (config.buffer) {
      buffer = config.buffer;
    }
  }

  function startSet(set) {
    return set * (datalimit - (buffer * 2));
  }

  function endSet(set) {
    return set * (datalimit - (buffer * 2)) + datalimit;
  }

  function getData(set) {
    return data.slice(startSet(set), endSet(set));
  }

  function getCurrentSet() {
    return set;
  }

  function getSets() {
    return Math.floor(data.length / (datalimit - (buffer * 2)));
  }

  function getStartIndex() {
    return buffer;
  }

  function getEndIndex() {
    return datalimit - buffer;
  }

  function needData(index) {
    var first = false;
    var last = false;

    if (set === 0) {
      first = true;
    }

    if (set === getSets() - 1) {
      last = true;
    }

    if (index <= (0 + buffer - 1)) {
      if (first) return false;
      return true;
    }

    if (index >= (datalimit - buffer)) {
      if (last) return false;
      return true;
    }

    return false;
  }

  return {
    startSet: startSet,
    endSet: endSet,
    getData: getData,
    getCurrentSet: getCurrentSet,
    getSets: getSets,
    getStartIndex: getStartIndex,
    getEndIndex: getEndIndex,
    needData: needData,
    init: init,
    update: init,
    set : set,
    data : data,
    datalimit : datalimit,
    buffer : buffer
  };
});