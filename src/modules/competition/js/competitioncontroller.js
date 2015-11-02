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
        showcompetitionController.$inject = ["competition-service", "$state"];

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

        function showcompetitionController(competitionService, $state) {

        }
    });