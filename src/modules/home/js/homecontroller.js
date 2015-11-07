LoadCss("modules/home/css/home.css");

(function(angular) {
    angular.module('graderaklubb').controller('home', homeController);

    homeController.$inject = ["$rootScope", "$state", "competition-service", "form-service"];

    function homeController($rootScope, $state, competitionService, formService) {
        var vm = this;
        vm.UpcommingCompetitions = [];
        vm.UnansweredForms = [];

        vm.GetUpcommingCompetitions = GetUpcommingCompetitions;
        vm.GoToCompetition = GoToCompetition;

        vm.GetUnansweredForms = GetUnansweredForms;
        vm.GoToUnansweredForm = GoToUnansweredForm;

        function GetUpcommingCompetitions() {
            competitionService.GetUpcommingCompetitions(3).success(getUpcommingCompetitionsCallback);

            function getUpcommingCompetitionsCallback(response) {
                vm.UpcommingCompetitions = response;
            }
        }

        function GoToCompetition(competitionId) {
            $state.go('showcompetition', {id: competitionId});
        }

        function GetUnansweredForms() {
            formService.GetUnansweredForms(3).success(getUnansweredFormsCallback);

            function getUnansweredFormsCallback(response) {
                vm.UnansweredForms = response;
            }
        }

        function GoToUnansweredForm(formId) {
            $state.go('showform', {formId: formId});
        }

        if($rootScope.HasAccess(5, 10))
            vm.GetUpcommingCompetitions();

        if($rootScope.HasAccess(6, 10))
            vm.GetUnansweredForms();
    }
}(window.angular));