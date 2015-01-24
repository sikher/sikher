describe('Services', function() {
  beforeEach(module('starter.services'));

  var Data;

  beforeEach(inject(function(_Data_){
    Data = _Data_;
  }));

  describe('Data service for TestController', function() {
    var $scope, $stateParams, data, controller;

    beforeEach(function() {
      $scope = {};
      $stateParams = 6;
      data = [{ id: 1, hymn: 6, page: 1 }, { id: 2, hymn: 6, page: 1 }, { id: 3, hymn: 6, page: 1 }, { id: 4, hymn: 7, page: 2 }, { id: 5, hymn: 8, page: 2 }];
      controller = angular.module('TestModule', []).controller('TestController', { $scope: $scope, $stateParams : $stateParams, Data : Data, data : data });
    });

    it('returns hymn number 6', function() {
      $scope.scriptures = Data.all(data);
      expect($scope.scriptures.length).toEqual(5);
    });

    it('return one line by id', function(){
      $stateParams = 4;
      $scope.scriptures = Data.get(data, $stateParams);
      expect($scope.scriptures.length).toEqual(1);
    });

    it('returns three hymns', function(){
      $scope.scriptures = Data.filter(data, $stateParams, 'hymn');
      expect($scope.scriptures.length).toEqual(3);
    });

    it('return a hymn by id', function(){
      $stateParams = 2;
      $scope.scriptures = Data.filter(data, $stateParams, 'id');
      expect($scope.scriptures.length).toEqual(1);
      expect($scope.scriptures[0]).toEqual({ id: 2, hymn: 6, page: 1 });
    });

    it('add a hymn by id', function(){
      $stateParams = 3;
      $scope.scriptures = Data.all(data);
      expect($scope.scriptures.length).toEqual(5);

      Data.add(data, data, $stateParams);
      $scope.scriptures = Data.all(data);
      expect($scope.scriptures.length).toEqual(6);
    });
  });
});