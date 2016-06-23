(function (angular) {
    angular.module('graderaklubb').controller('core.contact.admin.list', listController);

    listController.$inject = ["core.contact.admin.service"];

    function listController(contactAdminService) {
        var vm = this;
        vm.Contacts = [];

        vm.GetContacts = GetContacts;
        vm.Edit = Edit;
        vm.Delete = Delete;

        function GetContacts() {
            contactAdminService.GetAllContacts().success(GetAllContactsSuccess);

            function GetAllContactsSuccess(response) {
                vm.Contacts = response;
            }
        }

        function Edit(id) {

        }

        function Delete(contact) {

        }

        vm.GetContacts();
    }
}(window.angular));