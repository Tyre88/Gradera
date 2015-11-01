require(
    [
        "app",
        "./routing.js",
		"./adminrouting.js",
		"./controllers/admin.js",
		"./controllers/home.js",
		"./controllers/basic.js",
		"./modules/core/authenticate/js/logindirective.js",
        "modules/core/users/js/usercontroller.js",
        "modules/core/accessrights/js/accessrightscontroller.js",
        "modules/core/club/js/clubcontroller.js",
        "modules/competition/admin/js/competitioncontroller.js"
    ],
    function()
    {
        require(["domready!"], function(document)
                {
                    return angular.bootstrap(document, ["graderaklubb"]);
                });
    });