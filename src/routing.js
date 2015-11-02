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
                        .state('home',
                        {
                            url: "/",
                            templateUrl: "views/home.html",
                            controller: "home"
                        })
						.state('homebasic',
						{
							url: "home",
							templateUrl: "views/homebasic.html",
							controller: "homebasic"
						})
						.state('gradingbasic',
						{
							url: "grading/:id",
							templateUrl: "views/gradingbasic.html",
							controller: "gradingbasic"
						})
						.state('competitionsbasic',
						{
							url: "competition/:id",
							templateUrl: "views/gradingbasic.html",
							controller: "gradingbasic"
						})
						.state('competitionlist',
						{
							url: "competitions",
							templateUrl: "modules/competition/views/listcompetitions.html",
							controller: "competitionlist",
							controllerAs: "vm"
						})
						.state('showcompetition',
						{
							url: "competition/:id",
							templateUrl: "modules/competition/views/showcompetition.html",
							controller: "showcompetition",
							controllerAs: "vm"
						});
                }
			]
        );
	});