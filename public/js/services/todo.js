angular.module('shubhamTodoService', [])

	// simple service
	// each function returns a promise object
	.factory('Todo', ['$http',function($http) {
		return {
			sendToGc: function(file) {
				var key = "AIzaSyBxFRHU5etlSSUGaSNm62Agv9Hn0gA_AR4";
				return $http.post('https://vision.googleapis.com/v1/images:annotate?key='+key, {
					"requests": [
					  {
						"image": {
						  "source": {
							"imageUri": "https://static.toiimg.com/thumb/msid-54236593,width-220,resizemode-4/HP-ProBook-6470B-Laptop.jpg"
						  }
						},
						"features": [
							{"type":"TYPE_UNSPECIFIED","maxResults":50},
							{"type":"LOGO_DETECTION", "maxResults":50},
							{"type":"LABEL_DETECTION", "maxResults":50},
							{"type":"DOCUMENT_TEXT_DETECTION", "maxResults":50},
							{"type":"IMAGE_PROPERTIES", "maxResults":50}

						]
					  }
					]
				  });
			},
			get : function() {
				return $http.get('/api/todo');
			},
			create : function(todoData) {
				return $http.post('/api/todo', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todo/' + id);
			},
			update : function(todoData) {
				return $http.post('/api/updateTodo', todoData);
			},
			deleteList: function() {
				return $http.post('/api/deletetodolist');
			}
		}
	}]);
