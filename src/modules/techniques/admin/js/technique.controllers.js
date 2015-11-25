(function (angular) {
    angular.module('graderaklubb').controller('techniqueadminlist', techniqueadminlistController);

    techniqueadminlistController.$inject = ["$state", "technique-service"];

    function techniqueadminlistController($state, techniqueService) {
        var vm = this;
        vm.Techniques = [];

        vm.Edit = Edit;
        vm.GetTechniques = GetTechniques;

        function Edit(id) {
            $state.go('techniqueedit', {id: id});
        }

        function GetTechniques() {
            techniqueService.GetTechniques().success(getTechniquesCallback);

            function getTechniquesCallback(response) {
                vm.Techniques = response;
            }
        }

        vm.GetTechniques();
    }

    angular.module('graderaklubb').controller('techniqueedit', techniqueeditController);

    techniqueeditController.$inject = ["$state", "$stateParams", "technique-service"];

    function techniqueeditController($state, $stateParams, techniqueService) {
        var vm = this;
        vm.Technique = {};
        vm.TechniqueId = ~~$stateParams.id;
        vm.TechniqueTypes = [];

        vm.GetTechnique = GetTechnique;
        vm.Back = Back;
        vm.Save = Save;
        vm.GetTechniqueTypes = GetTechniqueTypes;

        function GetTechnique() {
            if(vm.TechniqueId <= 0)
                return;

            techniqueService.GetTechnique(vm.TechniqueId).success(getTechniqueCallback);

            function getTechniqueCallback(response) {
                vm.Technique = response;
            }
        }

        function Back() {
            $state.go('techniqueadminlist');
        }

        function Save() {
            techniqueService.SaveTechnique(vm.Technique).success(saveTechniqueCallback);

            function saveTechniqueCallback() {
                vm.Back();
            }
        }

        function GetTechniqueTypes() {
            techniqueService.GetTechniqueTypes().success(getTechniqueTypesCallback);

            function getTechniqueTypesCallback(response) {
                vm.TechniqueTypes = response;
            }
        }

        vm.GetTechnique();
        vm.GetTechniqueTypes();
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