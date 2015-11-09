(function (angular) {
    angular.module('graderaklubb').controller('gradingadminlist', gradingadminlistController);

    gradingadminlistController.$inject = ["grading-admin-service"];

    function gradingadminlistController(gradingAdminService) {
        var vm = this;
        vm.Grades = [];

        vm.GetGrades = GetGrades;

        function GetGrades() {
            gradingAdminService.GetGrades().success(getGradesCallback);

            function getGradesCallback(response) {
                vm.Grades = response;
            }
        }

        vm.GetGrades();
    }

    angular.module('graderaklubb').controller('gradingcategoryadminlist', gradingcategoryadminlistController);

    gradingcategoryadminlistController.$inject = [];

    function gradingcategoryadminlistController() {
        var vm = this;
    }
}(window.angular));