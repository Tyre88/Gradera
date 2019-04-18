(function(angular) {
    angular.module('graderaklubb').controller('clubsettings', clubsettingsController);

    clubsettingsController.$inject = ["$rootScope", "$scope", "$mdToast", "club-service", "user-service"];

    function clubsettingsController($rootScope, $scope, $mdToast, clubService, userService) {
        var vm = this;
        vm.Club = {};

        vm.GetClub = GetClub;
        vm.Save = Save;
        vm.OnUploadSuccess = OnUploadSuccess;

        function GetClub() {
            clubService.GetClub().then(getClubCallback);

            function getClubCallback(response) {
                vm.Club = response.data;
            }
        }

        function Save() {
            clubService.SaveClub(vm.Club).then(saveClubCallback);

            function saveClubCallback() {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Klubben sparades korrekt!')
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }
        }

        function OnUploadSuccess(response) {
            vm.Club.Image = "/Uploads/" + userService.User.Club.Id + "/" + response.data;
        }

        $scope.$watch('vm.SelectedTheme', function(newVal) {
            if(newVal !== undefined)
                vm.ChangeTheme(newVal);
        });

        vm.GetClub();
    }
}(window.angular));