(function (angular) {
    angular.module('graderaklubb').service('grading-admin-service', gradingAdminService);

    gradingAdminService.$injcet = ["$http"];

    function gradingAdminService($http) {
        this.GetGrades = function() {
            return $http.get('/api/gradesadmin/getgrades');
        };
    }
}(window.angular));