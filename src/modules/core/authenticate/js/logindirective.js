LoadCss("content/css/login.css");

require(
	[
		"app",
		"modules/core/authenticate/js/login-service.js"
	],
	function(app)
	{
		app.directive('gkLogin', ["login-service", "user-service", "api", "$state", function(loginService, userService, api, $state)
		{
			return {
				restrict: "E",
				templateUrl: "modules/core/authenticate/views/login.html",
				link: function(scope)
				{
					scope.Login = function()
					{
						loginService.Login(scope.UserService.User.UserName, scope.UserService.User.Password).success(function(response) {
							userService.User.InitializeLogin(response);
							api.init(userService.User.Token);
							$state.go ('homebasic');
						});
					};
				}
			};
		}]);

		app.directive('gkLoggedIn', ["login-service", "user-service", "$mdSidenav", function(loginService, userService, $mdSidenav)
		{
			return {
				restrict: "E",
				templateUrl: "modules/core/authenticate/views/logged-in.html",
				link: function(scope)
				{
					scope.LoggedInUserToggle = false;

					scope.TriggerMobileMenu = function()
					{
						$mdSidenav('leftNav').toggle();
					};

					scope.Logout = function()
					{
						loginService.LogOut().success(function(response) {
							userService.User.Logout();
						});
					};
				}
			};
		}]);
	}
);