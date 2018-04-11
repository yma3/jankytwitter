
var app = angular.module('myApp', []);
app.controller('myCtrl',['$scope', function($scope) {
    $scope.data
}]) {
    console.log('WRITING');
    $scope.data = {};
    $scope.submit=function() {
        console.log('Clicked Submit');
        $http({
            url: 'http://localhost:3000/user',
            method: 'POST',
            data: $scope.data
        }).then(function (httpResponse) {
            console.log('response:', httpResponse);
        })
    }
});