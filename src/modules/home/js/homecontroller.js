//LoadCss("modules/home/css/home.css");

(function(angular) {
    angular.module('graderaklubb').controller('home', homeController);

    homeController.$inject = ["$rootScope", "$state", "user-service", "competition-service", "form-service", "club-service"];

    function homeController($rootScope, $state, userService, competitionService, formService, clubService) {
        var vm = this;
        vm.UpcommingCompetitions = [];
        vm.UnansweredForms = [];
        vm.Club = {};

        vm.GetUpcommingCompetitions = GetUpcommingCompetitions;
        vm.GoToCompetition = GoToCompetition;

        vm.GetUnansweredForms = GetUnansweredForms;
        vm.GoToUnansweredForm = GoToUnansweredForm;

        vm.GetClub = GetClub;

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

        function GetClub() {
            clubService.GetClub().success(GetClubCallback);

            function GetClubCallback(response) {
                vm.Club = response;
            }
        }

        if($rootScope.HasAccess(5, 10))
            vm.GetUpcommingCompetitions();

        if($rootScope.HasAccess(6, 10))
            vm.GetUnansweredForms();

        if(userService.User.IsLoggedIn)
            vm.GetClub();
    }
}(window.angular));