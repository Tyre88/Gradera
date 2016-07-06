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
                templateUrl: "external/competition/views/showcompetition.html",
                controller: "showexternalcompetition",
                controllerAs: "vm"
            })
            .state('showexternalform',
            {
                url: "/show/form/:clubShortName/:formName",
                templateUrl: "external/forms/views/showform.html",
                controller: "showexternalform",
                controllerAs: "vm"
            })
            .state('unsubscribe',
            {
                url: "/unsubscribe/:guid",
                templateUrl: "external/newsletter/views/unsubscribe.html",
                controller: "external.newsletter.unsubscribe",
                controllerAs: "vm"
            });

        $urlRouterProvider.otherwise('/');
    }
}(window.angular));