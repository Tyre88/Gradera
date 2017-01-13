using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
using Gradera.Mediabank.BLL;
using Gradera.Mediabank.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Mediabank
{
    [AuthorizeFilter]
    public class MediabankAdminController : ApiController
    {
        private IMediabank _mediabank;

        public MediabankAdminController(IMediabank mediabank)
        {
            _mediabank = mediabank;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Mediabank, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage GetAllFiles()
        {
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            _mediabank.GetAllFiles(loggedInUser.AccountSession.ClubId);
            //IList<FormModel> forms = FormModel.MapFormModels(FormsAdminBLL.GetAllForms(loggedInUser.AccountSession.ClubId));
            //forms.ForEach(f => f.AnswerCount = FormsAdminBLL.GetFormAnswerCount(f.Id, f.IsExternal, loggedInUser.AccountSession.ClubId));
            //response.Content = new ObjectContent<List<FormModel>>(forms, new JsonMediaTypeFormatter());
            return response;
        }
    }
}
