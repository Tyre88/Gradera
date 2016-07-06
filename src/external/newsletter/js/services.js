(function (angular) {
    angular.module('graderaklubbexternal').service('external.newsletter.service', externalNewsletterService);

    externalNewsletterService.$inject = ["$http"];

    function externalNewsletterService($http) {
        this.Unsubscribe = function(guid) {
            return $http.post('/api/Newsletter/Unsubscribe?' + $.param({guid: guid}));
        };
    }
}(window.angular));