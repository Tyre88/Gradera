using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
using Gradera.Techniques.BLL;
using Gradera_Klubb.Models;
using Gradera_Klubb.Models.Techniques;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Techniques
{
    public class TechniqueController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Techniques, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetTechnique(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            TechniqueModel technique = TechniqueModel.MapTechniqueModel(TechniqueBLL.GetTechnique(id, loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<TechniqueModel>(technique,
                new JsonMediaTypeFormatter());
            return response;
        }
    }
}
