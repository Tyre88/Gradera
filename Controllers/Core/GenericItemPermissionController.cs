using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
using Gradera.Core.Interfaces;
using Gradera_Klubb.Models.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Core
{
    public class GenericItemPermissionController : ApiController
    {
        private IGenericItemPermissionsBLL _genericItemPermissionBLL;

        public GenericItemPermissionController(IGenericItemPermissionsBLL genericItemPermissionBLL)
        {
            _genericItemPermissionBLL = genericItemPermissionBLL;
        }

        [HttpPost]
        [AuthorizeFilter]
        public HttpResponseMessage SaveGenericItemPermissions(GenericItemPermissionsModel permissions)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            _genericItemPermissionBLL.SaveGenericItemPermissions(permissions.ObjectId, permissions.ObjectType, permissions.AccessrightIds, permissions.UserIds, loggedInUser.AccountSession.ClubId);

            return response;
        }

        [HttpGet]
        [AuthorizeFilter]
        public HttpResponseMessage GetItemPermission(GenericItemPermissionObjectTypes objectType, int objectId)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            GenericItemPermissionsModel genericItemPermission = new GenericItemPermissionsModel(_genericItemPermissionBLL.GetItemPermissions(objectType, objectId));
            response.Content = new ObjectContent<GenericItemPermissionsModel>(genericItemPermission, new JsonMediaTypeFormatter());

            return response;
        }
    }
}
