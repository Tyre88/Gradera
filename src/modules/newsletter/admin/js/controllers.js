(function (angular) {
    angular.module('graderaklubb').controller('newsletter.admin.list', listController);

    listController.$inject = ["newsletter.admin.service", "$state"];

    function listController(newsletterAdminService, $state) {
        var vm = this;

        vm.Newsletters = [];

        vm.GetNewsletters = GetNewsletters;
        vm.GetDate = GetDate;
        vm.Edit = Edit;
        vm.Delete = Delete;

        function GetNewsletters() {
            newsletterAdminService.GetNewsletters().success(GetNewslettersCallback);

            function GetNewslettersCallback(response) {
                vm.Newsletters = response;
            }
        }

        function GetDate(date) {
            return moment(date).format('YYYY-MM-DD');
        }

        function Edit(id) {
            $state.go('newsletteradminedit', {id: id});
        }

        function Delete(newsletter) {

        }

        vm.GetNewsletters();
    }

    angular.module('graderaklubb').controller('newsletter.admin.edit', editController);

    editController.$inject = ["newsletter.admin.service", "$state", "$stateParams"];

    function editController(newsletterAdminService) {
        var vm = this;
        vm.Newsletter = {};
        vm.NewsletterId = ~~$stateParams.id;

        vm.GetNewsletter = GetNewsletter;

        function GetNewsletter() {

        }

        if(~~vm.NewsletterId > 0)
            vm.GetNewsletter();
    }
}(window.angular));