/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

require(
    [
        "appexternal",
        "modules/competition/external/js/competition-service.js"
    ],
    function (appexternal) {
        appexternal.controller('showexternalcompetition', showexternalcompetitionController);

        showexternalcompetitionController.$inject = ["$stateParams", "competition-external-service"];

        function showexternalcompetitionController($stateParams, competitionExternalService) {
            var vm = this;
            vm.Competition = {};
            vm.CompetitionName = $stateParams.competitionName;
            vm.ClubShortName = $stateParams.clubShortName;

            vm.GetCompetition = GetCompetition;

            function GetCompetition() {
                competitionExternalService.GetCompetition(vm.ClubShortName, vm.CompetitionName).success(getCompetitionCallback);

                function getCompetitionCallback(response) {
                    vm.Competition = response;
                }
            }

            vm.GetCompetition();
        }
    });