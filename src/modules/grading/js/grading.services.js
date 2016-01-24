(function (angular) {
    angular.module('graderaklubb').service('grading.service', ["$http", gradingService]);

    function gradingService($http) {
        this.GetGrades = function() {
            return $http.get('/api/Grading/GetGrades');
        };

        this.GetGradesWithoutBooklet = function() {
            return $http.get('/api/Grading/GetGradesWithoutBooklet');
        };

        this.GetGrade = function(id) {
            return $http.get('/api/Grading/GetGrade?' + $.param({id: id}));
        };

        this.ExportGrade = function(id) {
            return $http.get('/api/Grading/ExportGrade?' + $.param({id: id}));
        };

        this.GetGradingBooklets = function() {
            return $http.get('/api/Grading/GetGradingBooklets');
        };

        this.GetGradingBooklet = function(bookletId) {
            return $http.get('/api/Grading/GetGradingBooklet?' + $.param({bookletId: bookletId, deepLoad: true}));
        };
    }
}(window.angular));