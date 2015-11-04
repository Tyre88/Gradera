using Gradera.Core.Enums;
using Gradera.Forms.BLL;
using Gradera_Klubb.Filters;
using Gradera_Klubb.Models;
using Gradera_Klubb.Models.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
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
            List<FormModel> forms = FormModel.MapFormModels(FormsAdminBLL.GetAllForms(loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<List<FormModel>>(forms, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Forms, AccessTypeRight = AccessTypeRight.Admin)]
        public HttpResponseMessage DeleteForm(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            FormsAdminBLL.DeleteForm(id, loggedInUser.AccountSession.ClubId);
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Forms, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage GetForm(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            response.Content = new ObjectContent<FormModel>(FormModel.MapFormModel(FormsAdminBLL.GetForm(id, loggedInUser.AccountSession.ClubId), true), 
                new JsonMediaTypeFormatter());
            return response;
        }
    }
}
