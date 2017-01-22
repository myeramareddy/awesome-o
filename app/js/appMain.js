'use strict';

var appMain = angular.module("appMain", ['ngRoute']);

appMain.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'app/pages/home.html',
			controller: 'homeController',
		})
		.when('/settings', {
			templateUrl: 'app/pages/settings.html',
			controller: 'homeController'
		})
		.otherwise({
			redirectTo: '/home'
		});
});
