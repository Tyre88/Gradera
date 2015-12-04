(function (angular) {
    LoadCss('modules/grading/css/grading.css');

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

    showgradeController.$inject = ["$state", "$stateParams", "gradingService"];

    function showgradeController($state, $stateParams, gradingService) {
        var vm = this;
        vm.GradeId = ~~$stateParams.gradeId;
        vm.Grade = {};

        vm.GetGrade = GetGrade;

        function GetGrade() {
            if(vm.GradeId > 0)
            {
                gradingService.GetGrade(vm.GradeId).success(getGradeCallback);

                function getGradeCallback(response) {
                    vm.Grade = response;
                }
            }
        }

        vm.GetGrade();
    }
}(window.angular));