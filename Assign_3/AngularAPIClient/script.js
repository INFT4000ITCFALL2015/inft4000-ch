(function () {
    var app = angular.module('myApp', []);

    app.controller('restaurantController', function ($scope, $http) {
        $http.get('http://localhost:3000/api/restaurants')
            .then(function (res) {
                $scope.restaurants = res.data;
            });
    });
})();