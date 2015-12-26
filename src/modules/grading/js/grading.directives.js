(function (angular) {
    angular.module('graderaklubb').directive('grade', gradeDirective);

    gradeDirective.$inject = [];

    function gradeDirective() {
        var directive = {
            restrict: "E",
            scope: {
                Grade: "=grade"
            },
            controller: gradeController,
            controllerAs: "vm",
            bindToController: true,
            templateUrl: "modules/grading/views/grade.html"
        };

        gradeController.$inject = [];

        function gradeController() {
            var vm = this;
        }

        return directive;
    }
}(window.angular));