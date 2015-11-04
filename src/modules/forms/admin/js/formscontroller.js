/**
 * Created by Victor on 2015-11-04.
 */

'use-strict';

LoadCss(["modules/forms/admin/css/form-admin.css", "modules/forms/css/form.css"]);

require(
    [
        "app",
        "modules/forms/admin/js/forms-service.js",
        "modules/forms/js/forms-service.js"
    ],
    function (app) {
        app.controller('formsadminlist', formsadminlistController);
        app.controller('formsadminedit', formsadmineditController);

        formsadminlistController.$inject = ["$state", "forms-admin-service", "$mdDialog"];
        formsadmineditController.$inject = ["$scope", "$state", "$stateParams", "forms-admin-service", "form"];

        function formsadminlistController($state, formsAdminService, $mdDialog) {
            var vm = this;
            vm.Forms = [];

            vm.GetForms = GetForms;
            vm.EditForm = EditForm;
            vm.DeleteForm = DeleteForm;

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

            vm.GetForms();
        }

        function formsadmineditController($scope, $state, $stateParams, formsAdminService, form) {
            var vm = this;
            vm.FormId = ~~$stateParams.formId;
            vm.Form = {};
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
    });