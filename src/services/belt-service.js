require(
	[
		"app"
	],
	function(app)
	{
		app.service('belt-service', [function()
		{
			this.BeltColor = {
				WhiteYellow: 1,
				Yellow: 2,
				YellowOrage: 3,
				Orange: 4,
				OrangeGreen: 5,
				Green: 6,
				GreenBlue: 7,
				Blue: 8,
				BlueBrown: 9,
				Brown: 10
			};
		}]);
	}
);