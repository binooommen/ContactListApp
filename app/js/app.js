/* App Module */

var contactListApp = angular.module('contactListApp', [
  'ngRoute',
  'contactListControllers'
]);

contactListApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/contacts', {
        templateUrl: 'partials/contact-list.html',
        controller: 'contactListCtrl'
      }).
      when('/contacts/:contactId', {
        templateUrl: 'partials/contact-detail.html',
        controller: 'contactDetailCtrl'
      }).
      otherwise({
        redirectTo: '/contacts'
      });
  }]);