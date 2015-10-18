require(
	[
		"app"
	],
	function(app)
	{
		app.service('user-service', function($http)
		{
			this.UserModel = function(compound, user)
			{
				if(user == undefined)
				{
					return {
						Id: 0,
						FirstName: "",
						LastName: "",
						UserName: "",
						Password: "",
						Email: "",
						AccessRights: [],
						Compound: compound
					};
				}

				return {
					Id: user.Id,
					FirstName: user.FirstName,
					LastName: user.LastName,
					UserName: user.UserName,
					Password: "",
					Email: user.Email,
					AccessRights: user.AccessRights,
					Compound: compound
				};
			};

			this.User =
			{
				Id: 0,
				IsLoggedIn: false,
				FirstName: "",
				LastName: "",
				UserName: "",
				Password: "",
				Email: "",
				AccessRights: [],
				AccessRightsRight: [],
				Token: "",
				Compound:
				{
					Id: 0,
					Name: "",
					ShortName: "",
					Image: ""
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
					this.AccessRightsRight = user.AccessRightsRight;
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

					for(var i = 0; i < account.AccessRightsRight.length; i++)
					{
						this.AccessRightsRight.push(account.AccessRightsRight[i]);
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

			this.GetUser = function(userId) {
				return $http.get('/api/User/GetUser/' + userId);
			};
		});
	}
);