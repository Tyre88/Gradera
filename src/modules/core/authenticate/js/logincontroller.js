(function (angular) {
    angular.module('graderaklubb').controller('clublogin', clubloginController);
    angular.module('graderaklubb').controller('forgotpassword', forgotpasswordController);

    clubloginController.$inject = ["$stateParams", "club-service"];
    forgotpasswordController.$inject = ["club-service", "login-service"];

    function clubloginController($stateParams, clubService) {
        var vm = this;
        vm.Club = {};
        vm.ClubShortName = $stateParams.clubShortName;

        vm.GetClubByShortName = GetClubByShortName;

        function GetClubByShortName() {
            clubService.GetClubByShortName(vm.ClubShortName).then(getClubByShortNameCallback);

            function getClubByShortNameCallback(response) {
                vm.Club = response.data;
            }
        }

        vm.GetClubByShortName();
    }

    function forgotpasswordController(clubService, loginService) {
        var vm = this;
        vm.Clubs = [];
        vm.SelectedClubId = undefined;
        vm.Email = "";

        vm.GetClubs = GetClubs;
        vm.ForgotPassword = ForgotPassword;

        function GetClubs() {
            clubService.GetClubs().then(getClubsSuccess);

            function getClubsSuccess(response) {
                vm.Clubs = response.data;
                vm.Clubs.splice(0, 1);
                vm.Clubs.splice(0, 1);

                console.log(vm.Clubs);
            }
        }

        function ForgotPassword() {
            if(vm.SelectedClubId > 0 && vm.Email != "") {
                loginService.ForgotPassword(vm.SelectedClubId, vm.Email).then(forgotPasswordSuccess);
            }
            console.log(vm.SelectedClubId);
            console.log(vm.Email);

            function forgotPasswordSuccess(response) {
                console.log(response);
                if(response == true) {
                    window.history.back();
                }
            }
        }

        vm.GetClubs();
    }
}(window.angular));