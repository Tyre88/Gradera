require(
    [
        "app",
        "./routing.js",
		"./adminrouting.js",
        "./externalrouting.js",
		"./controllers/admin.js",
		"./controllers/home.js",
		"./controllers/basic.js",
		"./modules/core/authenticate/js/logindirective.js",
        "modules/core/common/enums.js",
        "modules/core/users/admin/js/usercontroller.js",
        "modules/core/accessrights/js/accessrightscontroller.js",
        "modules/core/club/js/clubcontroller.js",
        "modules/core/users/js/usercontroller.js",
        "modules/competition/admin/js/competitioncontroller.js",
        "modules/competition/js/competitioncontroller.js",
        "modules/competition/external/js/competitioncontroller.js",
        "modules/forms/admin/js/formscontroller.js"
    ],
    function()
    {
        require(["domready!"], function(document)
                {
                    return angular.bootstrap(document, ["graderaklubb"]);
                });
    });