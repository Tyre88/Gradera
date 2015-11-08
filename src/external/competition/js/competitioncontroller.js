/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

(function(angular) {
    angular.module('graderaklubbexternal').controller('showexternalcompetition', showexternalcompetitionController);

    showexternalcompetitionController.$inject = ["$stateParams", "competition-external-service", "gradeEnum"];

    function showexternalcompetitionController($stateParams, competitionExternalService, gradeEnum) {
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
            competitionExternalService.Submit(vm.ContactPerson).success(submitCallback);

            function submitCallback(response) {

            }
        }

        vm.GetCompetition();
    }
}(window.angular));