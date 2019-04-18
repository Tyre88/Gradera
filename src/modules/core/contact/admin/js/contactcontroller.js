(function (angular) {
    angular.module('graderaklubb').controller('core.contact.admin.list', listController);
    angular.module('graderaklubb').controller('core.contact.admin.edit', editController);
    angular.module('graderaklubb').controller('core.contact.admin.csvimport', csvimportController);

    listController.$inject = ["$rootScope", "$state", "core.contact.admin.service", "$mdDialog", "pagingValues"];
    editController.$inject = ["$state", "$stateParams", "core.contact.admin.service"];
    csvimportController.$inject = ["$rootScope", "$mdDialog", "core.contact.admin.service", "$mdToast"];

    function listController($rootScope, $state, contactAdminService, $mdDialog, pagingValues) {
        var vm = this;
        vm.Contacts = [];
        vm.CurrentPage = 1;
        vm.PageSize = pagingValues.PageSize;

        vm.GetContacts = GetContacts;
        vm.Edit = Edit;
        vm.Delete = Delete;
        vm.CsvImport = CsvImport;

        function GetContacts() {
            contactAdminService.GetAllContacts().then(GetAllContactsSuccess);

            function GetAllContactsSuccess(response) {
                vm.Contacts = [];
                vm.Contacts = response.data;
            }
        }

        function Edit(id) {
            $state.go('contactadminedit', {id: id});
        }

        function Delete(contact) {

            var confirm = $mdDialog.confirm()
                .title('Är du säker på att du vill ta bort ' + contact.FullName +  '?')
                .ariaLabel('Ta bort användare?')
                .ok('Ja')
                .cancel('Nej');

            $mdDialog.show(confirm).then(function() {
                contactAdminService.Delete(contact.Id).then(DeleteSuccess);
            });

            function DeleteSuccess() {
                vm.Contacts.splice(vm.Contacts.indexOf(contact), 1);
            }
        }

        function CsvImport() {
            $mdDialog.show({
                templateUrl: "modules/core/contact/admin/views/csv-import.html",
                controller: csvimportController,
                locals: {
                },
                bindToController: true,
                controllerAs: "vm"
            });
        }

        vm.GetContacts();

        $rootScope.$on('contact.csv.import.done', vm.GetContacts);
    }

    function editController($state, $stateParams, contactAdminService) {
        var vm = this;
        vm.Contact = {};
        vm.ContactId = ~~$stateParams.id;

        vm.GetContact = GetContact;
        vm.Back = Back;
        vm.Save = Save;

        function GetContact() {
            if(vm.ContactId > 0) {
                contactAdminService.GetContact(vm.ContactId).then(GetContactSuccess);
            }

            function GetContactSuccess(response) {
                vm.Contact = response.data;
            }
        }

        function Back() {
            $state.go("contactadminlist");
        }

        function Save() {
            contactAdminService.Save(vm.Contact).then(vm.Back);
        }

        vm.GetContact();
    }

    function csvimportController($rootScope, $mdDialog, contactAdminService, $mdToast) {
        var vm = this;
        vm.File = undefined;

        vm.FileSelect = FileSelect;
        vm.Import = Import;
        vm.Close = Close;

        function FileSelect(files) {
            vm.File = files[0];
            console.log(vm.File);
        }

        function Import() {
            contactAdminService.CsvImport(vm.File, CsvImportSuccess);

            function CsvImportSuccess(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data + ' kontakter importerade!')
                );

                $rootScope.$broadcast('contact.csv.import.done');

                vm.Close();
            }
        }

        function Close() {
            $mdDialog.hide();
        }
    }
}(window.angular));