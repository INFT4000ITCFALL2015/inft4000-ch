(function () {

    var app = angular.module('myApp', ['ngResource', 'base64', 'angularUtils.directives.dirPagination']);

    app.factory("Restaurant", function ($resource) {
        return $resource("http://localhost:3000/api/restaurants/:_id", null, {
            'update': {method: 'PUT'}
        });
    });

    app.controller('restaurantController', function ($scope, $http, Restaurant) {

        $scope.displayReport = false;

        Restaurant.query(function (data) {
            $scope.restaurants = data;
        });

        $scope.refreshTable = function () {
            Restaurant.query(function (data) {
                $scope.restaurants = data;
            });
        };

        $scope.showRestaurant = function (_ID) {
            Restaurant.get({_id: _ID}, function (data) {
                $scope.selectedRestaurant = data;
            });
            $scope.displayReport = true;
        };

        $scope.addRestaurant = function () {
            var data = {
                borough: $scope.newBorough,
                cuisine: $scope.newCuisine,
                name: $scope.newName,
                restaurant_id: $scope.newRestaurantID,
                date: $scope.newDate,
                grade: $scope.newGrade,
                score: $scope.newScore,
                building: $scope.newBuilding,
                street: $scope.newStreet,
                zipcode: $scope.newZipcode
            };
            $scope.message = Restaurant.save(data);
            $scope.refreshTable();
        };

        $scope.deleteRestaurant = function (_ID) {
            var answer = confirm("Press 'OK' to delete, or 'Cancel' to abort!");
            if (answer) {
                $scope.message = Restaurant.delete({_id: _ID});
            }
            $scope.refreshTable();
        };

        $scope.updateRestaurant = function (restaurantId) {
            var upBorough = document.getElementById('updateRestaurantBorough' + restaurantId).innerHTML;
            var upCuisine = document.getElementById('updateRestaurantCuisine' + restaurantId).innerHTML;
            var upName = document.getElementById('updateRestaurantName' + restaurantId).innerHTML;
            var upRestaurant_id = document.getElementById('updateRestaurant_id' + restaurantId).innerHTML;
            var restaurant = Restaurant.query({restaurant_id: restaurantId}, function (data) {
                var data = {
                    borough: upBorough,
                    cuisine: upCuisine,
                    name: upName,
                    restaurant_id: upRestaurant_id
                };
                $scope.message = Restaurant.update({_id: restaurantId}, data);
            });
            $scope.refreshTable();
        };

        $scope.hideReport = function () {
            $scope.displayReport = false;
        };

        $scope.searchDB = function (searchText) {
            Restaurant.query({
                borough: searchText,
                cuisine: searchText,
                name: searchText,
                restaurant: searchText
            }, function (data) {
                $scope.restaurants = data;
            });
        };
    });

    app.controller('pageController', function ($scope, Restaurant) {
        $scope.totalItems = 64;
        $scope.currentPage = 1;

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;

        $scope.nextPage = function () {
            if ($scope.currentPage < 0) {
                $scope.currentPage += 1;
            }
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage -= 1;
            }
        };
    });

})();


