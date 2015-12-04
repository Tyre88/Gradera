(function (angular) {
    angular.module('graderaklubb').service('gradingService', gradingService);

    gradingService.$injcet = ["$http"];

    function gradingService($http) {
        this.GetGrades = function() {
            return $http.get('/api/Grading/GetGrades');
        };
    }
}(window.angular));