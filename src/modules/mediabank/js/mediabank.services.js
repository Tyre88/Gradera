(function (angular) {
    angular.module('graderaklubb').service('mediabank.service', ["$http", mediabankService]);

    function mediabankService($http) {
        this.GetAllFiles = function() {
            return $http.get('/api/Mediabank/GetAllFiles');
        };

        this.GetFile = function(fileId) {
            return $http.get('/api/Mediabank/GetFile?' + $.param({ fileId: fileId }));
        };

        this.GetAllFilesWithType = function(fileType) {
            return $http.get('/api/Mediabank/GetAllFilesWithType?' + $.param({ fileType: fileType }));
        };
    }
}(window.angular));