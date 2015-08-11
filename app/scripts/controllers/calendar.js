'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeTrackerApp')
  .controller('CalendarCtrl', function ($scope, $firebaseArray) {
		
    $scope.currentDate = moment().year() + '/' + moment().week();

    var fireRef = new Firebase('https://glaring-fire-2223.firebaseio.com/' + $scope.currentDate);

    $scope.entries = $firebaseArray(fireRef);

    //$scope.on()

    $scope.newEntry = {
      project: 'Apple'
    };

    $scope.days = [];
	
    for(var i = 0; i < 7; i ++) {
      var date = moment().add(i, 'd');//+1 to make Sunday Monday#
      //$scope.entries.forEach(function(item, index) {
      //	console.log(item);
      //})
      $scope.days.push({
        date: new Date(date),
        entries: []
      });
    }
		
    fireRef.on('value', function(data) {
      $scope.days.forEach(function(item) {
        item.entries = [];
      })
      data.forEach(function(childData) {
        var val = childData.val();
        //Get the day of the week
        var day = moment(val.year + '/' + val.month + '/' + val.day, 'YYYY/MM/DD').date();
        $scope.days.forEach(function(item, index) {
          if(moment(item.date).date() === day) {
            $scope.days[index].entries.push(val);
          }
        })
		  });      
    });
	
		var $entryForm = $('.entry-form');	
		$entryForm.remove();
	
		$scope.addEntry = function(date) {
			date = moment(new Date(date));
			$scope.selectedDate = date.format('YYYY/MM/DD');
			$scope.selectedIndex = $('.day-container[data-day=' + date.get('date') + ']').index();
			$('.day-container[data-day=' + date.get('date') + '] .day-items .btn-add').before($entryForm);
		};  
  
    $scope.newEntryAdd = function() {
      $scope.newEntry.year = parseInt($scope.selectedDate.substring(0, 4));
      $scope.newEntry.month = parseInt($scope.selectedDate.substring(6, 7));
      $scope.newEntry.day = parseInt($scope.selectedDate.substring(8, 10));

      $scope.entries.$add($scope.newEntry);
    };
  
});