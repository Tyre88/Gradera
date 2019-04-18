//LoadCss("modules/competition/admin/css/competition.css");

(function(angular) {
    angular.module('graderaklubb').controller('competitionadminlist', competitionadminlistController);
    angular.module('graderaklubb').controller('editcompetition', editcompetitionController);

    competitionadminlistController.$inject = ["$state", "competition-service", "competition-admin-service", "$mdDialog"];
    editcompetitionController.$inject = ["$state", "$stateParams", "competition-admin-service", "competition-service"];

    function competitionadminlistController($state, competitionService, competitionAdminService, $mdDialog) {
        var vm = this;
        vm.Competitions = [];

        vm.GetCompetitions = GetCompetitions;
        vm.EditCompetition = EditCompetition;
        vm.ExportCompetition = ExportCompetition;
        vm.DeleteCompetition = DeleteCompetition;

        function GetCompetitions() {
            competitionService.GetCompetitions().then(getCompetitionsCallback);

            function getCompetitionsCallback(response) {
                vm.Competitions = response.data;

                for(var i = 0; i < vm.Competitions.length; i++)
                {
                    vm.Competitions[i].Location = JSON.parse(vm.Competitions[i].Location);
                }
            }
        }

        function EditCompetition(id, event) {
            $state.go("editcompetition", {id: id});
        }

        function ExportCompetition(competition) {
            competitionAdminService.ExportCompetition(competition.Id).then(exportCompetitionCallback);

            function exportCompetitionCallback(response) {
                var newLink = angular.element("<a href='/Downloads/Competition/" + response + "' id='" + response + "'></a>");
                newLink.appendTo("body");
                newLink[0].click();
                newLink[0].remove();
                //http://gradera-klubb.local/Downloads/Competition/883a906f-16ad-4775-95ff-dd6f77509c2f.xlsx
            }
        }

        function DeleteCompetition(competition) {
            var confirm = $mdDialog.confirm()
                .title('Är du säker på att du vill ta bort ' + competition.Name + '?')
                .ariaLabel('Ta bort tävling?')
                .ok('Ja')
                .cancel('Nej');

            $mdDialog.show(confirm).then(function() {
                competitionAdminService.DeleteCompetition(competition.Id).then(function() {
                    vm.Competitions.splice(vm.Competitions.indexOf(competition), 1);
                });
            });
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
        vm.RemoveCompeditor = RemoveCompeditor;

        function GetCompetition() {
            competitionService.GetCompetition(vm.CompetitionId).then(getCompetitionCallback);

            function getCompetitionCallback(response) {
                vm.Competition = response.data;
                vm.Competition.Location = JSON.parse(vm.Competition.Location);
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
            vm.Competition.Location = JSON.stringify(vm.Competition.Location);

            competitionAdminService.SaveCompetition(vm.Competition).then(saveCompetitionCallback, saveCompetitionError);

            function saveCompetitionCallback() {
                vm.Back();
            }

            function saveCompetitionError() {

            }
        }

        function AddCategory() {
            competitionAdminService.AddCategory(vm.CompetitionId, vm.NewCategoryName).then(addCategoryCallback);

            function addCategoryCallback(response) {
                vm.Competition.Categories.push({ Id: response.Id, Name: response.Name });
                vm.NewCategoryName = "";
            }
        }

        function DeleteCategory(category) {
            competitionAdminService.DeleteCategory(category.Id).then(deleteCategoryCallback);

            function deleteCategoryCallback() {
                vm.Competition.Categories.splice(vm.Competition.Categories.indexOf(category), 1);
            }
        }

        function RemoveCompeditor(compeditor) {
            if(compeditor.IsExternal === false)
                competitionAdminService.RemoveInternalCompeditor(compeditor.Id).then(RemoveCompeditorCallback);
            else
                competitionAdminService.RemoveExternalCompeditor(compeditor.Id).then(RemoveCompeditorCallback);

            function RemoveCompeditorCallback() {
                vm.Competition.Compeditors.splice(vm.Competition.Compeditors.indexOf(compeditor), 1);
            }
        }

        if(~~vm.CompetitionId > 0)
            vm.GetCompetition();
        else
        {
            vm.Competition.StartDate = new Date();
            vm.Competition.EndDate = new Date();
            vm.Competition.StartSignupDate = new Date();
            vm.Competition.EndSignupDate = new Date();
        }
    }
}(window.angular));