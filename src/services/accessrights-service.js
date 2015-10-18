require(
    [
        "app"
    ],
    function(app)
    {
        app.service('accessrights-service', function($http) {
            this.GetAccessRights = function () {
                return $http.get('/api/Accessrights/GetAccessRights');
            }
        });
    }
);