(function (angular) {
    LoadCss('modules/techniques/css/technique.css');
    angular.module('graderaklubb').controller('showtechnique', showtechniqueController);

    showtechniqueController.$inject = ["$state", "$stateParams", "techniqueService"];

    function showtechniqueController($state, $stateParams, techniqueService) {
        var vm = this;
        vm.TechniqueId = ~~$stateParams.id;
        vm.Technique = {};

        vm.GetTechnique = GetTechnique;

        function GetTechnique() {
            if(vm.TechniqueId > 0)
            {
                techniqueService.GetTechnique(vm.TechniqueId).success(getTechniqueCallback);

                function getTechniqueCallback(response) {
                    vm.Technique = response;
                }
            }
        }

        vm.GetTechnique();
    }
}(window.angular));