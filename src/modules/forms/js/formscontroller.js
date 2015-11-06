/**
 * Created by Victor on 2015-11-06.
 */

'use-strict';

require(
    [
        "app",
        "modules/forms/js/forms-service.js"
    ],
    function (app) {
        app.controller('showform', showformController);

        showformController.$inject = ["$stateParams", "form", "form-service"];

        function showformController($stateParams, form, formService) {
            var vm = this;
            vm.FormId = ~~$stateParams.formId;
            vm.Form = angular.copy(form.Form);

            vm.GetForm = GetForm;
            vm.SubmitForm = SubmitForm;

            function GetForm() {
                formService.GetForm(vm.FormId).success(getFormCallback);

                function getFormCallback(response) {
                    vm.Form.Initialize(response);
                }
            }

            function SubmitForm() {
                var formFields = [];
                for(var i = 0; i < vm.Form.FormFields.length; i++)
                {
                    formFields.push({Value: vm.Form.FormFields[i].formControl.$modelValue, FormId: vm.FormId});
                }
                formService.SubmitForm(formFields).success(submitFormCallback);

                function submitFormCallback(response) {

                }
            }

            if(vm.FormId > 0)
                vm.GetForm();
        }
    });