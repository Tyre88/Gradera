(function (angular) {
    angular.module('graderaklubb').service('gradingService', gradingService);

    gradingService.$injcet = ["$http"];

    function gradingService($http) {
        this.GetGrades = function() {
            return $http.get('/api/Grading/GetGrades');
        };

        this.GetGrade = function(id) {
            return $http.get('/api/Grading/GetGrade?' + $.param({id: id}));
        };

        this.ExportGrade = function(id) {
            return $http.get('/api/Grading/ExportGrade?' + $.param({id: id}));
        };
    }
}(window.angular));