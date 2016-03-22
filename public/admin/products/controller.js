(function(angular) {

    var module = angular.module('myApp.products', ['ngRoute']);
    // 配置模块的路由
    module
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/products/list', {
                    templateUrl: 'products/listProducts.html',
                    controller: 'ProductList'
                }).when('/products/detail/:number', {
                    templateUrl: 'products/productDetail.html',
                    controller: 'ProductDetail'
                }).when('/products/add', {
                    templateUrl: 'products/addProduct.html',
                    controller: 'ProductAdd'
                });
        }])
        .controller('ProductAdd', [
            '$scope',
            '$http',
            function($scope, $http) {
                $scope.product = {};
                // $http({
                //     url: '/product/add/' + number,
                //     method: "POST"
                // }).success(function(product) {
                //     $scope.product = product;
                // }).error(function() {});
            }
        ])
        // 产品详情
        .controller('ProductDetail', [
            '$scope',
            '$http',
            '$routeParams',
            function($scope, $http, $routeParams) {
                var number = $routeParams.number;
                $scope.product = null;
                $http({
                    url: '/product/detail/' + number,
                    method: "GET"
                }).success(function(product) {
                    $scope.product = product;
                }).error(function() {});
            }
        ])
        // 产品列表
        .controller('ProductList', [
            '$scope',
            '$http',
            function($scope, $http) {
                $scope.products = [];
                $http({
                    url: '/product/list',
                    method: "GET"
                }).success(function(products) {
                    $scope.products = products;
                }).error(function() {});
            }
        ]);
})(angular);