/**
 * Created by Victor on 2015-11-01.
 */

'use-strict';

require(
    [
        "app",
        "modules/competition/js/competition-service.js"
    ],
    function (app) {
        app.controller('competitionlist', competitionlistController);
        app.controller('showcompetition', showcompetitionController);

        competitionlistController.$inject = ["competition-service", "$state"];
        showcompetitionController.$inject = ["competition-service", "$state", "$stateParams"];

        function competitionlistController(competitionService, $state) {
            var vm = this;
            vm.Competitions = [];

            vm.GetCompetitions = GetCompeitions;
            vm.ShowCompetition = ShowCompetition;

            function GetCompeitions() {
                competitionService.GetCompetitions().success(getCompetitionsCallback);

                function getCompetitionsCallback(response) {
                    vm.Competitions = response;
                }
            }

            function ShowCompetition(competitionId) {
                $state.go('showcompetition', {id: competitionId});
            }

            vm.GetCompetitions();
        }

        function showcompetitionController(competitionService, $state, $stateParams) {
            var vm = this;

            vm.Competition = {};
            vm.CompetitionId = ~~$stateParams.id;
            vm.SelectedCategory = 0;

            vm.GetCompetition = GetCompetition;
            vm.Back = Back;
            vm.Signup = Signup;
            vm.IsActive = IsActive;

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
                $state.go('competitionlist');
            }

            function Signup() {

            }

            function IsActive() {
                var now = new Date();
                return vm.Competition.StartSignupDate < now && vm.Competition.EndSignupDate > now;
            }

            if(vm.CompetitionId > 0)
                vm.GetCompetition();
        }
    });