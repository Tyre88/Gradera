require(
	[
		"app"
	],
	function(app)
	{
		app.service('user-service', function()
		{
			this.User =
			{
				Id: 1,
				IsLoggedIn: true,
				FirstName: "Victor",
				LastName: "Öhrström",
				UserName: "victor",
				Password: "",
				Email: "victor@webbdudes.se",
				AccessLevel: 1,
				Token: "",
				Compound:
				{
					Id: 1,
					Name: "Wemmenhögs budoförening",
					ShortName: "WBF",
					Image: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/t5.0-1/71155_279044720003_4250628_n.jpg"
				},
				FullName: function()
				{
					return String.format("{0} {1}", this.FirstName, this.LastName);
				}
			};
		});
	}
);