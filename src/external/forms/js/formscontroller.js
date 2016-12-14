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
        vm.HasExpired = false;

        vm.GetForm = GetForm;
        vm.SubmitForm = SubmitForm;
        vm.SubmitForms = SubmitForms;
        vm.GetClubInformation = GetClubInformation;
        vm.AddSubmit = AddSubmit;
        vm.DownloadExampleExcel = DownloadExampleExcel;
        vm.ImportExcelFile = ImportExcelFile;

        function GetForm() {
            formService.GetForm(vm.ClubShortName, vm.FormName).success(getFormCallback).error(function() {
                vm.HasExpired = true;
            });

            function getFormCallback(response) {
                vm.Form.Initialize(response);
                vm.OriginalForm = angular.copy(vm.Form);
                vm.Forms.push(vm.Form);
            }
        }

        function SubmitForm(form) {
            if(vm.Forms[0].form.$invalid) {

                var errorFields = "<ul>";

                for(var i = 0; i < vm.Forms[0].form.$error.required.length; i++) {
                    errorFields += "<li>" + vm.Forms[0].form.$error.required[i].$name + "</li>";
                }

                errorFields += "</ul>";

                var alert = $mdDialog.alert({
                    title: 'FEL!',
                    htmlContent: 'Vänligen fyll i alla fält som är nödvändiga:' + errorFields,
                    ok: 'Stäng'
                });

                $mdDialog
                    .show( alert )
                    .finally(function() {
                        alert = undefined;
                    });

                return;
            }

            var formFields = [];
            for(var i = 0; i < form.FormFields.length; i++)
            {
                if(form.FormFields[i].type == "upload") {
                    formFields.push({Value: form.FormFields[i].formControl.$modelValue.newName, FormId: form.Id, FormFieldId: form.FormFields[i].key});
                }
                else {
                    formFields.push({Value: form.FormFields[i].formControl.$modelValue, FormId: form.Id, FormFieldId: form.FormFields[i].key});
                }
            }

            formService.SubmitForm(formFields).success(submitFormCallback);

            function submitFormCallback() {
                vm.Forms.splice(vm.Forms.indexOf(form), 1);

                if(vm.Forms.length <= 0) {
                    vm.Forms.push(vm.OriginalForm);

                    $mdDialog.show(
                     $mdDialog.alert()
                     .clickOutsideToClose(true)
                     .title('Tack för att du svarade på formuläret!')
                     .ariaLabel('Tack!')
                     .ok('Ok')
                    );
                }
            }
        }

        function SubmitForms() {
            for(var i = 0; i < vm.Forms.length; i++) {
                vm.SubmitForm(vm.Forms[i]);
            }
        }

        function AddSubmit() {
            var newForm = angular.copy(vm.OriginalForm);

            for(var i = 0; i < newForm.FormFields.length; i++)
            {
                if(newForm.FormFields[i].data.CanMultiply == true) {
                }
                else {
                    newForm.FormFields[i].defaultValue = vm.Forms[0].FormFields[i].value();
                    //newForm.FormFields[i].templateOptions.disabled = true;
                }
            }

            vm.Forms.push(newForm);
        }

        function GetClubInformation() {
            clubService.GetClubInformation(vm.ClubShortName).success(GetClubInformationSuccess);

            function GetClubInformationSuccess(response) {
                vm.ClubInformation = response;
            }
        }

        function DownloadExampleExcel() {
            var link = document.createElement("a");
            link.href = "/Downloads/Forms/" + vm.OriginalForm.ExampleExcelPath;
            link.click();
        }

        function ImportExcelFile() {
            $mdDialog.show({
                parent: angular.element(document.body),
                templateUrl: "external/forms/views/excelimport.html",
                controller: ImportExcelController,
                controllerAs: "vm",
                bindToController: true
            });

            ImportExcelController.$inject= ["$mdDialog"];

            function ImportExcelController($mdDialog) {
                var vm = this;

                vm.DoImport = DoImport;
                vm.Close = Close;

                function DoImport() {

                    vm.Close();
                }

                function Close() {
                    $mdDialog.hide();
                }
            }
        }

        vm.GetForm();
        vm.GetClubInformation();
    }
}(window.angular));