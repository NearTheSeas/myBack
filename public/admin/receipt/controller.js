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

            }
        ]);
})(angular);
