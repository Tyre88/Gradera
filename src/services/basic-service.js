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
				return $http.get(String.format("http://gradera-klubb.local/api/basic/GetGradingTabs/{0}", clubId));
			};

			this.GetAllTechniques = function()
			{
				return $http.get(String.format("http://gradera-klubb.local/api/basic/GetAllTechniques"));
			}
		}]);
	}
);