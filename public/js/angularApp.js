'use strict';

angular.module('myApp', ['ngRoute', 'myApp.users', 'myApp.products', 'myApp.positions', 'myApp.shelfs', 'myApp.receipts'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({ redirectTo: '/users/list' });
    }]);
