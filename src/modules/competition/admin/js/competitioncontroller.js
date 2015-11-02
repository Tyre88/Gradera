/**
 * Created by Victor on 2015-11-01.
 */

'use-strict';

LoadCss("modules/competition/admin/css/competition.css");

require(
    [
        "app",
        "modules/competition/admin/js/competition-service.js",
        "modules/competition/js/competition-service.js"
    ],
    function (app) {
        app.controller('competitionadminlist', competitionadminlistController);
        app.controller('editcompetition', editcompetitionController);

        competitionadminlistController.$inject = ["$state", "competition-service"];
        editcompetitionController.$inject = ["$state", "$stateParams", "competition-admin-service", "competition-service"];

        function competitionadminlistController($state, competitionService) {
            var vm = this;
            vm.Competitions = [];
            vm.GetCompetitions = GetCompetitions;
            vm.EditCompetition = EditCompetition;
            vm.ExportCompetition = ExportCompetition;

            function GetCompetitions() {
                competitionService.GetCompetitions().success(getCompetitionsCallback);

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

        function editcompetitionController($state, $stateParams, competitionAdminService, competitionService) {
            var vm = this;
            vm.CompetitionId = $stateParams.id;
            vm.Competition = {};

            vm.GetCompetition = GetCompetition;
            vm.Back = Back;
            vm.SaveCompetition = SaveCompetition;
            vm.AddCategory = AddCategory;

            function GetCompetition() {
                competitionService.GetCompetition(vm.CompetitionId).success(getCompetitionCallback);

                function getCompetitionCallback(response) {
                    vm.Competition = response;
                    vm.Competition.StartDate = new Date(vm.Competition.StartDate);
                    vm.Competition.EndDate = new Date(vm.Competition.EndDate);
                    vm.Competition.EndSignupDate = new Date(vm.Competition.EndSignupDate);
                }
            }

            function Back() {
                $state.go('competitionadminlist');
            }

            function SaveCompetition() {

            }

            function AddCategory() {
                vm.Competition.Categories.push({ Id: -1, Name: vm.NewCategoryName });
                vm.NewCategoryName = "";
            }

            if(~~vm.CompetitionId > 0)
                vm.GetCompetition();
        }
    });