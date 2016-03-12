(function(angular) {
    angular.module('graderaklubb').controller('clubsettings', clubsettingsController);

    clubsettingsController.$inject = ["$rootScope", "$scope", "$mdToast", "club-service", "user-service"];

    function clubsettingsController($rootScope, $scope, $mdToast, clubService, userService) {
        var vm = this;
        vm.Club = {};
        vm.SelectedTheme = "brown";
        vm.Themes = [{
            Name: "Brunt",
            Value: "brown"
        }, {
            Name: "Blått",
            Value: "blue"
        }, {
            Name: "Rosa",
            Value: "pink"
        }];

        vm.GetClub = GetClub;
        vm.Save = Save;
        vm.OnUploadSuccess = OnUploadSuccess;
        vm.ChangeTheme = ChangeTheme;

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
            vm.Club.Image = "/Uploads/" + userService.User.Club.Id + "/" + response.data;
        }

        function ChangeTheme(theme) {
            $rootScope.Theme = theme;
        }

        $scope.$watch('vm.SelectedTheme', function(newVal) {
            if(newVal !== undefined)
                vm.ChangeTheme(newVal);
        });

        vm.GetClub();
    }
}(window.angular));