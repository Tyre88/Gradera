(function (angular) {
    angular.module('graderaklubb').service('grading-admin-service', ["$http", gradingAdminService]);

    function gradingAdminService($http) {
        this.GetGrades = function() {
            return $http.get('/api/GradingAdmin/GetGrades');
        };

        this.GetGrade = function(id) {
            return $http.get('/api/GradingAdmin/GetGrade?' + $.param({id: id}));
        };

        this.SaveGrade = function(grade) {
            return $http.post('/api/GradingAdmin/SaveGrade', grade);
        };

        this.GetCategories = function() {
            return $http.get('/api/GradingAdmin/GetGradingCategories');
        };

        this.GetCategory = function(id) {
            return $http.get('/api/GradingAdmin/GetGradingCategory?' + $.param({id: id}));
        };

        this.SaveGradingCategory = function(category) {
            return $http.post('/api/GradingAdmin/SaveGradingCategory', category);
        };

        this.GetGradingBooklet = function(bookletId) {
            return $http.get('/api/Grading/GetGradingBooklet?' + $.param({bookletId: bookletId, deepLoad: false}));
        };

        this.SaveBooklet = function(booklet) {
            return $http.post('/api/GradingAdmin/SaveBooklet', booklet);
        };

        this.DeleteBooklet = function(bookletId) {
            return $http.delete('/api/GradingAdmin/DeleteBooklet?' + $.param({bookletId: bookletId}));
        };
    }
}(window.angular));