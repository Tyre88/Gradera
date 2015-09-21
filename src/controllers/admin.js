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
			$scope.Techniques = [];

			gradingService.GetTabData(1).success(function(data)
			{
				$scope.Tabs = JSON.parse(data);
			});

			gradingService.GetAllTechniques().success(function(data)
			{
				$scope.Techniques = data;
			});
		}]);
	}
);