require(
	[
		"app",
		"directives/basic.js",
		"services/basic-service.js"
	],
	function(app)
	{
		app.controller('gradingadmin', ["$scope", "grading-service", function($scope, gradingService)
		{
			$scope.Tabs = [];
			$scope.TabIndex = 1;

			gradingService.GetTabData(1).success(function(data)
			{
				$scope.Tabs = JSON.parse(data);
			});

			$scope.TestDrag = {
				Name: "TEST"
			};
		}]);
	}
);