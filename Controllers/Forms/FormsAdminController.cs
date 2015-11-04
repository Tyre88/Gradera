﻿using Gradera.Core.Enums;
using Gradera.Forms.BLL;
using Gradera_Klubb.Filters;
using Gradera_Klubb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Forms
{
    public class FormsAdminController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Forms, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage GetAllForms()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            FormsAdminBLL.GetAllForms(loggedInUser.AccountSession.ClubId);
            return response;
        }
    }
}
