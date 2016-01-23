(function (angular) {
    angular.module('graderaklubb').controller('newsletter.admin.list', listController);

    listController.$inject = ["newsletter.admin.service", "$state", "$mdDialog"];

    function listController(newsletterAdminService, $state, $mdDialog) {
        var vm = this;

        vm.Newsletters = [];

        vm.GetNewsletters = GetNewsletters;
        vm.GetDate = GetDate;
        vm.Edit = Edit;
        vm.Delete = Delete;
        vm.SendNewsletter = SendNewsletter;
        vm.ShowStats = ShowStats;

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

        function SendNewsletter(newsletter) {
            $mdDialog.show({
                templateUrl: "modules/newsletter/admin/views/newslettersend.html",
                controller: sendController,
                locals: {
                    Newsletter: newsletter
                },
                bindToController: true,
                controllerAs: "vm"
            });
        }

        function ShowStats(newsletter) {
            $state.go('newsletteradminstats', {id: newsletter.Id});
        }

        vm.GetNewsletters();
    }

    angular.module('graderaklubb').controller('newsletter.admin.edit', editController);

    editController.$inject = ["newsletter.admin.service", "$state", "$stateParams"];

    function editController(newsletterAdminService, $state, $stateParams) {
        var vm = this;
        vm.Newsletter = {};
        vm.NewsletterId = ~~$stateParams.id;
        vm.EditorOptions = {
            language: "sv"
        };

        vm.GetNewsletter = GetNewsletter;
        vm.Save = Save;
        vm.Back = Back;

        function GetNewsletter() {
            newsletterAdminService.GetNewsletter(vm.NewsletterId).success(GetNewsletterCallback);

            function GetNewsletterCallback(response) {
                vm.Newsletter = response;
            }
        }

        function Save() {
            newsletterAdminService.SaveNewsletter(vm.Newsletter).success(SaveNewsletterCallback);

            function SaveNewsletterCallback() {
                vm.Back();
            }
        }

        function Back() {
            $state.go('newsletteradminlist');
        }

        if(~~vm.NewsletterId > 0)
            vm.GetNewsletter();
    }

    angular.module('graderaklubb').controller('newsletter.admin.send', sendController);

    sendController.$inject = ["$mdDialog", "accessrights-service", "newsletter.admin.service"];

    function sendController($mdDialog, accessrightsService, newsletterAdminService) {
        var vm = this;
        vm.Newsletter;
        vm.Accessrights = [];

        vm.GetAccessRights = GetAccessRights;
        vm.Close = Close;
        vm.Send = Send;

        function GetAccessRights() {
            accessrightsService.GetAccessRights().success(GetAccessRightsCallback);

            function GetAccessRightsCallback(response) {
                vm.Accessrights = response;
            }
        }

        function Close() {
            $mdDialog.hide();
        }

        function Send() {
            var accessrightIds = [];

            for(var i = 0; i < vm.Accessrights.length; i++)
            {
                if(vm.Accessrights[i].Checked == true)
                    accessrightIds.push(vm.Accessrights[i].Id);
            }

            var sendNewsletterModel = { NewsletterId: vm.Newsletter.Id, AccessrightIds: accessrightIds };

            newsletterAdminService.SendNewsletter(sendNewsletterModel).success(SendNewsletterCallback);

            function SendNewsletterCallback() {
                vm.Close();
            }
        }

        vm.GetAccessRights();
    }

    angular.module('graderaklubb').controller('newsletter.admin.stats', statsController);

    statsController.$inject = ["$state", "$stateParams", "newsletter.admin.service"];

    function statsController($state, $stateParams, newsletterAdminService) {
        var vm = this;
        vm.NewsletterId = ~~$stateParams.id;
        vm.Stats = [];

        vm.GetNewsletterStatsByNewsletterId = GetNewsletterStatsByNewsletterId;
        vm.Back = Back;
        vm.GetDate = GetDate;

        function GetNewsletterStatsByNewsletterId() {
            newsletterAdminService.GetNewsletterStatsByNewsletterId(vm.NewsletterId).success(GetNewsletterStatsByNewsletterIdCallback);

            function GetNewsletterStatsByNewsletterIdCallback(response) {
                vm.Stats = response;
            }
        }

        function Back() {
            $state.go('newsletteradminlist');
        }

        function GetDate(date) {
            return moment(date).format('YYYY-MM-DD HH:MM:ss')
        }

        if(vm.NewsletterId > 0)
            vm.GetNewsletterStatsByNewsletterId();
    }
}(window.angular));