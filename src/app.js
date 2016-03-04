LoadCss(["content/css/stylesheet.css", "content/css/directives.css", "content/css/modules.css", "content/css/dependencies.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"]);
(function(angular) {
    angular.module('graderaklubb', ['ng', 'ngRoute', 'ngAnimate', 'ui.router', 'ngMaterial', "ngMessages",
        'webbdudes-image-helper', 'ngFileUpload', 'formly', 'angular-loading-bar', 'dndLists', 'ngSanitize', 'btford.markdown',
        'google.places']);
    angular.module('graderaklubb').controller('index', ["$rootScope", "$scope", "$state", "user-service", "$mdSidenav", "Upload",
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
                    },
                    {
                        Sref: "gradingadminlist",
                        Text: "Hantera graderings bestämmelser",
                        AccessType: 3,
                        AccessTypeRight: 20
                    },
                    {
                        Sref: "gradingcategoryadminlist",
                        Text: "Hantera graderings kategorier",
                        AccessType: 3,
                        AccessTypeRight: 20
                    },
                    {
                        Sref: "listbooklets",
                        Text: "Hantera graderings häften",
                        AccessType: 3,
                        AccessTypeRight: 20
                    },
                    {
                        Sref: "techniqueadminlist",
                        Text: "Hantera tekniker",
                        AccessType: 7,
                        AccessTypeRight: 20
                    },
                    {
                        Sref: "techniquetypeadminlist",
                        Text: "Hantera teknik typer",
                        AccessType: 7,
                        AccessTypeRight: 20
                    },
                    {
                        Sref: "newsletteradminlist",
                        Text: "Nyhetsbrev",
                        AccessType: 8,
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
                .title('Du har blivit utloggad, vänligen logga in igen.')
                .clickOutsideToClose(false)
                .ariaLabel('Utloggad')
                .ok('Ok');
            $mdDialog.show(confirm).then(function() {
                userService.User.Logout();
                $state.go('login');
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

                $mdThemingProvider.theme('default')
                    .primaryPalette('brown')
                    .accentPalette('orange');

                cfpLoadingBarProvider.includeSpinner = true;
                cfpLoadingBarProvider.latencyThreshold = 250;
                cfpLoadingBarProvider.spinnerTemplate = '<div class="loader md-whiteframe-z1">Laddar...</div>';
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
                        UserInformation: {Birthday: new Date(), },
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
                        Weight: user.UserInformation.Weight
                    }
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
        .directive('ckEditor', ckEditorDirective);

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