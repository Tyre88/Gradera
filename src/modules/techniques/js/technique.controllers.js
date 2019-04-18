(function (angular) {
    //LoadCss('modules/techniques/css/technique.css');
    angular.module('graderaklubb').controller('showtechnique', showtechniqueController);

    showtechniqueController.$inject = ["$state", "$stateParams", "techniqueService", "$mdDialog"];

    function showtechniqueController($state, $stateParams, techniqueService, $mdDialog) {
        var vm = this;
        vm.TechniqueId = ~~$stateParams.id;
        vm.Technique = {};

        vm.GetTechnique = GetTechnique;
        vm.ViewImage = ViewImage;

        function GetTechnique() {
            if(vm.TechniqueId > 0)
            {
                techniqueService.GetTechnique(vm.TechniqueId).then(getTechniqueCallback);

                function getTechniqueCallback(response) {
                    vm.Technique = response.data;
                }
            }
        }

        function ViewImage(image) {
            $mdDialog.show({
                template: "<md-dialog-content class='image-dialog-content'><img src='" + image + "' /></md-dialog-content><md-dialog-actions class='image-dialog-actions'><md-button ng-click='vm.CloseImage();' class='md-fab'><i class='fa fa-close'></i></md-button></md-dialog-actions>",
                parent: angular.element(document.body),
                controller: "showtechniqueimage",
                controllerAs: "vm",
                clickOutsideToClose: true,
                fullscreen: true
            });
        }

        vm.GetTechnique();
    }

    angular.module('graderaklubb').controller('showtechniqueimage', showtechniqueimageController);

    showtechniqueimageController.$inject = ["$mdDialog"];

    function showtechniqueimageController($mdDialog) {
        var vm = this;

        vm.CloseImage = CloseImage;

        function CloseImage() {
            $mdDialog.hide();
        }
    }
}(window.angular));