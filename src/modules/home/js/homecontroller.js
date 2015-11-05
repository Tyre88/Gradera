/**
 * Created by Victor on 2015-11-05.
 */

'use-strict';

LoadCss("modules/home/css/home.css");

require(
    [
        "app",
        "modules/home/js/home-service.js",
        "modules/competition/js/competition-service.js"
    ],
    function (app) {
        app.controller('home', homeController);

        homeController.$inject = ["$rootScope", "$state", "competition-service"];

        function homeController($rootScope, $state, competitionService) {
            var vm = this;
            vm.UpcommingCompetitions = [];

            vm.GetUpcommingCompetitions = GetUpcommingCompetitions;
            vm.GoToCompetition = GoToCompetition;

            function GetUpcommingCompetitions() {
                competitionService.GetUpcommingCompetitions(3).success(getUpcommingCompetitionsCallback);

                function getUpcommingCompetitionsCallback(response) {
                    vm.UpcommingCompetitions = response;
                }
            }

            function GoToCompetition(competitionId) {
                $state.go('showcompetition', {id: competitionId});
            }

            if($rootScope.HasAccess(5, 10))
                vm.GetUpcommingCompetitions();
        }
    });