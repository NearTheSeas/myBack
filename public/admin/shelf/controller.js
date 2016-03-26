(function(angular) {

    var module = angular.module('myApp.shelfs', ['ngRoute']);
    // 配置模块的路由
    module
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/shelf/list', {
                    templateUrl: 'shelf/listShelfs.html',
                    controller: 'shelfList'
                }).when('/shelf/detail/:number', {
                    templateUrl: 'shelf/shelfDetail.html',
                    controller: 'shelfDetail'
                });
        }])
        // 仓位详情
        .controller('shelfDetail', [
            '$scope',
            '$http',
            '$routeParams',
            function($scope, $http, $routeParams) {
                var number = $routeParams.number;
                $scope.shelf = null;
                $http({
                    url: '/shelf/detail/' + number,
                    method: "GET"
                }).success(function(shelf) {
                    $scope.shelf = shelf;
                }).error(function() {});
            }
        ])
        // 仓位列表
        .controller('shelfList', [
            '$scope',
            '$http',
            function($scope, $http) {
                $scope.shelfs = [];
                $http({
                    url: '/shelf/list',
                    method: "GET"
                }).success(function(shelfs) {
                    $scope.shelfs = shelfs;
                }).error(function(e) {
                    console.log(e);
                });
            }
        ]);
})(angular);
