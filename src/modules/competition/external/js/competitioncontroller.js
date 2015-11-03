/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.controller('showexternalcompetition', showexternalcompetitionController);

        showexternalcompetitionController.$inject = ["$stateParams"];

        function showexternalcompetitionController($stateParams) {
            var vm = this;
            vm.CompetitionId = $stateParams.competitionId;
            vm.ClubShortName = $stateParams.clubShortName;
        }
    });