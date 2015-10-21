using Core.BLL;
using Core.Entities;
using Core.Enums;
using Core.Helpers;
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
        [AuthorizeFilter(AccessType = AccessType.Core, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAccessRights()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<AccessrightModel> accessRights = AccessrightModel.MapAccessrights(AccessrightBLL.GetAccessrights(loggedInUser.AccountSession.ClubId));

            response.Content = new ObjectContent<List<AccessrightModel>>(accessRights, new JsonMediaTypeFormatter());

            return response;
        }

        [AuthorizeFilter(AccessType = AccessType.Core, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAccessRight(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            AccessrightModel accessRight = AccessrightModel.MapAccessright(AccessrightBLL.GetAccessright(id, loggedInUser.AccountSession.ClubId));

            response.Content = new ObjectContent<AccessrightModel>(accessRight, new JsonMediaTypeFormatter());

            return response;
        }

        [AuthorizeFilter(AccessType = AccessType.Core, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAccessTypes()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            List<EnumKeyValueEntity> accessTypes = new List<EnumKeyValueEntity>();

            foreach (var item in Enum.GetValues(typeof(AccessType)))
            {
                accessTypes.Add(new EnumKeyValueEntity()
                {
                    Name = item.ToString(),
                    Id = (int)item
                });
            }

            response.Content = new ObjectContent<List<EnumKeyValueEntity>>(accessTypes, new JsonMediaTypeFormatter());

            return response;
        }

        [AuthorizeFilter(AccessType = AccessType.Core, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAccessTypeRights()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            List<EnumKeyValueEntity> accessTypes = new List<EnumKeyValueEntity>();

            foreach (var item in Enum.GetValues(typeof(AccessTypeRight)))
            {
                accessTypes.Add(new EnumKeyValueEntity()
                {
                    Name = item.ToString(),
                    Id = (int)item
                });
            }

            response.Content = new ObjectContent<List<EnumKeyValueEntity>>(accessTypes, new JsonMediaTypeFormatter());

            return response;
        }

    }
}
