angular.module("app", [])
    .controller("studentController", ["$scope", function ($scope) {

        $scope.students = [];
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
                $scope.students.push({id: $scope.id, fName: $scope.fName, lName: $scope.lName});
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
