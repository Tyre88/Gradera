LoadCss(["modules/forms/admin/css/form-admin.css", "modules/forms/css/form.css"]);

(function(angular) {
    angular.module('graderaklubb').controller('formsadminlist', formsadminlistController);
    angular.module('graderaklubb').controller('formsadminedit', formsadmineditController);
    angular.module('graderaklubb').controller('formanswers', formanswersController);
    angular.module('graderaklubb').controller('formanswersexternal', formanswersexternalController);

    formsadminlistController.$inject = ["$state", "forms-admin-service", "$mdDialog"];
    formsadmineditController.$inject = ["$scope", "$state", "$stateParams", "forms-admin-service", "form", "$mdDialog"];
    formanswersController.$inject = ["$state", "$stateParams", "forms-admin-service"];
    formanswersexternalController.$inject = ["$state", "$stateParams", "forms-admin-service"];

    function formsadminlistController($state, formsAdminService, $mdDialog) {
        var vm = this;
        vm.Forms = [];

        vm.GetForms = GetForms;
        vm.EditForm = EditForm;
        vm.DeleteForm = DeleteForm;
        vm.FormAnswers = FormAnswers;

        function GetForms() {
            formsAdminService.GetForms().success(getFormsCallback);

            function getFormsCallback(response) {
                vm.Forms = response;
            }
        }

        function EditForm(formId) {
            $state.go('formsadminedit', {formId: formId});
        }

        function DeleteForm(form) {
            var confirm = $mdDialog.confirm()
                .title('Ta bort formulär?')
                .content('Är du säker på att du vill ta bort ' + form.Name + '?')
                .ariaLabel('Ta bort formulär?')
                .ok('Ja')
                .cancel('Nej');

            $mdDialog.show(confirm).then(function() {
                formsAdminService.DeleteForm(form.Id).success(function() {
                    vm.Forms.splice(vm.Forms.indexOf(form), 1);
                });
            });
        }

        function FormAnswers(form) {
            if(form.IsExternal)
                $state.go('formanswersexternal', {formId: form.Id});
            else
                $state.go('formanswers', {formId: form.Id});
        }

        vm.GetForms();
    }

    function formsadmineditController($scope, $state, $stateParams, formsAdminService, form, $mdDialog) {
        var vm = this;
        vm.FormId = ~~$stateParams.formId;
        vm.Form = {Emails: []};
        vm.PreviewForm = angular.copy(form.Form);
        vm.NewField = {
            ClassName: "form-field-hundred",
            Type: "input",
            Options: []
        };
        vm.ShowSelectOptions = false;
        vm.NewFormFieldOption = {
            Name: "",
            GroupName: ""
        };

        vm.model = {};
        vm.options = {};

        vm.GetForm = GetForm;
        vm.AddFormField = AddFormField;
        vm.AddFormFieldOption = AddFormFieldOption;
        vm.SubmitForm = SubmitForm;
        vm.SaveForm = SaveForm;
        vm.Back = Back;
        vm.DeleteOption = DeleteOption;
        vm.ShowPreviewForm = ShowPreviewForm;
        vm.ClosePreview = ClosePreview;
        vm.DeleteFormFieldItem = DeleteFormFieldItem;
        vm.AddEmail = AddEmail;

        function GetForm() {
            formsAdminService.GetForm(vm.FormId).success(getFormCallback);

            function getFormCallback(response) {
                vm.Form = response;
                vm.Form.StartDate = new Date(vm.Form.StartDate);
                vm.Form.EndDate = new Date(vm.Form.EndDate);

                vm.PreviewForm.Initialize(vm.Form);
            }
        }

        function AddFormField() {
            if(vm.Form.FormFields == undefined)
                vm.Form.FormFields = [];

            vm.NewField.Id = "tempId-" + vm.Form.FormFields.length;
            vm.Form.FormFields.push(vm.NewField);
            vm.PreviewForm.Initialize(vm.Form);

            vm.NewField = {
                ClassName: "form-field-hundred",
                Type: "input",
                Options: []
            };
        }

        function AddFormFieldOption() {
            vm.NewFormFieldOption.Id = "tempId-" + vm.NewField.Options.length;
            vm.NewField.Options.push(vm.NewFormFieldOption);
            vm.NewFormFieldOption = {
                Name: "",
                GroupName: ""
            };
        }

        function SubmitForm() {
            console.log("Form!", vm.PreviewForm.FormFields);
        }

        function SaveForm() {
            formsAdminService.SaveForm(vm.Form).success(saveFormcallback);

            function saveFormcallback() {
                vm.Back()
            }
        }

        function Back() {
            $state.go('formsadminlist');
        }

        function DeleteOption(option) {
            vm.NewField.Options.splice(vm.NewField.Options.indexOf(option), 1);
        }

        function ShowPreviewForm() {
            $mdDialog.show({
                controller: "formsadminedit",
                controllerAs: "vm",
                templateUrl: 'modules/forms/admin/views/previewform.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
        }

        function ClosePreview() {
            $mdDialog.hide();
        }

        function DeleteFormFieldItem(item) {
            var confirm = $mdDialog.confirm()
                .title('Ta bort fält?')
                .content('Är du säker på att du vill ta bort fältet: ' + item.Label + '?')
                .ariaLabel('Ta bort fält?')
                .ok('Ja')
                .cancel('Nej');

            $mdDialog.show(confirm).then(function() {
                if(item.Id > 0) {
                    formsAdminService.DeleteFormFieldItem(item.Id);
                }

                vm.Form.FormFields.splice(vm.Form.FormFields.indexOf(item), 1);
            });
        }

        function AddEmail() {
            vm.Form.Emails.push({Email: vm.Email});
            vm.Email = "";
        }

        if(vm.FormId > 0)
            vm.GetForm();

        $scope.$watch('vm.NewField.Type', function(newVal, oldVal) {
            if(newVal == "select")
            {
                vm.ShowSelectOptions = true;
            }
            else
            {
                vm.ShowSelectOptions = false;
            }
        })
    }

    function formanswersController($state, $stateParams, formsAdminService) {
        var vm = this;
        vm.FormId = ~~$stateParams.formId;
        vm.UserAnswers = [];

        vm.GetUserAnswers = GetUserAnswers;

        function GetUserAnswers() {
            formsAdminService.GetUserAnswers(vm.FormId).success(getUserAnswersCallback);

            function getUserAnswersCallback(response) {
                vm.UserAnswers = response;
            }
        }

        if(vm.FormId > 0)
            vm.GetUserAnswers();
    }

    function formanswersexternalController($state, $stateParams, formsAdminService) {
        var vm = this;
        vm.FormId = ~~$stateParams.formId;
        vm.Answers = [];

        vm.GetAnswers = GetAnswers;

        function GetAnswers() {
            formsAdminService.GetExternalAnswers(vm.FormId).success(getExternalAnswersCallback);

            function getExternalAnswersCallback(response) {
                vm.Answers = response;
            }
        }

        if(vm.FormId > 0)
            vm.GetAnswers();
    }
}(window.angular));