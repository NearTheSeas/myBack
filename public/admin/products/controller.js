(function(angular) {

    var module = angular.module('myApp.products', ['ngRoute']);
    // 配置模块的路由
    module
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/products/list/:page', {
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
        // 增加产品
        .controller('ProductAdd', [
            '$scope',
            '$http',
            function($scope, $http) {
                $scope.product = {};
                // $http({
                //     url: '/product/add',
                //     method: "POST",
                //     data: $scope.product //传递的数据
                // }).success(function(product) {

                // }).error(function() {})
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
            '$route',
            '$routeParams',
            function($scope, $http, $route, $routeParams) {
                var count = 3;
                var page = $routeParams.page ? parseInt($routeParams.page) : 1; //从访问地址中获取当前的页码
                var start = (page - 1) * count; //当前页的第一条记录索引号
                $scope.totalCount = 0; //总条数
                $scope.totalPage = 0; //总页数
                $scope.currentPage = page;
                var productList = [];
                $scope.products = [];
                if (!$scope.products.length) {
                    $http({
                        url: '/product/list',
                        method: "GET"
                    }).success(function(products) {
                        productList = products;
                        $scope.totalCount = productList.length;
                        $scope.totalPage = Math.ceil(productList.length / count);
                        $scope.products = productList.slice(start, start + count);
                    }).error(function() {});
                }

                // $scope.$apply();
                $scope.go = function(page) {
                    if (page >= 1 && page <= $scope.totalPage)
                        $route.updateParams({ page: page });
                }
            }
        ]);
})(angular);
