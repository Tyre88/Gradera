using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Gradera_Klubb.Filters
{
    public class AuthorizeFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.Request.Method == HttpMethod.Options)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.OK);
                return;
            }

            string token = actionContext.Request.Headers.GetValues("AuthenticateToken").FirstOrDefault<string>();

            if(!string.IsNullOrEmpty(token))
            {

            }
        }
    }
}