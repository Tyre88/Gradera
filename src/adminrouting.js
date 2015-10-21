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
						.state('gradingadmin',
						{
							url: "admin/grading/:id",
							templateUrl: "views/gradingadmin.html",
							controller: "gradingadmin"
						})
						.state('settingsadmin',
						{
							url: "admin/settings/:id",
							templateUrl: "views/gradingadmin.html",
							controller: "gradingadmin"
						})
						.state('competitionsadmin',
						{
							url: "admin/competition/:id",
							templateUrl: "views/gradingadmin.html",
							controller: "gradingadmin"
						})
						.state('handleusers',
						{
							url: "admin/handleusers",
							templateUrl: "modules/core/users/views/handleusers.html",
							controller: "handleusers"
						})
						.state('edituser',
						{
							url: "admin/edituser/:userId",
							templateUrl: "modules/core/users/views/edituser.html",
							controller: "edituser"
						});
				}
			]
		);
	});