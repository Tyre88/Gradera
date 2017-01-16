(function (angular) {
    angular.module('graderaklubb').controller('mediabank.admin.list', mediabankadminlistController);
    angular.module('graderaklubb').controller('mediabank.admin.edit', mediabankadmineditController);

    mediabankadminlistController.$inject = ["$state", "$mdDialog", "mediabank.admin.service"];
    mediabankadmineditController.$inject = ["$state", "$stateParams", "mediabank.admin.service"];

    function mediabankadminlistController($state, $mdDialog, mediabankAdminService) {
        var vm = this;
        vm.MediabankFiles = [];

        vm.UploadFile = UploadFile;
        vm.GetTypeName = GetTypeName;
        vm.Show = Show;
        vm.DeleteMediabankFile = DeleteMediabankFile;

        function UploadFile(file) {
            if(file) {
                mediabankAdminService.UploadMediabankFile(file, "", "", UploadMediabankFileSuccess);
            }

            function UploadMediabankFileSuccess(response) {
                //vm.MediabankFiles.push(response.data);
                vm.Show(response.data)
            }
        }

        function GetTypeName(type) {
            switch(type){
                case "IMAGE":
                    return "Bild";
                break;
                case "VIDEO":
                    return "Video";
                break;
                default:
                    return "-";
                break;
            }
        }

        function Show(file) {
            $state.go('mediabankadminedit', {id: file.Id});
        }

        function DeleteMediabankFile(file) {
            var confirm = $mdDialog.confirm()
                .title('Är du säker på att du vill ta bort ' + file.Name +  '?')
                .ariaLabel('Ta bort mediabank fil?')
                .ok('Ja')
                .cancel('Nej');

            $mdDialog.show(confirm).then(function() {
                mediabankAdminService.DeleteMediabankFile(file.Id).success(DeleteMediabankFileSuccess);
            });

            function DeleteMediabankFileSuccess(response) {
                if(response == true) {
                    vm.MediabankFiles.splice(vm.MediabankFiles.indexOf(file), 1);
                }
            }
        }

        mediabankAdminService.GetAllFiles().success(function(response) {
            vm.MediabankFiles = response;
        });
    }

    function mediabankadmineditController($state, $stateParams, mediabankAdminService) {
        var vm = this;
        vm.MediabankFileId = ~~$stateParams.id;
        vm.MediabankFile = {};

        vm.Back = Back;
        vm.Save = Save;

        function Back() {
            $state.go('mediabankadminlist');
        }

        function Save() {
            mediabankAdminService.UpdateMediabankFile(vm.MediabankFile).success(UpdateMediabankFileSuccess);

            function UpdateMediabankFileSuccess(response) {
                if(response == true) {
                    vm.Back();
                }
            }
        }

        mediabankAdminService.GetFile(vm.MediabankFileId).success(GetFileSuccess);

        function GetFileSuccess(response) {
            vm.MediabankFile = response;
        }
    }
}(window.angular));