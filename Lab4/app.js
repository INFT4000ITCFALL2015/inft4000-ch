(function() {
    angular.module("app", [])
        .controller("studentController", ["$scope", function ($scope) {

            $scope.students = [];

            $scope.addNewStudent = function() {
                $scope.students.push({id:$scope.id, fName:$scope.fName, lName:$scope.lName})
                $scope.id = '';
                $scope.fName = '';
                $scope.lName = '';
            };
        }])

        .directive('studentReport', function() {
            return {
                template: 'Students: {{students}}'
            };
        })
});

//angular.module('todoApp',[])
//    .controller('todoController',function($scope){
//
//        $scope.todos = [];
//
//        $scope.addNewTodo = function(){
//            $scope.todos.push({text:$scope.newItem,done:false});
//            $scope.newItem = "";
//        }; // end of add new tudo function
//
//        $scope.archiveTodos = function(){
//
//            var tempArray = $scope.todos;
//            $scope.todos = [];
//
//            angular.forEach(tempArray,function(todo){
//                if(!todo.done)
//                {
//                    $scope.todos.push(todo);
//                }
//            });
//        }; // end of archive function
//
//    }) // end of controller code

//    .directive('myTodoReport', function() {
//        return {
//            template: 'Todo Count: {{todos.length}}'
//        };
//    }) // end of directive code
//
//; // end of the module
