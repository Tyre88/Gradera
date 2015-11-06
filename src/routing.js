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
							templateUrl: "modules/home/views/home.html",
							controller: "home",
							controllerAs: "vm"
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
						})
						.state('userlist',
						{
							url: "/users",
							templateUrl: "modules/core/users/views/listusers.html",
							controller: "userlist",
							controllerAs: "vm"
						})
						.state('showuser',
						{
							url: "/user/:userId",
							templateUrl: "modules/core/users/views/showuser.html",
							controller: "showuser",
							controllerAs: "vm"
						})
						.state('showform',{
							url: "/form/:formId",
							templateUrl: "modules/forms/views/showform.html",
							controller: "showform",
							controllerAs: "vm"
						});
                }
			]
        );
	});