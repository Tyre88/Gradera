(function(angular) {
    angular.module("graderaklubbexternal").config(externalRouting);

    externalRouting.$inject = ["$stateProvider", "$urlRouterProvider"];

    function externalRouting($stateProvider, $urlRouterProvider) {
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

        $urlRouterProvider.otherwise('/');
    }
}(window.angular));