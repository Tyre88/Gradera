/**
 * Created by Victor on 2015-11-01.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.service('competition-admin-service', function($http) {
            this.GetCompetitions = function() {
                return $http.get('/api/competition/GetCompetitions');
            };

            this.GetCompetition = function(competitionId) {
                return $http.get('/api/competition/GetCompetition/' + competitionId);
            };
        });
    });