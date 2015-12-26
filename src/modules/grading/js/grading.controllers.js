(function (angular) {
    LoadCss('modules/grading/css/grading.css');

    angular.module('graderaklubb').controller('gradinglist', gradinglistController);

    gradinglistController.$inject = ["$state", "gradingService"];

    function gradinglistController($state, gradingService) {
        var vm = this;
        vm.Grades = [];
        vm.Booklets = [];

        vm.GetGradesWithoutBooklet = GetGradesWithoutBooklet;
        vm.GetGradingBooklets = GetGradingBooklets;
        vm.Show = Show;
        vm.ShowBooklet = ShowBooklet;

        function GetGradesWithoutBooklet() {
            gradingService.GetGradesWithoutBooklet().success(getGradesCallback);

            function getGradesCallback(response) {
                vm.Grades = response;
            }
        }

        function GetGradingBooklets() {
            gradingService.GetGradingBooklets().success(GetGradingBookletsCallback);

            function GetGradingBookletsCallback(response) {
                vm.Booklets = response;
            }
        }

        function Show(gradeId) {
            $state.go('showgrade', {gradeId: gradeId});
        }

        function ShowBooklet(bookletId) {
            $state.go('showbooklet', {id: bookletId});
        }

        vm.GetGradesWithoutBooklet();
        vm.GetGradingBooklets();
    }

    angular.module('graderaklubb').controller('showgrade', showgradeController);

    showgradeController.$inject = ["$state", "$stateParams", "gradingService"];

    function showgradeController($state, $stateParams, gradingService) {
        var vm = this;
        vm.GradeId = ~~$stateParams.gradeId;
        vm.Grade = {};

        vm.GetGrade = GetGrade;
        vm.ShowTechnique = ShowTechnique;
        vm.ExportGrade = ExportGrade;

        function GetGrade() {
            if(vm.GradeId > 0)
            {
                gradingService.GetGrade(vm.GradeId).success(getGradeCallback);
            }

            function getGradeCallback(response) {
                vm.Grade = response;
            }
        }

        function ShowTechnique(id) {
            $state.go('showtechnique', {id: id});
        }

        function ExportGrade() {
            gradingService.ExportGrade(vm.GradeId).success(exportGradeCallback);

            function exportGradeCallback(response) {
                console.log(response);
            }
        }

        vm.GetGrade();
    }

    angular.module('graderaklubb').controller('showbookletController', showbookletController);

    showbookletController.$inject = ["$state", "$stateParams", "gradingService"];

    function showbookletController($state, $stateParams, gradingService) {
        var vm = this;
        vm.BookletId = ~~$stateParams.id;
        vm.Booklet = {};

        vm.GetGradingBooklet = GetGradingBooklet;

        function GetGradingBooklet() {
            if(vm.BookletId > 0)
            {
                gradingService.GetGradingBooklet(vm.BookletId).success(GetGradingBookletCallback);
            }

            function GetGradingBookletCallback(response) {
                vm.Booklet = response;
            }
        }

        vm.GetGradingBooklet();
    }

    angular.module('graderaklubb').controller('listbookletsController', listbookletsController);

    listbookletsController.$inject = ["$state", "gradingService"];

    function listbookletsController($state, gradingService) {
        var vm = this;
        vm.Booklets = [];

        vm.GetBooklets = GetBooklets;
        vm.Edit = Edit;

        function GetBooklets() {
            gradingService.GetGradingBooklets().success(GetGradingBookletsCallback);

            function GetGradingBookletsCallback(response) {
                vm.Booklets = response;
            }
        }

        function Edit(bookletId) {
            $state.go('editbooklet', {id: bookletId});
        }

        vm.GetBooklets();
    }
}(window.angular));