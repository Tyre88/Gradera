(function (angular) {
    angular.module('graderaklubbexternal').controller('external.newsletter.unsubscribe', newsletterUnsubscribeController);

    newsletterUnsubscribeController.$inject = ["external.newsletter.service", "$stateParams"];

    function newsletterUnsubscribeController(newsletterService, $stateParams) {
        var vm = this;
        vm.Guid = $stateParams.guid;
        vm.UnsubscribeEmail = "";

        if(vm.Guid !== undefined && vm.Guid != "") {
            newsletterService.Unsubscribe(vm.Guid).then(UnsubscribeSuccess);
        }

        function UnsubscribeSuccess(response) {
            vm.UnsubscribeEmail = response.data;
        }
    }
}(window.angular));