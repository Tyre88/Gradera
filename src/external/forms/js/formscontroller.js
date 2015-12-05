(function (angular) {
    angular.module('graderaklubbexternal').controller('showexternalform', showexternalformController);

    showexternalformController.$inject = ["$stateParams", "$mdDialog", "form-external-service", "form"];

    function showexternalformController($stateParams, $mdDialog, formService, form) {
        var vm = this;
        vm.Form = form.Form;
        vm.ClubShortName = $stateParams.clubShortName;
        vm.FormName = $stateParams.formName;

        vm.GetForm = GetForm;
        vm.SubmitForm = SubmitForm;

        function GetForm() {
            formService.GetForm(vm.ClubShortName, vm.FormName).success(getFormCallback);

            function getFormCallback(response) {
                vm.Form.Initialize(response);
            }
        }

        function SubmitForm() {
            var formFields = [];
            for(var i = 0; i < vm.Form.FormFields.length; i++)
            {
                formFields.push({Value: vm.Form.FormFields[i].formControl.$modelValue, FormId: vm.Form.Id, FormFieldId: vm.Form.FormFields[i].key});
            }

            formService.SubmitForm(formFields).success(submitFormCallback);

            function submitFormCallback() {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Tack för att du svarade på formuläret!')
                        .ariaLabel('Tack!')
                        .ok('Ok')
                );
            }
        }

        vm.GetForm();
    }
}(window.angular));