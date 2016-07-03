(function (angular) {
    angular.module('graderaklubb').service('core.contact.admin.service', ["$http", contactAdminService]);

    function contactAdminService($http) {
        this.GetAllContacts = function() {
            return $http.get('/api/Contact/GetAllContacts');
        };

        this.GetContact = function(contactId) {
            return $http.get('/api/Contact/GetContact?' + $.param({contactId: contactId}));
        };

        this.Save = function(contact) {
            return $http.post('/api/Contact/SaveContact', contact);
        };

        this.Delete = function(contactId) {
            return $http.delete('/api/Contact/DeleteContact?' + $.param({contactId: contactId}));
        };
    }
}(window.angular));