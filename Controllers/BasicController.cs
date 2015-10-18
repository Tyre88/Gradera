using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Formatting;
using Gradera_Klubb.Models;
using Gradera_Klubb.Filters;
using Core.Enums;

namespace Gradera_Klubb.Controllers
{
    [AuthorizeFilter]
    public class BasicController : ApiController
    {
    }
}
