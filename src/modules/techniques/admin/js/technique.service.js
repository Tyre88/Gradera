(function (angular) {
    angular.module('graderaklubb').service('technique-service', techniqueService);

    techniqueService.$injcet = ["$http"];

    function techniqueService($http) {
        this.SaveTechniqueType = function(techniqueType) {
            return $http.post('/api/TechniqueAdmin/SaveTechniqueType', techniqueType);
        };

        this.GetTechniqueTypes = function() {
            return $http.get('/api/TechniqueAdmin/GetTechniqueTypes');
        };

        this.GetTechniqueType = function(id) {
            return $http.get('/api/TechniqueAdmin/GetTechniqueType?' + $.param({id: id}));
        };
    }
}(window.angular));