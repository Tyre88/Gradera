(function(angular) {
    angular.module('graderaklubb').service('club-service', ["$http", function($http) {
        this.GetClub = function () {
            return $http.get('/api/club/getclub');
        };

        this.GetClubByShortName = function(shortName) {
            return $http.get('/api/club/GetClubByShortName?' + $.param({shortName: shortName}));
        };

        this.SaveClub = function(club) {
            return $http.post('/api/club/saveclub', club);
        };

        this.GetModuleLinks = function() {
            return $http.get('/api/club/GetModuleLinks');
        };

        this.GetClubs = function() {
            return $http.get('/api/club/GetClubs');
        }
    }]);
}(window.angular));