using Gradera.Core.BLL;
using Gradera.Core.DAL;
using Gradera.Core.Enums;
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
    public class UserController : ApiController
    {
        [AuthorizeFilter(AccessType = AccessType.Account, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAllUsers()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<Account> accounts = AccountBLL.GetAllUsers(loggedInUser.AccountSession.ClubId);
            List<UserModel> users = UserModel.MapUserModels(accounts, false, true);

            response.Content = new ObjectContent<List<UserModel>>(users, new JsonMediaTypeFormatter());

            return response;
        }

        [AuthorizeFilter(AccessType = AccessType.Account, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetUser(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new ObjectContent<UserModel>(UserModel.MapUserModel(AccountBLL.GetUser(id), true), new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost]
        [HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Account, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveUser(UserModel user)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            Account acc = UserModel.ConvertToAccount(user);
            Account account = AccountBLL.SaveAccount(acc);
            //response.Content = new ObjectContent<Account>(account, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Account, AccessTypeRight = AccessTypeRight.Admin)]
        public HttpResponseMessage DeleteUser(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            AccountBLL.DeleteUser(id, loggedInUser.AccountSession.ClubId);
            return response;
        }
    }
}
