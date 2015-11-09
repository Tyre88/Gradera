(function (angular) {
    angular.module('graderaklubb').controller('techniqueadminlist', techniqueadminlistController);

    techniqueadminlistController.$inject = [];

    function techniqueadminlistController() {
        var vm = this;
    }

    angular.module('graderaklubb').controller('techniquetypeadminlist', techniquetypeadminlistController);

    techniquetypeadminlistController.$inject = [];

    function techniquetypeadminlistController() {
        var vm = this;
    }
}(window.angular));