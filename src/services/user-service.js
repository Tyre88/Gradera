require(
	[
		"app"
	],
	function(app)
	{
		app.service('user-service', function($http)
		{
			this.User =
			{
				Id: 1,
				IsLoggedIn: false,
				FirstName: "Victor",
				LastName: "Öhrström",
				UserName: "victor",
				Password: "",
				Email: "victor@webbdudes.se",
				AccessRights: [],
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
				},
				Initialize: function(user) {
					this.Id = user.Id;
					this.IsLoggedIn = user.IsLoggedIn;
					this.FirstName = user.FirstName;
					this.LastName = user.LastName;
					this.UserName = user.UserName;
					this.Email = user.Email;
					this.AccessRights = user.AccessRights;
					this.Token = user.Token;
					this.Compound = user.Compound;
				},
				InitializeLogin: function(account) {
					this.Id = account.Id;
					this.IsLoggedIn = true;
					this.FirstName = account.FirstName;
					this.LastName = account.LastName;
					this.UserName = account.Username;
					this.Email = account.Email;
					this.Token = account.Token;
					this.Compound.Id = account.Compound.Id;
					this.Compound.Name = account.Compound.Name;
					this.Compound.ShortName = account.Compound.ShortName;
					this.Compound.Image = account.Compound.Image;

					for(var i = 0; i < account.AccessRights.length; i++)
					{
						this.AccessRights.push(account.AccessRights[i]);
					}

					if(typeof(Storage) !== "undefined") {
						window.sessionStorage.setItem('gk-user', JSON.stringify(this));
					} else {
						// Sorry! No Web Storage support..
					}
				}
			};

			this.GetAllUsers = function() {
				return $http.get('/api/User/GetAllUsers');
			};
		});
	}
);