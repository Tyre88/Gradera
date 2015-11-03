/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.config(
            [
                "$stateProvider",
                "$urlRouterProvider",
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider.state('showexternalcompetition',
                        {
                            url: "/external/show/competition/:clubShortName/:competitionName",
                            templateUrl: "modules/competition/external/views/showcompetition.html",
                            controller: "showexternalcompetition",
                            controllerAs: "vm"
                        });
                }
            ]
        )
    });