LoadCss(["content/css/stylesheet.css", "content/css/directives.css", "content/css/fontello.css", "content/css/jquery-ui.css"]);

define(
    [
        "ui-router",
        "ui-bootstrap",
		"services/user-service.js"
    ],
    function()
    {
		try
		{
			return angular.module("graderaklubb");
		}
		catch(err)
		{
			return angular.module('graderaklubb', ['ng', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ngMaterial', 'dndLists'])
				.controller('index', ["$scope", "$state", "user-service", "$mdSidenav", function($scope, $state, userService, $mdSidenav)
				{
					$scope.UserService = userService;
					$scope.AdminLinks = [];

					$scope.SetActiveNav = function(element)
					{
						$("md-sidenav").find('.active').each(function()
						{
							$(this).removeClass('active');
						});

						$(element.target.parentElement).addClass("active");

						$mdSidenav('leftNav').toggle();
					};

					if(userService.User.IsLoggedIn)
						$state.go ('homebasic');
					else
						$state.go("home");

					if($scope.UserService.User.AccessLevel == 1)
					{
						$scope.AdminLinks = [
							{
								Sref: "settingsadmin",
								Text: "Inställningar"
							},
							{
								Sref: "gradingadmin",
								Text: "Graderingsbestämmelser"
							},
							{
								Sref: "competitionsadmin",
								Text: "Tävlingar"
							},
							{
								Sref: "",
								Text: "Hantera medlemar"
							}
						];
					}
				}])
				.factory('api', function($http) {
					var config = { headers: {
						'AuthenticateToken': "",
						'Accept': "application/json, text/plain, */*",
						'Content-Type': "application/json;charset=utf8;"
					}};

					function init(token)
					{
						config.headers.AuthenticateToken = token || "Not authorized";

						$http.defaults.headers.common.AuthenticateToken = config.headers.AuthenticateToken;
						$http.defaults.headers.common.Accept = config.headers.Accept;
						$http.defaults.headers.common["Content-Type"] = config.headers['Content-Type'];
					}

					return {
						init: init,
						config: config
					};
				})
				.config([
					"$compileProvider",
					"$httpProvider",
					"$mdThemingProvider",
					function($compileProvider, $httpProvider, $mdThemingProvider)
					{
						$compileProvider.debugInfoEnabled(false);
						$httpProvider.useApplyAsync(true);
						$httpProvider.defaults.withCredentials = true;

						$mdThemingProvider.theme('default')
							.primaryPalette('brown')
							.accentPalette('orange');
					}
				])
				.run(function(api) {
					api.init("efaafef0-398f-470d-8770-263781a0e762");
				});
		}
    });