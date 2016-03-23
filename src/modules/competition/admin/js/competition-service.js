(function(angular) {
    angular.module('graderaklubb').service('competition-admin-service', ["$http", function($http) {
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

        this.RemoveInternalCompeditor = function(compeditorId) {
            return $http.post('/api/competition/DeleteInternalCompeditor?' + $.param({compeditorId : compeditorId}));
        };

        this.RemoveExternalCompeditor = function(compeditorId) {
            return $http.post('/api/competition/DeleteExternalCompeditor?' + $.param({compeditorId : compeditorId}));
        };
    }]);
}(window.angular));