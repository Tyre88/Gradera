/**
 * Created by Victor on 2015-11-01.
 */

'use-strict';

require(
    [
        "app",
        "modules/competition/admin/js/competition-service.js"
    ],
    function (app) {
        app.controller('competitionadminlist', competitionadminlistController);
        app.controller('editcompetition', editcompetitionController);

        competitionadminlistController.$inject = ["$state", "competition-admin-service"];
        editcompetitionController.$inject = ["$state", "$stateParams", "competition-admin-service"];

        function competitionadminlistController($state, competitionAdminService) {
            var vm = this;
            vm.Competitions = [];
            vm.GetCompetitions = GetCompetitions;
            vm.EditCompetition = EditCompetition;
            vm.ExportCompetition = ExportCompetition;

            function GetCompetitions() {
                competitionAdminService.GetCompetitions().success(getCompetitionsCallback);

                function getCompetitionsCallback(response) {
                    vm.Competitions = response;
                }
            }

            function EditCompetition(id, event) {
                $state.go("editcompetition", {id: id});
            }

            function ExportCompetition(competition) {

            }

            vm.GetCompetitions();
        }

        function editcompetitionController($state, $stateParams, competitionAdminService) {
            var vm = this;
            vm.CompetitionId = $stateParams.id;
            vm.Competition = {};

            vm.GetCompetition = GetCompetition;
            vm.Back = Back;

            function GetCompetition() {
                competitionAdminService.GetCompetition(vm.CompetitionId).success(getCompetitionCallback);

                function getCompetitionCallback(response) {
                    vm.Competition = response;
                    //vm.Competition.StartDate = moment(vm.Competition.StartDate).format();
                }
            }

            function Back() {
                $state.go('competitionadminlist');
            }

            if(~~vm.CompetitionId > 0)
                vm.GetCompetition();
        }
    });