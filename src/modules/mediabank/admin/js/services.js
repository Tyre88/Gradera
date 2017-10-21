(function (angular) {
    angular.module('graderaklubb').service('mediabank.admin.service', ["$rootScope", "$http", "Upload", mediabankAdminService]);

    function mediabankAdminService($rootScope, $http, Upload) {
        this.GetAllFiles = function() {
            return $http.get('/api/MediabankAdmin/GetAllFiles');
        };

        this.GetAllFilesWithType = function(fileType) {
            return $http.get('/api/MediabankAdmin/GetAllFilesWithType?' + $.param({fileType: fileType}));
        };

        this.GetFile = function(fileId) {
            return $http.get('/api/MediabankAdmin/GetFile?' + $.param({fileId: fileId}));
        };

        this.UpdateMediabankFile = function(file) {
            return $http.post('/api/MediabankAdmin/UpdateMediabankFile', file);
        };

        this.UpdateMediabankFileExternalGUID = function(file) {
            return $http.post('/api/MediabankAdmin/UpdateMediabankFileExternalGUID', file);
        };

        this.DeleteMediabankFile = function(id) {
            return $http.delete('/api/MediabankAdmin/DeleteMediabankFile?' + $.param({id: id}));
        };

        this.UploadMediabankFile = function(file, fileName, fileDescription, successCallback) {
            Upload.upload({
                url: "/api/MediabankAdmin/UploadMediabankFile",
                data: { file: file, fileName: fileName, fileDescription: fileDescription }
            }).then(successCallback, function(err) {
                console.error(err);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ');

                $rootScope.LoadingProgress = progressPercentage;
            });
        }
    }
}(window.angular));