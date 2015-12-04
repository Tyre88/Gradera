(function (angular) {
    angular.module('graderaklubb').controller('gradinglist', gradinglistController);

    gradinglistController.$inject = ["$state", "gradingService"];

    function gradinglistController($state, gradingService) {
        var vm = this;
        vm.Grades = [];

        vm.GetGrades = GetGrades;
        vm.Show = Show;

        function GetGrades() {
            gradingService.GetGrades().success(getGradesCallback);

            function getGradesCallback(response) {
                vm.Grades = response;
            }
        }

        function Show(gradeId) {
            $state.go('showgrade', {gradeId: gradeId});
        }

        vm.GetGrades();
    }

    angular.module('graderaklubb').controller('showgrade', showgradeController);

    showgradeController.$inject = ["$state", "$stateParams"];

    function showgradeController($state, $stateParams) {
        var vm = this;
        vm.GradeId = ~~$stateParams.gradeId;
    }
}(window.angular));