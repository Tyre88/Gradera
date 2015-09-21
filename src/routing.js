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
						});
                }
			]
        );
	});