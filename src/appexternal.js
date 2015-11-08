LoadCss(["content/css/external.css"]);
(function(angular) {
    angular.module("graderaklubbexternal", ['ng', 'ngRoute', 'ui.router', 'ngMaterial'])
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