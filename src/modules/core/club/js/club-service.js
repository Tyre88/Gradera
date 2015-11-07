(function(angular) {
    angular.module('graderaklubb').service('club-service', function($http) {
        this.GetClub = function () {
            return $http.get('/api/club/getclub');
        };

        this.SaveClub = function(club) {
            return $http.post('/api/club/saveclub', club);
        };
    });
}(window.angular));