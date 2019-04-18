(function(angular) {
    angular.module('graderaklubb').controller('listusers', ["$rootScope", "$scope", "user-service", "$state", "$mdDialog",
        function($rootScope, $scope, userService, $state, $mdDialog) {
        var vm = this;
        vm.Users = [];

        vm.EditUser = function(userId, event)
        {
            $state.go("edituser", {userId : userId});
        };

        vm.DeleteUser = function(user) {

            var confirm = $mdDialog.confirm()
                .title('Är du säker på att du vill ta bort ' + user.FirstName + ' ' + user.LastName + '?')
                .ariaLabel('Ta bort användare?')
                .ok('Ja')
                .cancel('Nej');

            $mdDialog.show(confirm).then(function() {
                userService.DeleteUser(user.Id).then(function(response) {
                    vm.Users.splice(vm.Users.indexOf(user), 1);
                });
            });
        };

        vm.OpenImportDialog = OpenImportDialog;

        function OpenImportDialog() {
            $mdDialog.show({
                templateUrl: "modules/core/users/admin/views/import-from-sportadmin-dialog.html",
                controller: ImportFromSportAdminController,
                controllerAs: "vm",
                bindToController: true
            });
        }

        ImportFromSportAdminController.$inject = ["$rootScope", "$mdDialog", "accessrights-service"];

        function ImportFromSportAdminController($rootScope, $mdDialog, accessrightsService) {
            var vm = this;
            vm.File = undefined;
            vm.SendWelcomeMail = false;
            vm.TryToMatchGroupName = false;
            vm.Accessrights = [];

            vm.FileSelect = FileSelect;
            vm.ImportFromSportadmin = ImportFromSportadmin;
            vm.Close = Close;
            vm.GetAccessrights = GetAccessrights;

            function FileSelect(files) {
                vm.File = files[0];
                console.log(vm.File);
            }

            function ImportFromSportadmin() {
                var accessrightIds = "";

                for(var i = 0; i < vm.Accessrights.length; i++)
                {
                    if(vm.Accessrights[i].Checked == true)
                        accessrightIds = accessrightIds + vm.Accessrights[i].Id + ",";
                }

                accessrightIds = accessrightIds.substring(0, accessrightIds.length - 1);

                userService.ImportUsersFromSportadmin(vm.File, vm.SendWelcomeMail, vm.TryToMatchGroupName, accessrightIds, function() {
                    $rootScope.$broadcast('users.update');
                    vm.Close();
                });
            }

            function Close() {
                $mdDialog.hide();
            }

            function GetAccessrights() {
                accessrightsService.GetAccessRights().then(GetAccessRightsCallback);

                function GetAccessRightsCallback(response) {
                    vm.Accessrights = response.data;
                }
            }

            vm.GetAccessrights();
        }

        userService.GetAllUsers().then(function(response) {
            for(var i = 0; i < response.data.length; i++)
            {
                vm.Users.push(new userService.UserModel(userService.User.Club, response.data[i]));
            }
        });

        $rootScope.$on('users.update', function() {
            userService.GetAllUsers().then(function(response) {
                vm.Users = [];
                for(var i = 0; i < response.data.length; i++)
                {
                    vm.Users.push(new userService.UserModel(userService.User.Club, response.data[i]));
                }
            });
        });
    }]);

    angular.module('graderaklubb').controller('edituser', ["$scope", "$stateParams", "user-service", "accessrights-service", "$state", "gradeEnum", "$mdDialog", "$timeout",
        function($scope, $stateParams, userService, accessrightsService, $state, gradeEnum, $mdDialog, $timeout) {
            $scope.UserId = $stateParams.userId;
            $scope.User = {};
            $scope.AccessRights = [];
            $scope.Grades = gradeEnum.grades;
            $scope.UserCity = {};

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

                $scope.User.UserInformation.City = JSON.stringify($scope.UserCity);

                userService.SaveUser($scope.User).then(function(response) {
                    $state.go ('listusers');
                }, function(err) {
                    $mdDialog.show($mdDialog.alert({
                        textContent: err,
                        ok: 'Ok',
                        title: 'Obs!'
                    }));
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
                $scope.User.Image = "/Uploads/" + userService.User.Club.Id + "/" + response.data;
            };

            accessrightsService.GetAccessRights().then(function(response) {
                $scope.AccessRights = response.data;

                if($scope.UserId > 0)
                {
                    userService.GetUser($scope.UserId).then(function(response) {
                        $scope.User = new userService.UserModel(userService.User.Club, response.data);
                        try{
                            $scope.UserCity = $scope.User.UserInformation.City;
                        } catch(ex) {
                            console.warn(ex);
                        }

                        $scope.MapAccessRights();
                    });
                }
                else
                {
                    $scope.User = new userService.UserModel(userService.User.Club);
                    $scope.User.UserInformation.Grade = $scope.Grades[0].Id;
                    userService.GetUser($scope.UserId).then(function(response) {
                        $scope.User.GenericValues = response.data.GenericValues;
                    });
                }
            });
        }]);

        angular.module('graderaklubb').controller('editme', editmeController);

        editmeController.$inject = ["$rootScope", "user-service", "accessrights-service", "gradeEnum", "$mdToast", "$mdDialog"];

        function editmeController($rootScope, userService, accessrightsService, gradeEnum, $mdToast, $mdDialog) {
            var vm = this;
            vm.User = {};
            vm.AccessRights = [];
            vm.Grades = gradeEnum.grades;
            vm.UserCity = {};

            vm.MapAccessRights = MapAccessRights;
            vm.Save = Save;
            vm.OnUploadSuccess = OnUploadSuccess;

            function GetAccessRightsCallback(response) {
                vm.AccessRights = response.data;

                userService.GetMe(vm.UserId).then(GetMeCallback);
            }

            function GetMeCallback(response) {
                vm.User = new userService.UserModel(userService.User.Club, response.data);
                try{
                    vm.UserCity = vm.User.UserInformation.City;
                } catch(ex) {
                    console.warn('Error maping the city...');
                }

                vm.MapAccessRights();
            }

            function MapAccessRights() {
                for(var i = 0; i < vm.User.AccessRights.length; i++)
                {
                    var right = vm.AccessRights.GetItemByValue("Id", vm.User.AccessRights[i].Id);
                    if(right != null)
                        right.Checked = true;
                }
            }

            function Save() {
                vm.User.AccountAccess = [];

                for(var i = 0; i < vm.AccessRights.length; i++)
                {
                    if(vm.AccessRights[i].Checked == true) {
                        vm.User.AccountAccess.push({
                            AccessId: vm.AccessRights[i].Id,
                            AccountId: vm.User.Id
                        });
                    }
                }

                vm.User.UserInformation.City = JSON.stringify(vm.User.UserInformation.City);
                vm.User.UserInformation.Theme = $rootScope.Theme;

                userService.SaveMe(vm.User).then(function() {
                    vm.User.UserInformation.City = JSON.parse(vm.User.UserInformation.City);

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Din profil sparades.')
                    );

                    userService.User.Update(vm.User);
                }, function(err) {
                    vm.User.UserInformation.City = JSON.parse(vm.User.UserInformation.City);
                    $mdDialog.show($mdDialog.alert({
                        textContent: err,
                        ok: 'Ok',
                        title: 'Obs!'
                    }));
                });
            }

            function OnUploadSuccess(response) {
                vm.User.Image = "/Uploads/" + userService.User.Club.Id + "/" + response.data;
            }

            accessrightsService.GetAccessRights().then(GetAccessRightsCallback);
        }
}(window.angular));