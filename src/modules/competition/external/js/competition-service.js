/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

(function(angular) {
    angular.module('graderaklubbexternal').service('competition-external-service', ["$http", function($http) {
        this.GetCompetition = function(clubShortName, competitionName) {
            return $http.get('/api/ExternalCompetition/GetCompetition?' + $.param({clubShortName: clubShortName, competitionName: competitionName}));
        };
    }]);
}(window.angular));