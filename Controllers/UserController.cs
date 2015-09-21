using Gradera_Klubb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Gradera_Klubb.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        public string Test()
        {
            return "Hello World";
        }

        public UserModel Login(string userName, string password)
        {
            return null;
        }
    }
}
