'use strict';

/* Controllers */
var contactListControllers = angular.module('contactListControllers', []);

contactListControllers.controller('contactListCtrl',  ['$scope', '$http',
function($scope ,$http) { 
    $http.get('contacts/contacts.json').success(function(data) {
		$scope.contacts=data;
	});
	$scope.orderProp='first';
}]);


contactListControllers.controller('contactDetailCtrl',  ['$scope', '$routeParams', '$http',
function($scope, $routeParams ,$http) {
	$scope.contactId = $routeParams.contactId;
	$http.get('contacts/' + $routeParams.contactId + '.json').success(function(data) {
		$scope.contact=data;
	});
}]);
