LoadCss(["content/css/external.css"]);
(function(angular) {
    angular.module("graderaklubbexternal", ['ng', 'ngRoute', 'ui.router', 'ngMaterial', 'angular-loading-bar'])
        .controller('home', homeController);

    angular.module("graderaklubbexternal").config(externalConfig);

    externalConfig.$inject = ["cfpLoadingBarProvider"];

    function homeController() {
        var vm = this;
        vm.Test = "Hello world";
        console.log("LALA");
    }

    function externalConfig(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 250;
        cfpLoadingBarProvider.spinnerTemplate = '<div class="loader md-whiteframe-z1">Laddar...</div>';
    }

    $(document).ready(function () {
        angular.bootstrap(document, ["graderaklubbexternal"]);
    });
}(window.angular));