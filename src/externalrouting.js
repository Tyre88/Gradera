/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

require(
    [
        "appexternal"
    ],
    function (appexternal) {
        appexternal.config(
            [
                "$stateProvider",
                "$urlRouterProvider",
                function($stateProvider, $urlRouterProvider) {
                    $stateProvider
                        .state('home',
                        {
                            url: "/",
                            template: "TEST",
                            controller: "home",
                            controllerAs: "vm"
                        })
                        .state('showexternalcompetition',
                        {
                            url: "/show/competition/:clubShortName/:competitionName",
                            templateUrl: "modules/competition/external/views/showcompetition.html",
                            controller: "showexternalcompetition",
                            controllerAs: "vm"
                        });
                }
            ]
        );
    });