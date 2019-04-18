(function(angular) {
    angular.module('graderaklubb').controller('showform', showformController);

    showformController.$inject = ["$rootScope", "$state", "$stateParams", "form", "form-service", "$mdDialog"];

    function showformController($rootScope, $state, $stateParams, form, formService, $mdDialog) {
        var vm = this;
        vm.FormId = ~~$stateParams.formId;
        vm.Form = angular.copy(form.Form);

        vm.GetForm = GetForm;
        vm.SubmitForm = SubmitForm;

        function GetForm() {
            formService.GetForm(vm.FormId).then(getFormCallback);

            function getFormCallback(response) {
                vm.Form.Initialize(response.data);
            }
        }

        function SubmitForm() {
            console.log(vm.Form);
            var formFields = [];
            for(var i = 0; i < vm.Form.FormFields.length; i++)
            {
                formFields.push({Value: vm.Form.FormFields[i].formControl.$modelValue, FormId: vm.FormId, FormFieldId: vm.Form.FormFields[i].key});
            }
            formService.SubmitForm(formFields).then(submitFormCallback);

            function submitFormCallback() {
                var confirm = $mdDialog.confirm()
                    .title('Tack för att du svarade på formuläret!')
                    .ariaLabel('Tack!')
                    .ok('Ok')
                    .cancel('Avbryt');

                $mdDialog.show(confirm).then(function() {
                    $state.go($rootScope.previousState);
                }, function() {
                    $state.go($rootScope.previousState);
                });
            }
        }

        if(vm.FormId > 0)
            vm.GetForm();
    }
}(window.angular));