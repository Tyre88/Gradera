LoadCss(["content/css/stylesheet.css", "content/css/directives.css", "content/css/jquery-ui.css"]);

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
			return angular.module('graderaklubb', ['ng', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ngMaterial',
				'dndLists', 'webbdudes-image-helper', 'ngFileUpload', 'formly'])
				.controller('index', ["$rootScope", "$scope", "$state", "user-service", "$mdSidenav", "Upload",
					function($rootScope, $scope, $state, userService, $mdSidenav, Upload)
				{
					$scope.UserService = userService;
					$scope.AdminLinks = [];

					$rootScope.UserService = userService;

					$scope.SetActiveNav = function(element)
					{
						$("md-sidenav").find('.active').each(function()
						{
							$(this).removeClass('active');
						});

						$(element.target.parentElement).addClass("active");

						$mdSidenav('leftNav').toggle();
					};

					if(!userService.User.IsLoggedIn)
						$state.go ('login');

					$scope.AdminLinks = [
						{
							Sref: "listusers",
							Text: "Hantera medlemar",
							AccessType: 2,
							AccessTypeRight: 20
						},
						{
							Sref: "listaccessrights",
							Text: "Hantera användargrupper",
							AccessType: 1,
							AccessTypeRight: 20
						},
						{
							Sref: "clubsettings",
							Text: "Klubb inställningar",
							AccessType: 4,
							AccessTypeRight: 20
						},
						{
							Sref: "competitionadminlist",
							Text: "Hantera tävlingar",
							AccessType: 5,
							AccessTypeRight: 20
						},
						{
							Sref: "formsadminlist",
							Text: "Hantera formulär",
							AccessType: 6,
							AccessTypeRight: 20
						}
					];

					$rootScope.HasSomeWriteAccess = function()
					{
						for(var i = 0; i < $scope.UserService.User.AccessRightsRight.length; i++)
						{
							if($scope.UserService.User.AccessRightsRight[i].AccessTypeRight >= 20)
								return true;
						}

						return false;
					};

					$rootScope.HasAccess = function(accessType, accessTypeRight)
					{
						for(var i = 0; i < $scope.UserService.User.AccessRightsRight.length; i++)
						{
							if($scope.UserService.User.AccessRightsRight[i].AccessTypeRight >= accessTypeRight
								&& $scope.UserService.User.AccessRightsRight[i].AccessType == accessType)
								return true;
						}

						return false;
					};

					$rootScope.UploadImage = function(file, successCallback) {
						Upload.upload({
							url: "/api/file/UploadFile",
							data: {file: file}
						}).then(successCallback, function(err) {
							console.error(err);
						}, function(evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
							console.log('progress: ' + progressPercentage + '% ');
						});
					};

					$rootScope.previousState;
					$rootScope.currentState;
					$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
						$rootScope.previousState = from.name;
						$rootScope.currentState = to.name;
					});
				}])
				.controller('logoutController', ["$scope", "user-service", "$state", "$mdDialog", function($scope, userService, $state, $mdDialog) {
					var confirm = $mdDialog.confirm()
						.title('Utloggad')
						.clickOutsideToClose(false)
						.content('Du har blivit utloggad, vänligen logga in igen.')
						.ariaLabel('Utloggad')
						.ok('Ok');
					$mdDialog.show(confirm).then(function() {
						userService.User.Logout();
						$state.go('login');
					});
				}])
				.controller('noaccessController', ["$rootScope", "$state", "$mdDialog", function($rootScope, $state, $mdDialog) {
					var confirm = $mdDialog.confirm()
						.title('Ej tillgång')
						.clickOutsideToClose(false)
						.content('Du har inte rättigheter att utföra det du försökte.')
						.ariaLabel('Ej tillgång')
						.ok('Tillbaka')
						.cancel('Hem');
					$mdDialog.show(confirm).then(function() {
						$state.go($rootScope.previousState);
					}, function() {
						$state.go('home');
					});
				}])
				.factory('authHttpResponseInterceptor', ['$q', function($q){
					return {
						request: function(request)
						{
							return request;
						},
						response: function(response) {
							return response || $q.when(response);
						},
						responseError: function(rejection) {
							console.log(String.format("Response Error {0}", rejection.status), rejection);

							if(rejection.status == 401)
							{
								console.error('Unauthorized....');
								location.href = "#/logout";
							}
							else if(rejection.status == 403)
							{
								console.error('Forbidden....');
								location.href = "#/noaccess";
							}

							return $q.reject(rejection);
						}
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
						$httpProvider.interceptors.push('authHttpResponseInterceptor');

						$mdThemingProvider.theme('default')
							.primaryPalette('brown')
							.accentPalette('orange');
					}
				])
				.run(["$rootScope", "api", "user-service", "formlyConfig", function($rootScope, api, userService, formlyConfig) {

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

					formlyConfig.setType({
						name: 'select',
						//template: "<pre>{{this.options.templateOptions.options | json}}</pre>"
						template: '<md-input-container><label>{{model[options.templateOptions.label]}}</label><md-select ng-model="model[options.key]"><md-option ng-repeat="option in this.options.templateOptions.options" value="{{option.name}}">{{option.name}}</md-option></md-select></md-input-container>'
					});

					formlyConfig.setType({
						name: 'input',
						template: '<input ng-model="model[options.key]">'
					});

					formlyConfig.setType({
						name: 'checkbox',
						template: '<md-checkbox ng-model="model[options.key]">{{to.label}}</md-checkbox>'
					});

					formlyConfig.setWrapper({
						name: 'mdLabel',
						types: ['input'],
						template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
					});

					formlyConfig.setWrapper({
						name: 'mdInputContainer',
						types: ['input'],
						template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
					});
				}]);
		}
    });