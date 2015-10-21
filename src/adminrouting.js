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
						.state('listusers',
						{
							url: "admin/listusers",
							templateUrl: "modules/core/users/views/listusers.html",
							controller: "listusers"
						})
						.state('edituser',
						{
							url: "admin/edituser/:userId",
							templateUrl: "modules/core/users/views/edituser.html",
							controller: "edituser"
						})
						.state('listaccessrights',
						{
							url: "admin/listaccessrights",
							templateUrl: "modules/core/accessrights/views/listaccessrights.html",
							controller: "listaccessrights",
							controllerAs: "vm"
						})
						.state('editaccessright',
						{
							url: "admin/editaccessright/:id",
							templateUrl: "modules/core/accessrights/views/editaccessright.html",
							controller: "editaccessright",
							controllerAs: "vm"
						});
				}
			]
		);
	});