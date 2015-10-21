using Core.BLL;
using Core.Entities;
using Gradera_Klubb.Filters;
using Gradera_Klubb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers
{
    public class AuthenticateController : ApiController
    {
        [HttpPost]
        [HttpOptions]
        public HttpResponseMessage Login(string userName, string password)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            UserModel user = UserModel.MapUserModel(AuthenticateBLL.Login(userName, password), true);

            if (user == null)
                response = new HttpResponseMessage(HttpStatusCode.Unauthorized);

            if(string.IsNullOrEmpty(user.Token))
            {
                AccountSessionEntity session = new AccountSessionEntity()
                {
                    AccountId = user.Id,
                    ClubId = user.ClubId,
                    Token = Guid.NewGuid().ToString(),
                    ExpirationDate = DateTime.Now.AddDays(1)
                };
                AccountSessionCache.Instance.Add(session);
                user.Token = session.Token;
            }

            response.Content = new ObjectContent<UserModel>(user, new JsonMediaTypeFormatter());

            return response;
        }

        [HttpPost]
        public HttpResponseMessage Register()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            return response;
        }

        [HttpPost]
        [HttpOptions]
        [AuthorizeFilter]
        public HttpResponseMessage Logout()
        {
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            AccountSessionCache.Instance.Logout(loggedInUser.AccountSession.Token);
            return response;
        }
    }
}
