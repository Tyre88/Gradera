define(
	[
		"app"
	],
	function(app)
	{
		app.controller('home',
			["$scope", function($scope)
			{
				$scope.Title = "Hello from home";
			}])
	}
)