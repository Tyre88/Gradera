require(
    [
        "app"
    ],
    function(app) {
        app.controller('listaccessrights', listaccessrightsController);

        listaccessrightsController.$inject = ["accessrights-service"];

        function listaccessrightsController(accessrightsService) {
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
                console.log(id);
            }

            vm.GetAccessRights();
        }
    }
);