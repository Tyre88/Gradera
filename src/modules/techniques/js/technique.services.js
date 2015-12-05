(function (angular) {
    angular.module('graderaklubb').service('techniqueService', techniqueService);

    techniqueService.$injcet = ["$http"];

    function techniqueService($http) {
        this.GetTechnique = function(id) {
            return $http.get('/api/Technique/GetTechnique?' + $.param({id: id}));
        };
    }
}(window.angular));