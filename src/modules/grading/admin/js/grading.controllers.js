(function (angular) {
    LoadCss('modules/grading/admin/css/gradingadmin.css');

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

    gradingadmineditController.$inject = ["$state", "$stateParams", "grading-admin-service", "technique-service", "$mdToast", "grading.service", "$mdDialog"];

    function gradingadmineditController($state, $stateParams, gradingAdminService, techniqueService, $mdToast, gradingService, $mdDialog) {
        var vm = this;
        vm.Grade = {};
        vm.GradeId = ~~$stateParams.id;
        vm.Categories = [];
        vm.SelectedCategoryId = 0;
        vm.Techniques = [];
        vm.ShowGlobalTechniques = true;
        vm.SelectedBookletId = 0;
        vm.Booklets = [];

        vm.GetGrade = GetGrade;
        vm.Back = Back;
        vm.Save = Save;
        vm.GetCategories = GetCategories;
        vm.AddCategory = AddCategory;
        vm.GetTechniques = GetTechniques;
        vm.GetCategoryName = GetCategoryName;
        vm.GetGradingBooklets = GetGradingBooklets;
        vm.OpenAddTechniqueDialog = OpenAddTechniqueDialog;

        function GetGrade() {
            if(vm.GradeId <= 0) return;

            gradingAdminService.GetGrade(vm.GradeId).success(getGradeCallback);

            function getGradeCallback(response) {
                vm.Grade = response;
            }
        }

        function Back() {
            $state.go('gradingadminlist');
        }

        function Save() {
            gradingAdminService.SaveGrade(vm.Grade).success(saveGradeCallback);

            function saveGradeCallback(response) {
                vm.Grade = response;

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Bältesgraden sparad!')
                );

            }
        }

        function GetCategories() {
            gradingAdminService.GetCategories().success(getCategoriesCallback);

            function getCategoriesCallback(response) {
                vm.Categories = response;
            }
        }

        function AddCategory() {
            var category = vm.Categories.GetItemByValue('Id', vm.SelectedCategoryId);
            vm.Grade.GradeCategoryLinks.push(
                {
                    GradeCategoryId: category.Id,
                    GradeId: vm.Grade.Id,
                    Text: '',
                    CategoryName: category.Name,
                    GradeCategoryLinkTechniques: []
                });
        }

        function GetTechniques() {
            techniqueService.GetTechniques().success(getTechniquesCallback);

            function getTechniquesCallback(response) {
                vm.Techniques = response;
            }
        }

        function GetCategoryName(categoryId) {
            return vm.Categories.GetItemByValue('Id', categoryId).Name;
        }

        function GetGradingBooklets() {
            gradingService.GetGradingBooklets().success(GetGradingBookletsCallback);

            function GetGradingBookletsCallback(response) {
                vm.Booklets = response;
            }
        }

        function OpenAddTechniqueDialog(categoryLink) {
            $mdDialog.show({
                parent: angular.element(document.body),
                locals: {
                    categoryLink: categoryLink,
                    techniques: vm.Techniques
                },
                templateUrl: "modules/grading/admin/views/addtechniquedialog.html",
                controller: AddTechniqueController,
                controllerAs: "vm",
                bindToController: true,
                fullscreen: true
            });

            AddTechniqueController.$inject = ["$mdDialog"];

            function AddTechniqueController($mdDialog) {
                var vm = this;
                vm.Search = {};

                vm.Ok = Ok;
                vm.Close = Close;
                vm.Initialize = Initialize;

                function Ok() {
                    vm.categoryLink.GradeCategoryLinkTechniques = [];
                    for(var i = 0; i < vm.techniques.length; i++) {
                        if(vm.techniques[i].Checked === true) {
                            vm.categoryLink.GradeCategoryLinkTechniques.push({
                                Id: vm.techniques[i].TempId,
                                Name: vm.techniques[i].Name,
                                TechniqueId: vm.techniques[i].TechniqueId,
                                GradeCategoryLinkId: vm.categoryLink.Id,
                                GradeId: categoryLink.GradeId
                            });
                        }
                    }

                    vm.Close();
                }

                function Close() {
                    $mdDialog.hide();
                }

                function Initialize() {
                    for(var i = 0; i < vm.categoryLink.GradeCategoryLinkTechniques.length; i ++) {
                        var tec = vm.techniques.GetItemByValue('TechniqueId', vm.categoryLink.GradeCategoryLinkTechniques[i].TechniqueId);
                        if(tec != null) {
                            tec.Checked = true;
                            tec.TempId = vm.categoryLink.GradeCategoryLinkTechniques[i].Id;
                        }

                    }
                }

                vm.Initialize();
            }
        }

        vm.GetGrade();
        vm.GetCategories();
        vm.GetTechniques();
        vm.GetGradingBooklets();
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

    angular.module('graderaklubb').controller('editbookletController', editbookletController);

    editbookletController.$inject = ["$state", "$stateParams", "grading-admin-service"];

    function editbookletController($state, $stateParams, gradingAdminService) {
        var vm = this;
        vm.BookletId = ~~$stateParams.id;
        vm.Booklet = {};

        vm.GetGradingBooklet = GetGradingBooklet;
        vm.Save = Save;
        vm.Back = Back;

        function GetGradingBooklet() {
            if(vm.BookletId > 0)
            {
                gradingAdminService.GetGradingBooklet(vm.BookletId).success(GetGradingBookletCallback);
            }

            function GetGradingBookletCallback(response) {
                vm.Booklet = response;
            }
        }

        function Save() {
            gradingAdminService.SaveBooklet(vm.Booklet).success(SaveBookletCallback);

            function SaveBookletCallback() {
                vm.Back();
            }
        }

        function Back() {
            $state.go('listbooklets');
        }

        vm.GetGradingBooklet();
    }
}(window.angular));