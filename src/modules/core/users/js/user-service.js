require(
	[
		"app"
	],
	function(app)
	{
		app.service('user-service', function($http)
		{
			this.UserModel = function(club, user)
			{
				if(user == undefined)
				{
					return {
						Id: 0,
						FirstName: "",
						LastName: "",
						UserName: "",
						Password: "",
						Image: "",
						AccessRights: [],
						Club: club,
						UserInformation: {},
						Gender: 0
					};
				}

				return {
					Id: user.Id,
					FirstName: user.FirstName,
					LastName: user.LastName,
					UserName: user.Username,
					Image: user.Image,
					Password: "",
					AccessRights: user.AccessRights,
					Club: club,
					Gender: user.Gender,
					UserInformation: {
						Email: user.UserInformation.Email,
						City: user.UserInformation.City,
						Occupation: user.UserInformation.Occupation,
						Phone: user.UserInformation.Phone,
						Street: user.UserInformation.Street,
						Zip: user.UserInformation.Zip,
						Grade: user.UserInformation.Grade,
						Birthday: new Date(user.UserInformation.Birthday),
						Weight: user.UserInformation.Weight
					}
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
				Club:
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
					this.Club = user.Club;
					this.Weight = user.Weight;
					this.Image = user.Image;
				},
				InitializeLogin: function(account) {
					this.Id = account.Id;
					this.IsLoggedIn = true;
					this.FirstName = account.FirstName;
					this.LastName = account.LastName;
					this.UserName = account.Username;
					this.Email = account.Email;
					this.Token = account.Token;
					this.Image = account.Image;
					this.Club.Id = account.Club.Id;
					this.Club.Name = account.Club.Name;
					this.Club.ShortName = account.Club.ShortName;
					this.Club.Image = account.Club.Image;

					for(var i = 0; i < account.AccessRightsRight.length; i++)
					{
						this.AccessRightsRight.push(account.AccessRightsRight[i]);
					}

					if(typeof(Storage) !== "undefined") {
						window.sessionStorage.setItem('gk-user', JSON.stringify(this));
					} else {
						// Sorry! No Web Storage support..
					}
				},
				Logout: function() {
					this.Id = 0;
					this.IsLoggedIn = false;
					this.FirstName = "";
					this.LastName = "";
					this.UserName = "";
					this.Email = "";
					this.Token = "";
					this.Club.Id = "";
					this.Club.Name = "";
					this.Club.ShortName = "";
					this.Club.Image = "";
					this.Password = "";
					this.Image = "";

					this.AccessRightsRight = [];

					if(typeof(Storage) !== "undefined") {
						window.sessionStorage.removeItem('gk-user');
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

			this.SaveUser = function(user) {
				return $http.post('/api/User/SaveUser', user);
			};
		});
	}
);