(function (angular) {
    angular.module('graderaklubb').controller('mediabank.admin.list', mediabankadminlistController);

    mediabankadminlistController.$inject = ["mediabank.admin.service"];

    function mediabankadminlistController(mediabankAdminService) {
        var vm = this;
        vm.MediabankFiles = [];

        vm.UploadFile = UploadFile;

        function UploadFile(file) {
            if(file) {
                mediabankAdminService.UploadMediabankFile(file, "Victor", "Detta är en bild på victor.", UploadMediabankFileSuccess);
            }

            function UploadMediabankFileSuccess(response) {
                vm.MediabankFiles.push(response.data);
            }
        }

        mediabankAdminService.GetAllFiles().success(function(response) {
            vm.MediabankFiles = response;
        });
    }
}(window.angular));