/**
 * Created by Victor on 2015-11-02.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.service('competition-external-service', function($http) {
            this.GetCompetition = function(clubShortName, competitionName) {
                return $http.get('/api/ExternalCompetition/GetCompetition?' + $.param({clubShortName: clubShortName, competitionName: competitionName}));
            };
        });
    });