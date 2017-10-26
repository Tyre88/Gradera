(function (angular) {
    angular.module('graderaklubbexternal').service('external.mediabank.service', externalNewsletterService);

    externalNewsletterService.$inject = ["$http"];

    function externalNewsletterService($http) {
        this.GetFile = function(fileGUID) {
            return $http.get('/api/MediabankExternal/GetFile?' + $.param({fileGUID: fileGUID}));
        };
    }
}(window.angular));