(function(angular) {
    LoadCss('modules/mediabank/css/mediabank.css');

    angular.module('graderaklubb').controller('mediabanklist', mediabanklistController);
    angular.module('graderaklubb').controller('mediabankshow', mediabankshowController);
    angular.module('graderaklubb').controller('mediabankdialog', mediabankdialogController);

    mediabanklistController.$inject = ["$state", "mediabank.service"];
    mediabankshowController.$inject = ["$state", "$stateParams", "mediabank.service"];
    mediabankdialogController.$inject = ["$mdDialog", "mediabank.service"];

    function mediabanklistController($state, mediabankService) {
        var vm = this;
        vm.MediabankFiles = [];

        vm.GetAllFiles = GetAllFiles;
        vm.GetThumbnail = GetThumbnail;
        vm.Show = Show;
        vm.GetTypeName = GetTypeName;

        function GetAllFiles() {
            mediabankService.GetAllFiles().success(GetAllFilesSuccess);

            function GetAllFilesSuccess(response) {
                vm.MediabankFiles = response;
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

        function Show(file) {
            $state.go('mediabankshow', {id: file.Id});
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

        vm.GetAllFiles();
    }

    function mediabankshowController($state, $stateParams, mediabankService) {
        var vm = this;
        vm.MediabankFileId = ~~$stateParams.id;
        vm.MediabankFile = {};

        vm.GetFile = GetFile;

        function GetFile() {
            mediabankService.GetFile(vm.MediabankFileId).success(GetFileSuccess);

            function GetFileSuccess(response) {
                vm.MediabankFile = response;
            }
        }

        vm.GetFile();
    }

    function mediabankdialogController($mdDialog, mediabankService) {
        var vm = this;

        vm.MediabankFiles = [];
        vm.SelectedFile;
        vm.Settings = {};

        vm.GetAllFilesWithType = GetAllFilesWithType;
        vm.Ok = Ok;
        vm.Close = Close;

        function GetAllFilesWithType() {
            mediabankService.GetAllFilesWithType("IMAGE").success(GetAllFilesWithTypeSuccess);

            function GetAllFilesWithTypeSuccess(data) {
                vm.MediabankFiles = data;
                console.log(vm.MediabankFiles);
            }
        }

        function Ok() {
            $mdDialog.hide({file: vm.SelectedFile, settings: vm.Settings});
        }

        function Close() {
            $mdDialog.cancel();
        }

        vm.GetAllFilesWithType();
    }
}(window.angular));