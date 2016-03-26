(function(angular) {

    var module = angular.module('myApp.receipts', ['ngRoute']);
    // 配置模块的路由
    module
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/receipt/list/:page', {
                    templateUrl: 'receipt/listreceipts.html',
                    controller: 'ReceiptList'
                }).when('/receipt/detail/:number', {
                    templateUrl: 'receipt/receiptDetail.html',
                    controller: 'ReceiptDetail'
                });
        }])
        //
        .controller('ReceiptDetail', [
            '$scope',
            '$http',
            '$routeParams',
            function($scope, $http, $routeParams) {
                var number = $routeParams.number;
                $scope.receipt = null;
                $http({
                    url: '/receipt/detail/' + number,
                    method: "GET"
                }).success(function(receipt) {
                    $scope.receipt = receipt;
                }).error(function() {});
            }
        ])
        //
        .controller('ReceiptList', [
            '$scope',
            '$http',
            '$route',
            '$routeParams',
            function($scope, $http, $route, $routeParams) {
                var count = 3;
                var page = $routeParams.page ? parseInt($routeParams.page) : 1;
                var start = (page - 1) * count;
                $scope.totalCount = 0;
                $scope.totalPage = 0;
                $scope.currentPage = page;
                var receiptList = [];
                $scope.receipts = [];
                if (!$scope.receipts.length) {
                    $http({
                        url: '/receipt/list',
                        method: "GET"
                    }).success(function(receipts) {
                        receiptList = receipts;
                        $scope.totalCount = receiptList.length;
                        $scope.totalPage = Math.ceil(receiptList.length / count);
                        $scope.receipts = receiptList.slice(start, start + count);
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
