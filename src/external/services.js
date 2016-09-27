(function (angular) {
    angular.module("graderaklubbexternal").service('clubService', clubService);

    clubService.$inject = ["$http"];

    function clubService($http) {
        this.GetClubInformation = function(shortName) {
            return $http.get('/api/ClubExternal/GetClubByShortName?' + $.param({shortName: shortName}));
        };
    }
}(window.angular));