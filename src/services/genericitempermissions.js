(function(angular) {
    angular.module('graderaklubb').service('genericitempermissions.service', ["$http", function($http) {

        this.SaveGenericItemPermissions = function(objectId, objectType, accessrightIds, userIds) {
            var permissions = {
                ObjectId: objectId,
                ObjectType: objectType,
                AccessrightIds: accessrightIds || [],
                UserIds: userIds || []
            };
            return $http.post('/api/GenericItemPermission/SaveGenericItemPermissions', permissions);
        };

        this.GetItemPermission = function(objectType, objectId) {
            return $http.get('/api/GenericItemPermission/GetItemPermission?' + $.param({ objectType: objectType, objectId: objectId }));
        }
    }]);
}(window.angular));