define(
	[
		"app"
	],
	function(app)
	{
		app.config(
			[
				"$stateProvider",
				"$urlRouterProvider",
				function($stateProvider, $urlRouterProvider)
				{
                    $stateProvider
                        .state('login',
                        {
                            url: "/login",
                            templateUrl: "views/home.html",
                            controller: "home"
                        })
						.state('logout',
						{
							url: "/logout",
							template: "",
							controller: "logoutController"
						})
						.state('noaccess',
						{
							url: "/noaccess",
							template: "<p>Access denied!</p>",
							controller: "noaccessController"
						})
						.state('home',
						{
							url: "/",
							templateUrl: "views/homebasic.html",
							controller: "homebasic"
						})
						.state('competitionlist',
						{
							url: "/competitions",
							templateUrl: "modules/competition/views/listcompetitions.html",
							controller: "competitionlist",
							controllerAs: "vm"
						})
						.state('showcompetition',
						{
							url: "/competition/:id",
							templateUrl: "modules/competition/views/showcompetition.html",
							controller: "showcompetition",
							controllerAs: "vm"
						});
                }
			]
        );
	});