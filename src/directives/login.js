LoadCss("content/css/login.css");

require(
	[
		"app",
		"services/login-service.js"
	],
	function(app)
	{
		app.directive('gkLogin', ["login-service", function(loginService)
		{
			return {
				restrict: "E",
				templateUrl: "directives/views/login.html",
				link: function(scope)
				{
					scope.Login = function()
					{
						loginService.Login(scope.UserService.User.UserName, scope.UserService.User.Password);
					};
				}
			};
		}]);

		app.directive('gkLoggedIn', ["login-service", "$mdSidenav", function(loginService, $mdSidenav)
		{
			return {
				restrict: "E",
				templateUrl: "directives/views/logged-in.html",
				link: function(scope)
				{
					scope.LoggedInUserToggle = false;

					scope.TriggerMobileMenu = function()
					{
						$mdSidenav('leftNav').toggle();
					};

					scope.LogOut = function()
					{
						loginService.LogOut();
					};
				}
			};
		}]);
	}
);