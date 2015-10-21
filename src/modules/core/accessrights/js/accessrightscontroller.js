'use-strict';
require(
    [
        "app"
    ],
    function(app) {
        app.controller('listaccessrights', listaccessrightsController);
        app.controller('editaccessright', editaccessrightController);

        listaccessrightsController.$inject = ["accessrights-service", "$state"];
        editaccessrightController.$inject = ["accessrights-service", "$stateParams", "$state"];

        function listaccessrightsController(accessrightsService, $state) {
            var vm = this;
            vm.Accessrights = [];
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

        function editaccessrightController(accessrightsService, $stateParams, $state) {
            var vm = this;
            vm.AccessrightId = $stateParams.id;
            vm.Accessright = {};

            vm.GetAccessright = GetAccessright;
            vm.SaveAccessright = SaveAccessright;
            vm.Back = Back;

            function GetAccessright(id) {
                accessrightsService.GetAccessright(id).success(getAccessrightCallback);

                function getAccessrightCallback(response) {
                    vm.Accessright = response;
                }
            }

            function SaveAccessright() {

            }

            function Back() {
                $state.go("listaccessrights");
            }
        }
    }
);