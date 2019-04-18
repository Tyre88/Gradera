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
            techniqueService.GetTechniques().then(getTechniquesCallback);

            function getTechniquesCallback(response) {
                vm.Techniques = response.data;
            }
        }

        vm.GetTechniques();
    }

    angular.module('graderaklubb').controller('techniqueedit', techniqueeditController);

    techniqueeditController.$inject = ["$state", "$stateParams", "technique-service", "user-service"];

    function techniqueeditController($state, $stateParams, techniqueService, userService) {
        var vm = this;
        vm.Technique = {TechniqueImages: []};
        vm.TechniqueId = ~~$stateParams.id;
        vm.TechniqueTypes = [];

        vm.GetTechnique = GetTechnique;
        vm.Back = Back;
        vm.Save = Save;
        vm.GetTechniqueTypes = GetTechniqueTypes;
        vm.OnUploadSuccess = OnUploadSuccess;

        function GetTechnique() {
            if(vm.TechniqueId <= 0)
                return;

            techniqueService.GetTechnique(vm.TechniqueId).then(getTechniqueCallback);

            function getTechniqueCallback(response) {
                vm.Technique = response.data;
            }
        }

        function Back() {
            $state.go('techniqueadminlist');
        }

        function Save() {
            techniqueService.SaveTechnique(vm.Technique).then(saveTechniqueCallback);

            function saveTechniqueCallback() {
                vm.Back();
            }
        }

        function GetTechniqueTypes() {
            techniqueService.GetTechniqueTypes().then(getTechniqueTypesCallback);

            function getTechniqueTypesCallback(response) {
                vm.TechniqueTypes = response.data;
            }
        }

        function OnUploadSuccess(response) {
            vm.Technique.TechniqueImages.push({ Image: "/Uploads/" + userService.User.Club.Id + "/" + response.data, TechniqueId: vm.Technique.TechniqueId });
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
            techniqueService.GetTechniqueTypes().then(getTechniqueTypesCallback);

            function getTechniqueTypesCallback(response) {
                vm.TechniqueTypes = response.data;
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
            techniqueService.SaveTechniqueType(vm.TechniqueType).then(saveCallback);

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
                techniqueService.GetTechniqueType(vm.TechniqueTypeId).then(getTypeCallback);

                function getTypeCallback(response) {
                    vm.TechniqueType = response.data;
                }
            }
        }

        vm.GetType();
    }
}(window.angular));