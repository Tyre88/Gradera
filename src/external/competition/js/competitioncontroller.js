/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

(function(angular) {
    angular.module('graderaklubbexternal').controller('showexternalcompetition', showexternalcompetitionController);

    showexternalcompetitionController.$inject = ["$stateParams", "competition-external-service", "gradeEnum", "$mdDialog"];

    function showexternalcompetitionController($stateParams, competitionExternalService, gradeEnum, $mdDialog) {
        var vm = this;
        vm.Competition = {};
        vm.CompetitionName = $stateParams.competitionName;
        vm.ClubShortName = $stateParams.clubShortName;
        vm.ContactPerson = { Compeditors: [] };
        vm.Grades = gradeEnum.grades;

        vm.GetCompetition = GetCompetition;
        vm.AddCompeditor = AddCompeditor;
        vm.Submit = Submit;

        function GetCompetition() {
            competitionExternalService.GetCompetition(vm.ClubShortName, vm.CompetitionName).success(getCompetitionCallback);

            function getCompetitionCallback(response) {
                vm.Competition = response;
            }
        }

        function AddCompeditor() {
            vm.ContactPerson.Compeditors.push({});
        }

        function Submit() {
            vm.ContactPerson.CompetitionId = vm.Competition.Id;
            competitionExternalService.Submit(vm.ContactPerson).success(submitCallback);

            function submitCallback() {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Tack!')
                        .content('Tack för din anmälan!')
                        .ariaLabel('Tack!')
                        .ok('Ok')
                );
                vm.ContactPerson = { Compeditors: [] };
            }
        }

        vm.GetCompetition();
    }
}(window.angular));