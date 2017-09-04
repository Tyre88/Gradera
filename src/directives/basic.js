(function (angular) {
    var gkPermissionsComponent = {
        bindings: {
            usePermissions: "=",
            save: "=",
            saveCallback: "&",
            objectType: "@",
            objectId: "="
        },
        controller: permissionsController,
        templateUrl: "directives/views/permissions.html",
        controllerAs: "vm"
    };

    angular.module('graderaklubb').component('gkPermissions', gkPermissionsComponent);

    permissionsController.$inject = ["$scope", "accessrights-service", "genericitempermissions.service"];

    function permissionsController($scope, accessrightsService, genericItemPermissionsService) {
        var vm = this;
        vm.Accessrights = [];

        vm.Save = Save;

        function Save() {
            let accessrightIds = [];
            let userIds = [];

            for(let i = 0; i < vm.Accessrights.length; i++) {
                if(vm.Accessrights[i].Checked == true) {
                    accessrightIds.push(vm.Accessrights[i].Id);
                }
            }

            if(~~vm.objectType > 0 && ~~vm.objectId > 0) {
                genericItemPermissionsService.SaveGenericItemPermissions(vm.objectId, vm.objectType, accessrightIds, userIds)
                    .success(SaveGenericItemPermissionsSuccess)
                    .error(SaveGenericItemPermissionsError);
            }
            else {
                SaveGenericItemPermissionsError();
            }

            function SaveGenericItemPermissionsSuccess(response) {
                vm.saveCallback()(true);
            }

            function SaveGenericItemPermissionsError() {
                vm.saveCallback()(false);
            }
        }

        accessrightsService.GetAccessRights().success(GetAccessRightsSuccess);

        function GetAccessRightsSuccess(response) {
            vm.Accessrights = response;
        }

        $scope.$watch('vm.save', function(newVal, oldVal) {
            if(newVal != oldVal && newVal) {
                vm.Save();
            }
        });
    }
}(window.angular));