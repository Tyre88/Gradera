(function (angular) {
    angular.module('graderaklubbexternal').controller('external.mediabank.file', mediabankFileController);

    mediabankFileController.$inject = ["external.mediabank.service", "$stateParams"];

    function mediabankFileController(mediabankService, $stateParams) {
        var vm = this;
        vm.Guid = $stateParams.guid;
        vm.MediabankFile = {};

        vm.GetFile = GetFile;

        function GetFile() {
            if(vm.Guid && vm.Guid != "") {
                mediabankService.GetFile(vm.Guid).success(GetFileSuccess).error(GetFileError);
            }

            function GetFileSuccess(response) {
                console.log(response);
                vm.MediabankFile = response;
            }

            function GetFileError() {
                vm.MediabankFile = null;
            }
        }

        vm.GetFile();
    }
}(window.angular));