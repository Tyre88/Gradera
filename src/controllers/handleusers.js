LoadCss("content/css/handleusers.css");
require(
    [
        "app",
        "services/accessrights-service.js"
    ],
    function(app)
    {
        app.controller('handleusers', ["$scope", "user-service", "$state", function($scope, userService, $state) {
            $scope.Users = [];

            $scope.EditUser = function(userId, event)
            {
                $state.go("edituser", {userId : userId});
            };

            userService.GetAllUsers().success(function(response) {
               $scope.Users = response;
            });
        }]);

        app.controller('edituser', ["$scope", "$stateParams", "user-service", "accessrights-service",
            function($scope, $stateParams, userService, accessrightsService) {
            $scope.UserId = $stateParams.userId;
            $scope.User = {};
            $scope.AccessRights = [];


            accessrightsService.GetAccessRights().success(function(response) {
                $scope.AccessRights = response;
            });

            if($scope.UserId > 0)
            {
                userService.GetUser($scope.UserId).success(function(response) {
                    $scope.User = response;
                });
            }
            else
            {
                $scope.User = new userService.UserModel(userService.User.Compound);
            }
        }]);
    }
);