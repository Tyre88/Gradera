(function(angular) {
    angular.module('graderaklubb').service('forms-admin-service', formsAdminService);

    formsAdminService.$inject = ["$http"];

    function formsAdminService($http) {
        this.GetForms = function() {
            return $http.get('/api/formsadmin/getallforms');
        };

        this.DeleteForm = function(formId) {
            return $http.post('/api/formsadmin/deleteform?' + $.param({id: formId}));
        };

        this.GetForm = function(formId) {
            return $http.get('/api/formsadmin/getform?' + $.param({id: formId}));
        };

        this.SaveForm = function(form) {
            return $http.post('/api/formsadmin/saveform', form);
        };

        this.GetUserAnswers = function(formId) {
            return $http.get('/api/formsadmin/GetUserSubmits?' + $.param({formId: formId}));
        };

        this.GetExternalAnswers = function(formId) {
            return $http.get('/api/formsadmin/GetExternalAnswers?' + $.param({formId: formId}));
        };

        this.DeleteFormFieldItem = function(formFieldId) {
            return $http.delete('/api/formsadmin/DeleteFormFieldItem?' + $.param({formFieldId: formFieldId}));
        }
    }
}(window.angular));