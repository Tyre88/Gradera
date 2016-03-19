(function(angular) {
    angular.module('graderaklubb').service('accessrights-service', ["$http", function($http) {
        this.GetAccessRights = function () {
            return $http.get('/api/Accessrights/GetAccessRights');
        };

        this.GetAccessRight = function(id) {
            return $http.get('/api/Accessrights/GetAccessRight/' + id);
        };

        this.GetAccessTypes = function() {
            return $http.get('/api/Accessrights/GetAccessTypes');
        };

        this.GetAccessTypeRights = function() {
            return $http.get('/api/Accessrights/GetAccessTypeRights');
        };

        this.SaveAccessright = function(accessright) {
            return $http.post('/api/Accessrights/SaveAccessright', accessright);
        };

        this.GetModules = function() {
            return $http.get('/api/Accessrights/GetModules');
        };
    }]);
}(window.angular));