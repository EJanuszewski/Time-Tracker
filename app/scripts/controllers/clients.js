'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:ClientsCtrl
 * @description
 * # ClientsCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeTrackerApp')
  .controller('ClientsCtrl', function ($scope, Ref, $firebaseArray) {
	
		$scope.clients = $firebaseArray(Ref.child('clients'));	
		
		$scope.addClient = function() {
			$scope.clients.$add($scope.newClient);
		};
	
  });
