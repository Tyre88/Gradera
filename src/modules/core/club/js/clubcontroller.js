(function(angular) {
    angular.module('graderaklubb').controller('clubsettings', clubsettingsController);

    clubsettingsController.$inject = ["$mdToast", "club-service"];

    function clubsettingsController($mdToast, clubService) {
        var vm = this;
        vm.Club = {};

        vm.GetClub = GetClub;
        vm.Save = Save;
        vm.OnUploadSuccess = OnUploadSuccess;

        function GetClub() {
            clubService.GetClub().success(getClubCallback);

            function getClubCallback(response) {
                vm.Club = response;
            }
        }

        function Save() {
            clubService.SaveClub(vm.Club).success(saveClubCallback);

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
            vm.Club.Image = "/Uploads/" + response.data;
        }

        vm.GetClub();
    }
}(window.angular));