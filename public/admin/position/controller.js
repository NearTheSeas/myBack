(function(angular) {

    var module = angular.module('myApp.positions', ['ngRoute']);
    // 配置模块的路由
    module
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/position/list', {
                    templateUrl: 'position/listPositions.html',
                    controller: 'PositionList'
                }).when('/position/detail/:number', {
                    templateUrl: 'position/productDetail.html',
                    controller: 'PositionDetail'
                });
        }])
        // 仓位详情
        .controller('PositionDetail', [
            '$scope',
            '$http',
            '$routeParams',
            function($scope, $http, $routeParams) {
                var number = $routeParams.number;
                $scope.position = null;
                $http({
                    url: '/position/detail/' + number,
                    method: "GET"
                }).success(function(position) {
                    $scope.position = position;
                }).error(function() {});
            }
        ])
        // 仓位列表
        .controller('PositionList', [
            '$scope',
            '$http',
            function($scope, $http) {
                $scope.positions = [];
                $http({
                    url: '/position/list',
                    method: "GET"
                }).success(function(positions) {
                    $scope.positions = positions;
                }).error(function(e) {
                    console.log(e);
                });
            }
        ]);
})(angular);
