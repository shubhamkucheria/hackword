angular.module('shubhamTodoController', [])
	.controller('mainController', ['$scope','$http','Todo',function($scope, $http, Todo) {
		$scope.formData = {};
		$scope.result = 'yo yo';

		$scope.clear = function() {
			$scope.formData = {};
			$scope.result = '';
		};

		$scope.createTodo = function() {
			if ($scope.formData.text != undefined) {
				Todo.create($scope.formData)
					.success(function(data) {
						$scope.result = data.result.toString();
					});
			}
		};

	}]);
