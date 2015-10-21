require(
    [
        "app",
        "./routing.js",
		"./adminrouting.js",
		"./controllers/admin.js",
		"./controllers/home.js",
		"./controllers/basic.js",
		"./modules/core/authenticate/js/logindirective.js",
        "modules/core/users/js/usercontroller.js"
    ],
    function()
    {
        require(["domready!"], function(document)
                {
                    return angular.bootstrap(document, ["graderaklubb"]);
                });
    });