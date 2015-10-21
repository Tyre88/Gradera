using Core.BLL;
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
    public class AccessrightsController : ApiController
    {
        [AuthorizeFilter(AccessType = Core.Enums.AccessType.Core, AccessTypeRight = Core.Enums.AccessTypeRight.Read)]
        public HttpResponseMessage GetAccessRights()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<AccessrightModel> accessRights = AccessrightModel.MapAccessrights(AccessrightBLL.GetAccessrights(loggedInUser.AccountSession.ClubId));

            response.Content = new ObjectContent<List<AccessrightModel>>(accessRights, new JsonMediaTypeFormatter());

            return response;
        }
    }
}
