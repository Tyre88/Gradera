//LoadCss("modules/core/accessrights/css/accessrights.css");

(function(angular) {
    angular.module('graderaklubb').controller('listaccessrights', listaccessrightsController);
    angular.module('graderaklubb').controller('editaccessright', editaccessrightController);

    listaccessrightsController.$inject = ["accessrights-service", "$state"];
    editaccessrightController.$inject = ["accessrights-service", "$stateParams", "$state", "$q"];

    function listaccessrightsController(accessrightsService, $state) {
        var vm = this;
        vm.Accessrights = [];
        vm.AccessTypes = [];
        vm.AccessTypeRights = [];

        vm.GetAccessRights = GetAccessRights;
        vm.EditAccessright = EditAccessright;

        function GetAccessRights()
        {
            accessrightsService.GetAccessRights().success(getAccessrightsCallback);

            function getAccessrightsCallback(response)
            {
                vm.Accessrights = response;
            }
        }

        function EditAccessright(id, event)
        {
            $state.go("editaccessright", {id: id});
        }

        vm.GetAccessRights();
    }

    function editaccessrightController(accessrightsService, $stateParams, $state, $q) {
        var vm = this;
        vm.AccessrightId = $stateParams.id;
        vm.Accessright = {};
        vm.AccessTypes = [];
        vm.AccessTypeRights = [];
        vm.Modules = [];

        vm.GetAccessright = GetAccessright;
        vm.SaveAccessright = SaveAccessright;
        vm.GetAccessTypes = GetAccessTypes;
        vm.GetModules = GetModules;
        vm.GetAccessTypeRights = GetAccessTypeRights;
        vm.Back = Back;

        function GetAccessright(id) {
            accessrightsService.GetAccessRight(id).success(getAccessrightCallback);

            function getAccessrightCallback(response) {
                vm.Accessright = response;

                for(var i = 0; i < vm.Accessright.Accessright_Rights.length; i++)
                {
                    var accessType = vm.Modules.GetItemByValue("AccessTypeId", vm.Accessright.Accessright_Rights[i].AccessType);
                    accessType.Checked = true;
                    accessType.SelectedRightId = vm.Accessright.Accessright_Rights[i].AccessTypeRight;
                }
            }
        }

        function SaveAccessright() {
            vm.Accessright.Accessright_Rights = [];

            for(var i = 0; i < vm.Modules.length; i++)
            {
                if(vm.Modules[i].Checked == true)
                {
                    vm.Accessright.Accessright_Rights.push({
                        AccessType: vm.Modules[i].AccessTypeId,
                        AccessTypeRight: vm.Modules[i].SelectedRightId
                    });
                }
            }

            console.log(vm.Accessright);
            accessrightsService.SaveAccessright(vm.Accessright).then(function() {
                vm.Back();
            });
        }

        function Back() {
            $state.go("listaccessrights");
        }

        function GetAccessTypes() {
            accessrightsService.GetAccessTypes().success(getAccessTypesCallback);

            function getAccessTypesCallback(response) {
                vm.AccessTypes = response;
            }
        }

        function GetAccessTypeRights() {
            accessrightsService.GetAccessTypeRights().success(getAccessTypeRigtsCallback);

            function getAccessTypeRigtsCallback(response) {
                vm.AccessTypeRights = response;
            }
        }

        function GetModules() {
            accessrightsService.GetModules().success(GetModulesCallback);

            function GetModulesCallback(response) {
                vm.Modules = response;
            }
        }

        $q.all([vm.GetModules(), vm.GetAccessTypeRights()]).then(function() {
            if(~~vm.AccessrightId > 0)
                vm.GetAccessright(~~vm.AccessrightId);
        });
    }
}(window.angular));