(function(angular) {
    angular.module('graderaklubb').service('login-service', ["$http", function($http)
    {
        this.Login = function(userName, password)
        {
            //Had to make it as a querystring to make it work...
            return $http.post('/api/Authenticate/Login?' + $.param({userName:userName, password:password}));
        };

        this.LogOut = function()
        {
            return $http.post('/api/Authenticate/Logout');
        };

        this.ForgotPassword = function(clubId, email) {
            return $http.post('/api/Authenticate/ForgotPassword?' + $.param({
                clubId: clubId,
                email: email
            }));
        }
    }]);
}(window.angular));