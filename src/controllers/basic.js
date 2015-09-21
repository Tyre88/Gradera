require(
	[
		"app",
		"directives/basic.js",
		"services/basic-service.js"
	],
	function(app)
	{
		app.controller('homebasic', ["$scope", function($scope)
		{

		}]);

		app.controller('gradingbasic', ["$scope", "grading-service", function($scope, gradingService)
		{
			$scope.Tabs = [];
			$scope.TabIndex = 1;

			gradingService.GetTabData(1).success(function(data)
			{
				$scope.Tabs = JSON.parse(data);
			});
		}])
	}
);