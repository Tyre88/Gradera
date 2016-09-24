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
        vm.DeleteCompeditor = DeleteCompeditor;
        vm.GetDate = GetDate;

        function GetCompetition() {
            competitionExternalService.GetCompetition(vm.ClubShortName, vm.CompetitionName).success(getCompetitionCallback);

            function getCompetitionCallback(response) {
                vm.Competition = response;

                if(vm.Competition.IsClubCompetition)
                    vm.AddCompeditor();
            }
        }

        function AddCompeditor() {
            vm.ContactPerson.Compeditors.push({
                BirthYear: "",
                FirstName: "",
                LastName: "",
                Weight: "",
                Grade: vm.Grades[0].Id
            });
        }

        function Submit() {
            vm.ContactPerson.CompetitionId = vm.Competition.Id;
            competitionExternalService.Submit(vm.ContactPerson).success(submitCallback).error(submitError);

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

            function submitError() {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Fel!')
                        .content('Ett fel uppstod! Kontrollera att du har fyllt i alla uppgifter.')
                        .ariaLabel('Fel!')
                        .ok('Ok')
                );
            }
        }

        function DeleteCompeditor(compeditor) {
            vm.ContactPerson.Compeditors.splice(vm.ContactPerson.Compeditors.indexOf(compeditor), 1);
        }

        function GetDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm');
        }

        vm.GetCompetition();
    }

    angular.module('graderaklubbexternal').controller('showexternalcompetitionparticipants', showexternalcompetitionparticipantsController);

    showexternalcompetitionparticipantsController.$inject = ["$stateParams", "competition-external-service", "gradeEnum"];

    function showexternalcompetitionparticipantsController($stateParams, competitionExternalService, gradeEnum) {
        var vm = this;
        vm.CompetitionName = $stateParams.competitionName;
        vm.ClubShortName = $stateParams.clubShortName;

        vm.Participants = [];

        vm.GetParticipants = GetParticipants;
        vm.GetGrade = GetGrade;

        function GetParticipants() {
            competitionExternalService.GetCompetitionCompeditors(vm.ClubShortName, vm.CompetitionName).success(GetCompetitionCompeditorsSuccess);

            function GetCompetitionCompeditorsSuccess(response) {
                vm.Participants = response;
            }
        }

        function GetGrade(grade) {
            if(gradeEnum.grades.GetItemByValue('Id', grade) != null)
                return gradeEnum.grades.GetItemByValue('Id', grade).Name;
            else
                return "Ej tillgänglig";
        }

        vm.GetParticipants();
    }
}(window.angular));