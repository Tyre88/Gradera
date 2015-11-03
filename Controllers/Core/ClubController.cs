﻿using Gradera.Core.BLL;
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
    public class ClubController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Club, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetClub()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;

            response.Content = new ObjectContent<ClubModel>(ClubModel.MapClub(ClubBLL.GetClub(loggedInUser.AccountSession.ClubId)), 
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Club, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveClub(ClubModel club)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            ClubBLL.SaveClub(ClubModel.MapClubModelToClub(club));
            return response;
        }
    }
}