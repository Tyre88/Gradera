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
            this.AddCategory = function(competitionId, categoryName) {
                return $http.post('/api/competition/AddCategory?' + $.param({competitionId: competitionId, categoryName: categoryName}));
            };

            this.DeleteCategory = function(id) {
                return $http.post('/api/competition/DeleteCategory?' + $.param({id: id}));
            };

            this.SaveCompetition = function(competition) {
                return $http.post('/api/competition/SaveCompetition', competition);
            };

            this.ExportCompetition = function(competitionId) {
                return $http.get('/api/competition/ExportCompeditorsToExcel?' + $.param({id: competitionId}));
            };

            this.DeleteCompetition = function(competitionId) {
                return $http.post('/api/competition/DeleteCompetition?' + $.param({id: competitionId}));
            };
        });
    });