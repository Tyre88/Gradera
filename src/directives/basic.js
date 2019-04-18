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
        vm.GetItemPermission = GetItemPermission;

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
                    .then(SaveGenericItemPermissionsSuccess, SaveGenericItemPermissionsError);
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

        accessrightsService.GetAccessRights().then(GetAccessRightsSuccess);

        function GetAccessRightsSuccess(response) {
            vm.Accessrights = response.data;

            vm.GetItemPermission();
        }

        function GetItemPermission() {
            genericItemPermissionsService.GetItemPermission(vm.objectType, vm.objectId).then(GetItemPermissionSuccess);

            function GetItemPermissionSuccess(response) {
                var accessrightIds = response.data.AccessrightIds;
                var userIds = response.data.UserIds;

                for(var i = 0; i < accessrightIds.length; i++) {
                    for(var y = 0; y < vm.Accessrights.length; y++) {
                        if(accessrightIds[i] == vm.Accessrights[y].Id) {
                            vm.Accessrights[y].Checked = true;
                        }
                    }
                }
            }
        }

        $scope.$watch('vm.save', function(newVal, oldVal) {
            if(newVal != oldVal && newVal) {
                vm.Save();
            }
        });
    }
}(window.angular));