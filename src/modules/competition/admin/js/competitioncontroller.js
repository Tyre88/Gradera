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

        competitionadminlistController.$inject = ["$state", "competition-service", "competition-admin-service"];
        editcompetitionController.$inject = ["$state", "$stateParams", "competition-admin-service", "competition-service"];

        function competitionadminlistController($state, competitionService, competitionAdminService) {
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
                competitionAdminService.ExportCompetition(competition.Id).success(exportCompetitionCallback);

                function exportCompetitionCallback(response) {
                    var newLink = angular.element("<a href='/Downloads/Competition/" + response + "' id='" + response + "'></a>");
                    newLink.appendTo("body");
                    newLink[0].click();
                    newLink[0].remove();
                    //http://gradera-klubb.local/Downloads/Competition/883a906f-16ad-4775-95ff-dd6f77509c2f.xlsx
                }
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
            vm.DeleteCategory = DeleteCategory;

            function GetCompetition() {
                competitionService.GetCompetition(vm.CompetitionId).success(getCompetitionCallback);

                function getCompetitionCallback(response) {
                    vm.Competition = response;
                    vm.Competition.StartDate = new Date(vm.Competition.StartDate);
                    vm.Competition.EndDate = new Date(vm.Competition.EndDate);
                    vm.Competition.StartSignupDate = new Date(vm.Competition.StartSignupDate);
                    vm.Competition.EndSignupDate = new Date(vm.Competition.EndSignupDate);
                }
            }

            function Back() {
                $state.go('competitionadminlist');
            }

            function SaveCompetition() {
                competitionAdminService.SaveCompetition(vm.Competition).success(saveCompetitionCallback);

                function saveCompetitionCallback() {
                    vm.Back();
                }
            }

            function AddCategory() {
                competitionAdminService.AddCategory(vm.CompetitionId, vm.NewCategoryName).success(addCategoryCallback);

                function addCategoryCallback(response) {
                    vm.Competition.Categories.push({ Id: response.Id, Name: response.Name });
                    vm.NewCategoryName = "";
                }
            }

            function DeleteCategory(category) {
                competitionAdminService.DeleteCategory(category.Id).success(deleteCategoryCallback);

                function deleteCategoryCallback() {
                    vm.Competition.Categories.splice(vm.Competition.Categories.indexOf(category), 1);
                }
            }

            if(~~vm.CompetitionId > 0)
                vm.GetCompetition();
        }
    });