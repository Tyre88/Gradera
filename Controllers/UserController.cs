using Core.BLL;
using Core.DAL;
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
    [AuthorizeFilter]
    public class UserController : ApiController
    {
        [AuthorizeFilter(AccessType = Core.Enums.AccessType.Account, AccessTypeRight = Core.Enums.AccessTypeRight.Read)]
        public HttpResponseMessage GetAllUsers()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<Account> accounts = AccountBLL.GetAllUsers(loggedInUser.AccountSession.ClubId);
            List<UserModel> users = UserModel.MapUserModels(accounts);

            response.Content = new ObjectContent<List<UserModel>>(users, new JsonMediaTypeFormatter());

            return response;
        }
    }
}
