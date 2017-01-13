using Gradera.Core.Enums;
using Gradera.Core.Filters;
using Gradera.Newsletter.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Newsletter
{
    public class NewsletterController : ApiController
    {
        [HttpPost, HttpOptions]
        public HttpResponseMessage Unsubscribe(string guid)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            string email = NewsletterBLL.Unsubscribe(guid);
            response.Content = new ObjectContent<string>
                (email, new JsonMediaTypeFormatter());
            return response;
        }
    }
}
