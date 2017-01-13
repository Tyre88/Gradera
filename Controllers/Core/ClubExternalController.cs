using Gradera.Core.BLL;
using Gradera_Klubb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Core
{
    public class ClubExternalController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetClubByShortName(string shortName)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            response.Content = new ObjectContent<ClubModel>(ClubModel.MapClub(ClubBLL.GetClubByShortName(shortName)),
                new JsonMediaTypeFormatter());
            return response;
        }
    }
}
