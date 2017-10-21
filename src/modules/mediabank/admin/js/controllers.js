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
        vm.GetThumbnail = GetThumbnail;

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
                case "VIDEO":
                    return "Video";
                case "EXCEL":
                    return "Excel";
                case "WORD":
                    return "Word";
                case "CSV":
                    return "Csv";
                case "PDF":
                    return "Pdf";
                default:
                    return "-";
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

        function GetThumbnail(file) {
            if(file.Thumbnail == null) {
                switch(file.FileType) {
                    case "EXCEL":
                        return "content/images/excel.svg";
                    case "CSV":
                        return "content/images/csv.png";
                    case "WORD":
                        return "content/images/word.png";
                    default:
                        return "content/images/No_Image_Available.png";
                }
            }
            else return file.Thumbnail;
        }

        mediabankAdminService.GetAllFiles().success(function(response) {
            vm.MediabankFiles = response;
        });
    }

    function mediabankadmineditController($state, $stateParams, mediabankAdminService) {
        var vm = this;
        vm.MediabankFileId = ~~$stateParams.id;
        vm.MediabankFile = {};
        vm.Accessrights = [];
        vm.Saved = false;

        vm.Back = Back;
        vm.Save = Save;
        vm.UpdateMediabankFileExternalGUID = UpdateMediabankFileExternalGUID;
        vm.PermissionSaveCallback = PermissionSaveCallback;
        vm.ExternalChange = ExternalChange;

        function Back() {
            $state.go('mediabankadminlist');
        }

        function Save() {
            mediabankAdminService.UpdateMediabankFile(vm.MediabankFile).success(UpdateMediabankFileSuccess);

            function UpdateMediabankFileSuccess(response) {
                if(response == true) {
                    //vm.Back();
                    vm.Saved = true;
                }
            }
        }

        function UpdateMediabankFileExternalGUID() {
            vm.DisableExternalCheck = true;
            mediabankAdminService.UpdateMediabankFileExternalGUID(vm.MediabankFile).success(UpdateMediabankFileExternalGUIDSuccess);

            function UpdateMediabankFileExternalGUIDSuccess(response) {
                vm.MediabankFile.ExternalGUID = response;
                vm.DisableExternalCheck = false;
            }
        }

        mediabankAdminService.GetFile(vm.MediabankFileId).success(GetFileSuccess);

        function GetFileSuccess(response) {
            vm.MediabankFile = response;
        }

        function PermissionSaveCallback(success) {
            console.log('permissions save callback', success);
            if(success) {
                vm.Back();
            }
            else {
                console.log('Permissions save failed...');
            }
        }

        function ExternalChange() {
            if(vm.MediabankFile.IsExternal && (!vm.MediabankFile.ExternalGUID || vm.MediabankFile.ExternalGUID == "")) {
                vm.UpdateMediabankFileExternalGUID();
            }
        }
    }
}(window.angular));