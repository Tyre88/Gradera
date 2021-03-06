(function(angular) {
    angular.module('graderaklubb').service('forms-admin-service', ["$http", formsAdminService]);

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

        this.SaveFormFieldItem = function(formField) {
            return $http.post('/api/formsadmin/SaveFormFieldItem', formField);
        };

        this.GetUserAnswers = function(formId) {
            return $http.get('/api/formsadmin/GetUserSubmits?' + $.param({formId: formId}));
        };

        this.GetExternalAnswers = function(formId) {
            return $http.get('/api/formsadmin/GetExternalAnswers?' + $.param({formId: formId}));
        };

        this.DeleteFormFieldItem = function(formFieldId) {
            return $http.delete('/api/formsadmin/DeleteFormFieldItem?' + $.param({formFieldId: formFieldId}));
        };

        this.DeleteFormFieldOption = function(optionId) {
            return $http.delete('/api/formsadmin/DeleteFormFieldOption?' + $.param({optionId: optionId}));
        };

        this.DeleteExternalFormAnswer = function(batch) {
            return $http.delete('/api/formsadmin/DeleteExternalFormAnswer?' + $.param({batch: batch}));
        };

        this.ExportGetUserSubmitsToExcel = function(formId) {
            return $http.get('/api/formsadmin/ExportGetUserSubmitsToExcel?' + $.param({formId: formId}));
        };

        this.ExportExternalAnswersToExcel = function(formId) {
            return $http.get('/api/formsadmin/ExportExternalAnswersToExcel?' + $.param({formId: formId}));
        };
    }
}(window.angular));