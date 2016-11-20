(function (angular) {
    angular.module('graderaklubbexternal').controller('showexternalform', showexternalformController);

    showexternalformController.$inject = ["$stateParams", "$mdDialog", "form-external-service", "form", "clubService"];

    function showexternalformController($stateParams, $mdDialog, formService, form, clubService) {
        var vm = this;
        vm.Form = form.Form;
        vm.OriginalForm = undefined;
        vm.ClubShortName = $stateParams.clubShortName;
        vm.FormName = $stateParams.formName;
        vm.ClubInformation = {};
        vm.Forms = [];

        vm.GetForm = GetForm;
        vm.SubmitForm = SubmitForm;
        vm.SubmitForms = SubmitForms;
        vm.GetClubInformation = GetClubInformation;

        function GetForm() {
            formService.GetForm(vm.ClubShortName, vm.FormName).success(getFormCallback);

            function getFormCallback(response) {
                vm.Form.Initialize(response);
                vm.OriginalForm = angular.copy(vm.Form);
                vm.Forms.push(vm.Form);
            }
        }

        function SubmitForm(form) {
            var formFields = [];
            for(var i = 0; i < form.FormFields.length; i++)
            {
                formFields.push({Value: form.FormFields[i].formControl.$modelValue, FormId: form.Id, FormFieldId: form.FormFields[i].key});
            }

            formService.SubmitForm(formFields).success(submitFormCallback);

            function submitFormCallback() {
                /*$mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Tack för att du svarade på formuläret!')
                        .ariaLabel('Tack!')
                        .ok('Ok')
                );*/
            }
        }

        function SubmitForms() {
            for(let i = 0; i < vm.Forms.length; i++) {
                vm.SubmitForm(vm.Forms[i]);
            }
        }

        function GetClubInformation() {
            clubService.GetClubInformation(vm.ClubShortName).success(GetClubInformationSuccess);

            function GetClubInformationSuccess(response) {
                vm.ClubInformation = response;
            }
        }

        vm.GetForm();
        vm.GetClubInformation();
    }
}(window.angular));