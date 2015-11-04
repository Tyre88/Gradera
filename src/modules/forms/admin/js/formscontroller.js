/**
 * Created by Victor on 2015-11-04.
 */

'use-strict';

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
        formsadmineditController.$inject = ["$state", "$stateParams", "forms-admin-service", "form"];

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

        function formsadmineditController($state, $stateParams, formsAdminService, form) {
            var vm = this;
            vm.FormId = ~~$stateParams.formId;
            vm.Form = angular.copy(form.Form);

            vm.GetForm = GetForm;

            function GetForm() {
                formsAdminService.GetForm(vm.FormId).success(getFormCallback);

                function getFormCallback(response) {
                    vm.Form.Initialize(response);
                    console.log(vm.Form);
                }
            }

            if(vm.FormId > 0)
                vm.GetForm();
        }
    });