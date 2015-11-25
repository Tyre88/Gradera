(function (angular) {
    angular.module('graderaklubb').service('grading-admin-service', gradingAdminService);

    gradingAdminService.$injcet = ["$http"];

    function gradingAdminService($http) {
        this.GetGrades = function() {
            return $http.get('/api/GradingAdmin/GetGrades');
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
        }
    }
}(window.angular));