(function (angular) {
    angular.module('graderaklubb').controller('mediabank.admin.list', mediabankadminlistController);

    mediabankadminlistController.$inject = ["mediabank.admin.service"];

    function mediabankadminlistController(mediabankAdminService) {
        var vm = this;

        mediabankAdminService.GetAllFiles().success(function(response) {
            console.log(response);
        });
    }
}(window.angular));