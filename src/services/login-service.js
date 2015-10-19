require(
	[
		"app"
	],
	function(app)
	{
		app.service('login-service', function($http)
		{
			this.Login = function(userName, password)
			{
				//Had to make it as a querystring to make it work...
				return $http.post('/api/Authenticate/Login?userName=' + userName + "&password=" + password);
			};

			this.LogOut = function()
			{
				return $http.post('/api/Authenticate/Logout');
			};
		})
	}
);