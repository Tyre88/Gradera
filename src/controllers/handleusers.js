require(
    [
        "app"
    ],
    function(app)
    {
        app.controller('handleusers', ["$scope", "user-service", function($scope, userService) {
            $scope.Users = [];
            userService.GetAllUsers().success(function(response) {
               $scope.Users = response;
            });
        }]);
    }
);