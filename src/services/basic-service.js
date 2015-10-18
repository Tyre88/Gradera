require(
	[
		"app"
	],
	function(app)
	{
		app.service('grading-service', ["$http", "api", function($http, api)
		{
			this.GetTabData = function(clubId)
			{
				return $http.get(String.format("/api/grading/GetGradingTabs/{0}", clubId));
			};

			this.GetAllTechniques = function()
			{
				return $http.get(String.format("/api/grading/GetAllTechniques"));
			}
		}]);
	}
);