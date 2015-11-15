(function () {
    angular.module("app", ["ui.grid", "ui.grid.edit"])
        .controller("studentController", ["$scope", "$http", function ($scope, $http) {

            $scope.students = [];
            $http.get('js/students.json').success(function(data) {
                $scope.students = data;
            });
            $scope.errorText = '';
            $scope.displayJSON = false;
            $scope.textJSON = '';

            $scope.addNewStudent = function () {
                var isValid = true;
                if ($scope.students.length > 0) {
                    angular.forEach($scope.students, function (student) {
                        if (student.id === $scope.id) {
                            isValid = false;
                        }
                    });
                }
                if (isValid) {
                    $scope.students.push({id: $scope.id, firstName: $scope.fName, lastName: $scope.lName});
                    $scope.id = '';
                    $scope.fName = '';
                    $scope.lName = '';
                } else {
                    $scope.errorText = "A student with that ID already exists";
                    $scope.id = '';
                    $scope.fName = '';
                    $scope.lName = '';
                }
            };

            $scope.clearError = function () {
                $scope.errorText = "";
            };

            $scope.showJSON = function () {
                $scope.textJSON = JSON.stringify($scope.students);
                $scope.displayJSON = true;
            };

            $scope.hideTooltip = function () {
                $scope.displayJSON = false;
            };
        }]);
})();