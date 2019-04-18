(function (angular) {
    angular.module('graderaklubb').directive('grade', gradeDirective);

    gradeDirective.$inject = ["$state"];

    function gradeDirective($state) {
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

        gradeController.$inject = ["grading.service"];

        function gradeController(gradingService) {
            var vm = this;

            vm.ShowTechnique = ShowTechnique;
            vm.ExportGrade = ExportGrade;

            function ShowTechnique(id) {
                $state.go('showtechnique', {id: id});
            }

            function ExportGrade() {
                gradingService.ExportGrade(vm.Grade.Id).then(exportGradeCallback);

                function exportGradeCallback(response) {
                    console.log(response);

                    var link = document.createElement("a");
                    link.download = name;
                    link.href = response.data;
                    link.click();
                }
            }
        }

        return directive;
    }
}(window.angular));