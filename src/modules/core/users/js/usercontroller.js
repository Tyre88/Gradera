require(
    [
        "app",
        "modules/core/accessrights/js/accessrights-service.js"
    ],
    function(app)
    {
        app.controller('listusers', ["$scope", "user-service", "$state", "$mdDialog", function($scope, userService, $state, $mdDialog) {
            $scope.Users = [];

            $scope.EditUser = function(userId, event)
            {
                $state.go("edituser", {userId : userId});
            };

            $scope.DeleteUser = function(user) {

                var confirm = $mdDialog.confirm()
                    .title('Ta bort användare?')
                    .content('Är du säker på att du vill ta bort ' + user.FirstName + ' ' + user.LastName + '?')
                    .ariaLabel('Ta bort användare?')
                    .ok('Ja')
                    .cancel('Nej');

                $mdDialog.show(confirm).then(function() {
                    userService.DeleteUser(user.Id).success(function(response) {
                        $scope.Users.splice($scope.Users.indexOf(user), 1);
                    });
                });
            };

            userService.GetAllUsers().success(function(response) {
               $scope.Users = response;
            });
        }]);

        app.controller('edituser', ["$scope", "$stateParams", "user-service", "accessrights-service", "$state", "gradeEnum", "Upload",
        function($scope, $stateParams, userService, accessrightsService, $state, gradeEnum, Upload) {
            $scope.UserId = $stateParams.userId;
            $scope.User = {};
            $scope.AccessRights = [];
            $scope.Grades = gradeEnum.grades;

            $scope.Save = function() {

                $scope.User.AccountAccess = [];

                for(var i = 0; i < $scope.AccessRights.length; i++)
                {
                    if($scope.AccessRights[i].Checked == true) {
                        $scope.User.AccountAccess.push({
                            AccessId: $scope.AccessRights[i].Id,
                            AccountId: $scope.User.Id
                        });
                    }
                }

                userService.SaveUser($scope.User).success(function(response) {
                    $state.go ('listusers');
                });
            };

            $scope.Back = function() {
                $state.go("listusers");
            };

            $scope.MapAccessRights = function()
            {
                for(var i = 0; i < $scope.User.AccessRights.length; i++)
                {
                    var right = $scope.AccessRights.GetItemByValue("Id", $scope.User.AccessRights[i].Id);
                    if(right != null)
                        right.Checked = true;
                }
            };

            $scope.OnUploadSuccess = function(response) {
                $scope.User.Image = "/Uploads/" + response.data;
            };

            accessrightsService.GetAccessRights().success(function(response) {
                $scope.AccessRights = response;

                if($scope.UserId > 0)
                {
                    userService.GetUser($scope.UserId).success(function(response) {
                        $scope.User = new userService.UserModel(userService.User.Club, response);

                        $scope.MapAccessRights();
                    });
                }
                else
                {
                    $scope.User = new userService.UserModel(userService.User.Club);
                }
            });
        }]);
    }
);