LoadCss(["content/css/stylesheet.css", "content/css/directives.css", "content/css/fontello.css", "content/css/jquery-ui.css"]);

define(
    [
        "ui-router",
        "ui-bootstrap",
		"modules/core/users/js/user-service.js"
    ],
    function()
    {
		try
		{
			return angular.module("graderaklubb");
		}
		catch(err)
		{
			return angular.module('graderaklubb', ['ng', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ngMaterial', 'dndLists', 'webbdudes-image-helper'])
				.controller('index', ["$rootScope", "$scope", "$state", "user-service", "$mdSidenav",
					function($rootScope, $scope, $state, userService, $mdSidenav)
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
							Sref: "handleusers",
							Text: "Hantera medlemar"
						}
					];

					$rootScope.HasSomeWriteAccess = function(accessRights)
					{
						for(var i = 0; i < accessRights.length; i++)
						{
							if(accessRights[i].AccessTypeRight >= 20)
								return true;
						}

						return false;
					};

					$rootScope.HasAccess = function(accessRights, accessType, accessTypeRight)
					{
						for(var i = 0; i < accessRights.length; i++)
						{
							if(accessRights[i].AccessTypeRight >= accessTypeRight && accessRights[i].AccessType == accessType)
								return true;
						}

						return false;
					};
				}])
				.factory('api', function($http) {
					var config = { headers: {
						'AuthenticateToken': "",
						'Accept': "application/json, text/plain, */*",
						'Content-Type': "application/json;charset=utf8;"
					}};

					function init(token)
					{
						config.headers.AuthenticateToken = token || "";

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
				.run(["api", "user-service", function(api, userService) {

					if(typeof(Storage) !== "undefined") {
						var user = window.sessionStorage.getItem('gk-user');
						if(user != undefined) {
							userService.User.Initialize(JSON.parse(user));
							api.init(userService.User.Token);
						}
						else
							api.init("");
					} else {
						api.init("");
					}
				}]);
		}
    });