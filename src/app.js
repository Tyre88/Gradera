LoadCss(["content/css/stylesheet.css", "content/css/directives.css", "content/css/modules.css", "content/css/dependencies.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"]);
(function(angular) {
    angular.module('graderaklubb', ['ng', 'ngRoute', 'ngAnimate', 'ui.router', 'ngMaterial', "ngMessages",
        'webbdudes-image-helper', 'ngFileUpload', 'formly', 'angular-loading-bar', 'dndLists', 'ngSanitize', 'btford.markdown',
        'google.places', 'data-table']);
    angular.module('graderaklubb').controller('index', ["$rootScope", "$scope", "$state", "user-service", "$mdSidenav", "Upload", "objectChange", "$mdToast",
            function($rootScope, $scope, $state, userService, $mdSidenav, Upload, objectChange, $mdToast)
            {
                $scope.UserService = userService;

                $rootScope.UserService = userService;
                $rootScope.TableOptions = {
                    scrollbarV: false,
                    columnMode: 'force'
                };

                $scope.SetActiveNav = function(element)
                {
                    $("md-sidenav").find('.active').each(function()
                    {
                        $(this).removeClass('active');
                    });

                    $(element.target.parentElement).addClass("active");

                    $mdSidenav('leftNav').toggle();
                };

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

                $rootScope.setObjectValues = function(assemblyhash, objecthash, getdatetime, forcesave) {
                    objectChange.setValues(assemblyhash, objecthash, getdatetime, forcesave);
                };

                $rootScope.ShowConflictToast = function() {
                    $mdToast.show($mdToast.simple().textContent('The object has been changed by someone else, force save or reload the page...'));
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
                .title('Du har blivit utloggad, vänligen logga in igen.')
                .clickOutsideToClose(false)
                .ariaLabel('Utloggad')
                .ok('Ok');
            $mdDialog.show(confirm).then(function() {
                var clubName = angular.copy(userService.User.Club.ShortName);
                userService.User.Logout();
                $state.go('clublogin', {clubShortName: clubName});
            });
        }])
        .controller('noaccessController', ["$rootScope", "$state", "$mdDialog", function($rootScope, $state, $mdDialog) {
            var confirm = $mdDialog.confirm()
                .title('Du har inte rättigheter att utföra det du försökte.')
                .clickOutsideToClose(false)
                .ariaLabel('Ej tillgång')
                .ok('Tillbaka')
                .cancel('Hem');
            $mdDialog.show(confirm).then(function() {
                $state.go($rootScope.previousState);
            }, function() {
                $state.go('home');
            });
        }])
        .factory('objectChange', ["$http", function($http) {
            function setValues(assemblyhash, objecthash, getdatetime, forcesave)
            {
                $http.defaults.headers.common["assemblyhash"] = assemblyhash;
                $http.defaults.headers.common["objecthash"] = objecthash;
                $http.defaults.headers.common["getdatetime"] = getdatetime;

                if(forcesave !== undefined)
                    $http.defaults.headers.common["forcesave"] = forcesave;
            }

            return {
                setValues: setValues
            };
        }])
        .factory('authHttpResponseInterceptor', ['$q', '$rootScope', function($q, $rootScope){
            return {
                request: function(request)
                {
                    return request;
                },
                response: function(response) {

                    if(response.config.method == "GET" && response.headers().assemblyhash !== undefined
                        && response.headers().objecthash !== undefined && response.headers().getdatetime !== undefined) {
                        $rootScope.setObjectValues(response.headers().assemblyhash, response.headers().objecthash, response.headers().getdatetime)
                    }

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
                    else if(rejection.status == 409) {
                        $rootScope.ShowConflictToast();
                    }

                    return $q.reject(rejection);
                }
            }
        }])
        .factory('api', ["$http", function($http) {
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
        }])
        .config([
            "$compileProvider",
            "$httpProvider",
            "$mdThemingProvider",
            "cfpLoadingBarProvider",
            function($compileProvider, $httpProvider, $mdThemingProvider, cfpLoadingBarProvider)
            {
                $compileProvider.debugInfoEnabled(false);
                $httpProvider.useApplyAsync(true);
                $httpProvider.defaults.withCredentials = true;
                $httpProvider.interceptors.push('authHttpResponseInterceptor');

                $mdThemingProvider.theme('brown')
                    .primaryPalette('brown')
                    .accentPalette('orange');

                $mdThemingProvider.theme('blue')
                    .primaryPalette('blue')
                    .accentPalette('cyan');

                $mdThemingProvider.theme('pink')
                    .primaryPalette('pink')
                    .accentPalette('indigo');

                $mdThemingProvider.theme('green')
                    .primaryPalette('green')
                    .accentPalette('amber');

                $mdThemingProvider.theme('grey')
                    .primaryPalette('grey')
                    .accentPalette('deep-purple');

                $mdThemingProvider.alwaysWatchTheme(true);

                cfpLoadingBarProvider.includeSpinner = true;
                cfpLoadingBarProvider.latencyThreshold = 250;
                cfpLoadingBarProvider.spinnerTemplate = '<div class="loader md-whiteframe-z1">Laddar...</div>';
            }
        ])
        .run(["$rootScope", "api", "user-service", "formlyConfig", "$state", "club-service",
            function($rootScope, api, userService, formlyConfig, $state, clubService) {

            $rootScope.Theme = "brown";

            $rootScope.Themes = [{
                Name: "Brunt",
                Value: "brown"
            }, {
                Name: "Blått",
                Value: "blue"
            }, {
                Name: "Rosa",
                Value: "pink"
            }, {
                Name: "Grön",
                Value: "green"
            }, {
                Name: "Grå",
                Value: "grey"
            }];

            $rootScope.NavigateTo = function(state) {
                $state.go(state);
            };

            if(typeof(Storage) !== "undefined") {
                var user = window.sessionStorage.getItem('gk-user');
                if(user != undefined) {
                    userService.User.Initialize(JSON.parse(user));
                    $rootScope.Theme = userService.User.UserInformation.Theme;
                    api.init(userService.User.Token);

                    clubService.GetModuleLinks().success(function(response) {
                        $rootScope.Links = response;
                    });
                }
                else
                    api.init("");
            } else {
                api.init("");
            }

            formlyConfig.setType({
                name: 'select',
                //template: "<pre>{{this.options.templateOptions.options | json}}</pre>"
                template: '<md-input-container><label>{{model[options.templateOptions.label]}}</label><md-select placeholder="{{to.label}}" ng-model="model[options.key]"><md-option ng-repeat="option in this.options.templateOptions.options" value="{{option.name}}">{{option.name}}</md-option></md-select></md-input-container>'
            });

            formlyConfig.setType({
                name: 'textarea',
                template: '<textarea ng-model="model[options.key]" columns="3" md-maxlength="500"></textarea>'
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
                types: ['input', 'textarea'],
                template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
            });

            formlyConfig.setWrapper({
                name: 'mdInputContainer',
                types: ['input', 'textarea'],
                template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
            });
        }])
        .service('user-service', ["$http", "Upload", function($http, Upload)
        {
            this.UserModel = function(club, user)
            {
                if(user == undefined)
                {
                    return {
                        Id: 0,
                        FirstName: "",
                        LastName: "",
                        UserName: "",
                        Password: "",
                        Image: "",
                        AccessRights: [],
                        Club: club,
                        UserInformation: {Birthday: new Date(), Theme: "brown" },
                        Gender: 0
                    };
                }

                var userToReturn = {
                    Id: user.Id,
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    UserName: user.Username,
                    Image: user.Image,
                    Password: "",
                    AccessRights: user.AccessRights,
                    Club: club,
                    Gender: user.Gender,
                    UserInformation: {
                        Email: user.UserInformation.Email ? user.UserInformation.Email : "",
                        City: user.UserInformation.City,
                        Occupation: user.UserInformation.Occupation,
                        Phone: user.UserInformation.Phone,
                        Street: user.UserInformation.Street,
                        Zip: user.UserInformation.Zip,
                        Grade: user.UserInformation.Grade,
                        Birthday: new Date(user.UserInformation.Birthday),
                        Weight: user.UserInformation.Weight,
                        Theme: user.UserInformation.Theme
                    },
                    GenericValues: user.GenericValues
                };

                try {
                    userToReturn.UserInformation.City = JSON.parse(userToReturn.UserInformation.City);
                } catch (ex) {
                    console.warn('Error parsing user: ', userToReturn);
                }

                return userToReturn;
            };

            this.User =
            {
                Id: 0,
                IsLoggedIn: false,
                FirstName: "",
                LastName: "",
                UserName: "",
                Password: "",
                Email: "",
                AccessRights: [],
                AccessRightsRight: [],
                Token: "",
                Club:
                {
                    Id: 0,
                    Name: "",
                    ShortName: "",
                    Image: ""
                },
                FullName: function()
                {
                    return String.format("{0} {1}", this.FirstName, this.LastName);
                },
                Update: function(user) {
                    this.FirstName = user.FirstName;
                    this.LastName = user.LastName;
                    this.UserName = user.UserName;
                    this.Email = user.Email;
                    this.Club = user.Club;
                    this.Weight = user.Weight;
                    this.Image = user.Image;
                },
                Initialize: function(user) {
                    this.Id = user.Id;
                    this.IsLoggedIn = user.IsLoggedIn;
                    this.FirstName = user.FirstName;
                    this.LastName = user.LastName;
                    this.UserName = user.UserName;
                    this.Email = user.Email;
                    this.AccessRights = user.AccessRights;
                    this.AccessRightsRight = user.AccessRightsRight;
                    this.Token = user.Token;
                    this.Club = user.Club;
                    this.Weight = user.Weight;
                    this.Image = user.Image;
                    this.UserInformation = {
                        Theme: user.UserInformation.Theme
                    };
                },
                InitializeLogin: function(account) {
                    this.Id = account.Id;
                    this.IsLoggedIn = true;
                    this.FirstName = account.FirstName;
                    this.LastName = account.LastName;
                    this.UserName = account.Username;
                    this.Email = account.Email;
                    this.Token = account.Token;
                    this.Image = account.Image;
                    this.Club.Id = account.Club.Id;
                    this.Club.Name = account.Club.Name;
                    this.Club.ShortName = account.Club.ShortName;
                    this.Club.Image = account.Club.Image;
                    this.UserInformation = {
                        Theme: account.UserInformation.Theme
                    };

                    for(var i = 0; i < account.AccessRightsRight.length; i++)
                    {
                        this.AccessRightsRight.push(account.AccessRightsRight[i]);
                    }

                    if(typeof(Storage) !== "undefined") {
                        window.sessionStorage.setItem('gk-user', JSON.stringify(this));
                    } else {
                        // Sorry! No Web Storage support..
                    }
                },
                Logout: function() {
                    this.Id = 0;
                    this.IsLoggedIn = false;
                    this.FirstName = "";
                    this.LastName = "";
                    this.UserName = "";
                    this.Email = "";
                    this.Token = "";
                    this.Club.Id = "";
                    this.Club.Name = "";
                    this.Club.ShortName = "";
                    this.Club.Image = "";
                    this.Password = "";
                    this.Image = "";

                    this.AccessRightsRight = [];

                    if(typeof(Storage) !== "undefined") {
                        window.sessionStorage.removeItem('gk-user');
                    } else {
                        // Sorry! No Web Storage support..
                    }
                }
            };

            this.GetAllUsers = function() {
                return $http.get('/api/User/GetAllUsers');
            };

            this.GetUser = function(userId) {
                return $http.get('/api/User/GetUser/' + userId);
            };

            this.GetMe = function() {
                return $http.get('/api/User/GetMe/');
            };

            this.SaveUser = function(user) {
                return $http.post('/api/User/SaveUser', user);
            };

            this.SaveMe = function(user) {
                return $http.post('/api/User/SaveMe', user);
            };

            this.DeleteUser = function(id) {
                return $http.post('/api/User/DeleteUser?' + $.param({id: id}));
            };

            this.ImportUsersFromSportadmin = function(file, sendWelcomeMail, tryToMatchGroupName, accessrightIds, successCallback) {
                Upload.upload({
                    url: "/api/User/ImportUsersFromSportadmin",
                    data: {file: file, sendWelcomeMail: sendWelcomeMail, tryToMatchGroupName: tryToMatchGroupName, accessrightIds: accessrightIds}
                }).then(successCallback, function(err) {
                    console.error(err);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ');
                });
            };
        }])
        .directive('ckEditor', ckEditorDirective)
        .constant('pagingValues', {
            "PageSize": 25
        });

    function ckEditorDirective() {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);

                ck.on('pasteState', function () {
                    $scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                });

                ngModel.$render = function (value) {
                    ck.setData(ngModel.$modelValue);
                };
            }
        };
    }


    $(document).ready(function () {
        angular.bootstrap(document, ["graderaklubb"]);
    });

}(window.angular));