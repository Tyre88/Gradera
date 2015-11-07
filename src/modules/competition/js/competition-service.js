(function(angular) {
    angular.module('graderaklubb').service('competition-service', ["$http", function($http) {
        this.GetCompetitions = function() {
            return $http.get('/api/competition/GetCompetitions');
        };

        this.GetCompetition = function(competitionId) {
            return $http.get('/api/competition/GetCompetition/' + competitionId);
        };

        this.SubscribeToCompetition = function(competitionId, categoryId){
            return $http.post('/api/competition/SubscribeToCompetition?' + $.param({competitionId: competitionId, categoryId: categoryId}));
        };

        this.GetUpcommingCompetitions = function(count) {
            return $http.get('/api/competition/GetUpcommingCompetitions?' + $.param({count: count}));
        };
    }]);
}(window.angular));