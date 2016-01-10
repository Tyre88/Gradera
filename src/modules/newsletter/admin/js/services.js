(function (angular) {
    angular.module('graderaklubb').service('newsletter.admin.service', newsletterAdminService);

    newsletterAdminService.$injcet = ["$http"];

    function newsletterAdminService($http) {
        this.GetNewsletters = function() {
            return $http.get('/api/NewsletterAdmin/GetNewsletters');
        };
    }
}(window.angular));