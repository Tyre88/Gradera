(function (angular) {
    angular.module('graderaklubb').service('core.contact.admin.service', ["$http", "Upload", contactAdminService]);

    function contactAdminService($http, Upload) {
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

        this.CsvImport = function(file, successCallback) {
            Upload.upload({
                url: "/api/Contact/CsvImport",
                data: {file: file}
            }).then(successCallback, function(err) {
                console.error(err);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ');
            });
        };
    }
}(window.angular));