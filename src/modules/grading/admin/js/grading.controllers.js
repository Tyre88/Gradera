(function (angular) {
    angular.module('graderaklubb').controller('gradingadminlist', gradingadminlistController);

    gradingadminlistController.$inject = ["$state", "grading-admin-service"];

    function gradingadminlistController($state, gradingAdminService) {
        var vm = this;
        vm.Grades = [];

        vm.GetGrades = GetGrades;
        vm.Edit = Edit;

        function GetGrades() {
            gradingAdminService.GetGrades().success(getGradesCallback);

            function getGradesCallback(response) {
                vm.Grades = response;
            }
        }

        function Edit(id) {
            $state.go('gradingadminedit', {id: id});
        }

        vm.GetGrades();
    }

    angular.module('graderaklubb').controller('gradingadminedit', gradingadmineditController);

    gradingadmineditController.$inject = [];

    function gradingadmineditController() {
        var vm = this;
    }

    angular.module('graderaklubb').controller('gradingcategoryadminlist', gradingcategoryadminlistController);

    gradingcategoryadminlistController.$inject = ["$state", "grading-admin-service"];

    function gradingcategoryadminlistController($state, gradingAdminService) {
        var vm = this;
        vm.Categories = [];

        vm.GetCategories = GetCategories;
        vm.Edit = Edit;

        function GetCategories() {
            gradingAdminService.GetCategories().success(getCategoriesCallback);

            function getCategoriesCallback(response) {
                vm.Categories = response;
            }
        }

        function Edit(id) {
            $state.go('gradingcategoryadminedit', {id: id});
        }

        vm.GetCategories();
    }

    angular.module('graderaklubb').controller('gradingcategoryadminedit', gradingcategoryadmineditController);

    gradingcategoryadmineditController.$inject = ["$state", "$stateParams", "grading-admin-service"];

    function gradingcategoryadmineditController($state, $stateParams, gradingAdminService) {
        var vm = this;
        vm.CategoryId = ~~$stateParams.id;
        vm.Category = {};

        vm.GetCategory = GetCategory;
        vm.Back = Back;
        vm.Save = Save;

        function GetCategory() {
            if(vm.CategoryId <= 0)
                return;

            gradingAdminService.GetCategory(vm.CategoryId).success(getCategoryCallback);

            function getCategoryCallback(response) {
                vm.Category = response;
            }
        }

        function Back() {
            $state.go('gradingcategoryadminlist');
        }

        function Save() {
            gradingAdminService.SaveGradingCategory(vm.Category).success(saveGradingCategoryCallback);

            function saveGradingCategoryCallback() {
                vm.Back();
            }
        }

        vm.GetCategory();
    }
}(window.angular));