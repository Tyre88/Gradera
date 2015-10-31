/**
 * Created by Victor on 2015-10-31.
 */

'use-strict';

require(
    [
        "app"
    ],
    function (app) {
        app.service('club-service', function($http) {
            this.GetClub = function () {
                return $http.get('/api/club/getclub');
            };

            this.SaveClub = function(club) {
                return $http.post('/api/club/saveclub', club);
            };
        });
    });