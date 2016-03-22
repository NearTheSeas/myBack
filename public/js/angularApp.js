'use strict';

angular.module('myApp', ['ngRoute', 'myApp.users', 'myApp.products'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .otherwise({ redirectTo: '/users/list' });
    }]);