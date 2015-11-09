(function (angular) {
    angular.module('graderaklubb').controller('clublogin', clubloginController);

    clubloginController.$inject = ["$stateParams", "club-service"];

    function clubloginController($stateParams, clubService) {
        var vm = this;
        vm.Club = {};
        vm.ClubShortName = $stateParams.clubShortName;

        vm.GetClubByShortName = GetClubByShortName;

        function GetClubByShortName() {
            clubService.GetClubByShortName(vm.ClubShortName).success(getClubByShortNameCallback);

            function getClubByShortNameCallback(response) {
                vm.Club = response;
            }
        }

        vm.GetClubByShortName();
    }
}(window.angular));