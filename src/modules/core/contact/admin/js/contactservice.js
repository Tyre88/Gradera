(function (angular) {
    angular.module('graderaklubb').service('core.contact.admin.service', ["$http", contactAdminService]);

    function contactAdminService($http) {
        this.GetAllContacts = function() {
            return $http.get('/api/Contact/GetAllContacts');
        };
    }
}(window.angular));