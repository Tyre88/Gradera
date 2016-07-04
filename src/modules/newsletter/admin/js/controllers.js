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
            var confirm = $mdDialog.confirm()
                .title('Är du säker på att du vill ta bort ' + newsletter.Name +  '?')
                .ariaLabel('Ta bort nyhetsbrev?')
                .ok('Ja')
                .cancel('Nej');

            $mdDialog.show(confirm).then(function() {
                newsletterAdminService.Delete(newsletter.Id).success(DeleteSuccess);
            });

            function DeleteSuccess() {
                vm.Newsletters.splice(vm.Newsletters.indexOf(newsletter), 1);
            }
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

    sendController.$inject = ["$mdDialog", "accessrights-service", "newsletter.admin.service", "core.contact.admin.service"];

    function sendController($mdDialog, accessrightsService, newsletterAdminService, contactAdminService) {
        var vm = this;
        vm.Newsletter;
        vm.Accessrights = [];
        vm.Contacts = [];

        vm.GetAccessRights = GetAccessRights;
        vm.GetContacts = GetContacts;
        vm.Close = Close;
        vm.Send = Send;

        function GetAccessRights() {
            accessrightsService.GetAccessRights().success(GetAccessRightsCallback);

            function GetAccessRightsCallback(response) {
                vm.Accessrights = response;
            }
        }

        function GetContacts() {
            contactAdminService.GetAllContacts().success(GetContactsSuccess);

            function GetContactsSuccess(response) {
                vm.Contacts = response;
            }
        }

        function Close() {
            $mdDialog.hide();
        }

        function Send() {
            var accessrightIds = [];
            var contactIds = [];

            for(var i = 0; i < vm.Accessrights.length; i++)
            {
                if(vm.Accessrights[i].Checked == true)
                    accessrightIds.push(vm.Accessrights[i].Id);
            }

            for(var i = 0; i < vm.Contacts.length; i++) {
                if(vm.Contacts[i].Checked == true)
                    contactIds.push(vm.Contacts[i].Id);
            }

            var sendNewsletterModel = { NewsletterId: vm.Newsletter.Id, AccessrightIds: accessrightIds, ContactIds: contactIds };

            newsletterAdminService.SendNewsletter(sendNewsletterModel).success(SendNewsletterCallback);

            function SendNewsletterCallback() {
                vm.Close();
            }
        }

        vm.GetAccessRights();
        vm.GetContacts();
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