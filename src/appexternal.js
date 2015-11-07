(function(angular) {
    angular.module("graderaklubbexternal", ['ng', 'ngRoute', 'ui.router', 'ui.bootstrap', 'ngMaterial'])
        .controller('home', homeController);

    function homeController() {
        var vm = this;
        vm.Test = "Hello world";
        console.log("LALA");
    }

    $(document).ready(function () {
        angular.bootstrap(document, ["graderaklubbexternal"]);
    });
}(window.angular));