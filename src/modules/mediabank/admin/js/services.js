(function (angular) {
    angular.module('graderaklubb').service('mediabank.admin.service', ["$http", mediabankAdminService]);

    function mediabankAdminService($http) {
        this.GetAllFiles = function() {
            return $http.get('/api/MediabankAdmin/GetAllFiles');
        };
    }
}(window.angular));