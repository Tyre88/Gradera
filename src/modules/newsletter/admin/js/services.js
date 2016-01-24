(function (angular) {
    angular.module('graderaklubb').service('newsletter.admin.service', ["$http", newsletterAdminService]);

    //newsletterAdminService.$injcet = ["$http"];

    function newsletterAdminService($http) {
        this.GetNewsletters = function() {
            return $http.get('/api/NewsletterAdmin/GetNewsletters');
        };

        this.GetNewsletter = function(newsletterId) {
            return $http.get('/api/NewsletterAdmin/GetNewsletter?' + $.param({newsletterId: newsletterId}));
        };

        this.SaveNewsletter = function(newsletter) {
            return $http.post('/api/NewsletterAdmin/SaveNewsletter', newsletter);
        };

        this.SendNewsletter = function(sendNewsletterModel) {
            return $http.post('/api/NewsletterAdmin/SendNewsletter', sendNewsletterModel);
        };

        this.GetNewsletterStatsByNewsletterId = function(id) {
            return $http.get('/api/NewsletterAdmin/GetNewsletterStatsByNewsletterId?' + $.param({id: id}));
        };
    }
}(window.angular));