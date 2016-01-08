LoadCss("content/css/login.css");

(function(angular) {
    angular.module('graderaklubb').directive('gkLogin', ["login-service", "user-service", "api", "$state", "$mdDialog", function(loginService, userService, api, $state, $mdDialog)
    {
        return {
            restrict: "E",
            templateUrl: "modules/core/authenticate/views/login.html",
            transclude: true,
            link: function(scope)
            {
                scope.Login = function()
                {
                    loginService.Login(scope.UserService.User.UserName, scope.UserService.User.Password).success(function(response) {
                        userService.User.InitializeLogin(response);
                        api.init(userService.User.Token);
                        $state.go ('home');
                    }).error(function() {
                        $mdDialog.show(
                            $mdDialog.alert()
                                .clickOutsideToClose(false)
                                .title('Login fel!')
                                .content('Det gick inte att logga in, prova med ett annat användarnamn eller lösenord.')
                                .ariaLabel('Login fel!')
                                .ok('Ok')
                        );
                    });
                };
            }
        };
    }]);

    angular.module('graderaklubb').directive('gkLoggedIn', ["login-service", "user-service", "$mdSidenav", "$state",
        function(loginService, userService, $mdSidenav, $state)
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
                        $state.go ('login');
                    });
                };

                scope.GoTo = function(sref)
                {
                    $state.go(sref);
                };

                scope.openMenu = function($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                };
            }
        };
    }]);
}(window.angular));