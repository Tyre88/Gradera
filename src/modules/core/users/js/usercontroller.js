(function(angular) {
    angular.module('graderaklubb').controller('userlist', userlistController);
    angular.module('graderaklubb').controller('showuser', showuserController);

    userlistController.$inject = ["$state", "user-service"];
    showuserController.$inject = ["$state", "$stateParams", "user-service", "gradeEnum"];

    function userlistController($state, userService) {
        var vm = this;
        vm.Users = [];

        vm.GetUsers = GetUsers;
        vm.ShowUser = ShowUser;

        function GetUsers() {
            userService.GetAllUsers().success(getUsersCallback);

            function getUsersCallback(response) {
                for(var i = 0; i < response.length; i++)
                {
                    vm.Users.push(new userService.UserModel(userService.User.Club, response[i]));
                }
            }
        }

        function ShowUser(userId) {
            $state.go('showuser', {userId: userId})
        }

        vm.GetUsers();
    }

    function showuserController($state, $stateParams, userService, gradeEnum) {
        var vm = this;
        vm.UserId = ~~$stateParams.userId;
        vm.User = {};

        vm.GetUser = GetUser;
        vm.GetGrade = GetGrade;

        function GetUser() {
            userService.GetUser(vm.UserId).success(getUserCallback);

            function getUserCallback(response) {
                vm.User = new userService.UserModel(userService.User.Club, response);
            }
        }

        function GetGrade() {
            if(vm.User.UserInformation != undefined)
            {
                return gradeEnum.grades.GetItemByValue("Id", vm.User.UserInformation.Grade).Name;
            }
        }

        if(vm.UserId > 0)
            vm.GetUser();
    }
}(window.angular));