(function (angular) {
    angular.module('graderaklubb').controller('techniqueadminlist', techniqueadminlistController);

    techniqueadminlistController.$inject = [];

    function techniqueadminlistController() {
        var vm = this;
    }

    angular.module('graderaklubb').controller('techniquetypeadminlist', techniquetypeadminlistController);

    techniquetypeadminlistController.$inject = ["$state", "technique-service"];

    function techniquetypeadminlistController($state, techniqueService) {
        var vm = this;
        vm.TechniqueTypes = [];

        vm.Edit = Edit;
        vm.GetTypes = GetTypes;

        function Edit(id) {
            $state.go('techniquetypeadminedit', {id: id});
        }

        function GetTypes() {
            techniqueService.GetTechniqueTypes().success(getTechniqueTypesCallback);

            function getTechniqueTypesCallback(response) {
                vm.TechniqueTypes = response;
            }
        }

        vm.GetTypes();
    }

    angular.module('graderaklubb').controller('techniquetypeadminedit', techniquetypeadmineditController);

    techniquetypeadmineditController.$inject = ["$state", "$stateParams", "technique-service"];

    function techniquetypeadmineditController($state, $stateParams, techniqueService) {
        var vm = this;
        vm.TechniqueTypeId = ~~$stateParams.id;
        vm.TechniqueType = {};

        vm.Save = Save;
        vm.Back = Back;
        vm.GetType = GetType;

        function Save(){
            techniqueService.SaveTechniqueType(vm.TechniqueType).success(saveCallback);

            function saveCallback() {
                vm.Back();
            }
        }

        function Back() {
            $state.go('techniquetypeadminlist');
        }

        function GetType() {
            if(vm.TechniqueTypeId > 0)
            {
                techniqueService.GetTechniqueType(vm.TechniqueTypeId).success(getTypeCallback);

                function getTypeCallback(response) {
                    vm.TechniqueType = response;
                }
            }
        }

        vm.GetType();
    }
}(window.angular));