(function(angular) {

    var module = angular.module('myApp.users', ['ngRoute']);
    // 配置模块的路由
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/users/list', {
                templateUrl: 'users/listUser.html',
                controller: 'UserCtrl'
            });
    }]);
    // 控制器
    module.controller('UserCtrl', [
        '$scope',
        '$http',
        function($scope, $http) {
            $scope.users = [];
            $http({
                url: '/account/list',
                method: "GET"
            }).success(function(users) {
                $scope.users = users;
            }).error(function() {});
        }
    ]);
})(angular);
