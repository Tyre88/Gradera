using Gradera.Grading.BLL;
using Gradera_Klubb.Models.Grading;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Grading
{
    public class GradingPublicController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetGradingBooklet()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            GradingBookletModel booklet = GradingBookletModel.MapBookletModel(GradingAdminBLL.GetGradingBooklet(1, 1), true);
            response.Content = new ObjectContent<GradingBookletModel>(booklet,
                new JsonMediaTypeFormatter());
            return response;
        }
    }
}
