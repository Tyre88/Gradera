using Core.BLL;
using Core.DAL;
using Core.Enums;
using Gradera_Klubb.Filters;
using Gradera_Klubb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Gradera_Klubb.Controllers
{
    public class GradingController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading)]
        public HttpResponseMessage GetGradingTabs(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            string gradingTabContent = GradingBLL.GetGradingTabsContent(id);

            response.Content = new ObjectContent<string>(gradingTabContent, new JsonMediaTypeFormatter());

            return response;
        }

        [HttpPost]
        [HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveGradingTabs(GradingTabs dataTab)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            Core.DAL.GradingTabs tab = new Core.DAL.GradingTabs()
            {
                Id = dataTab.Id,
                ClubId = dataTab.ClubId,
                Content = dataTab.Content
            };

            int tabId = GradingBLL.SaveGradingTabs(tab);

            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage GetAllTechniques()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            response.Content = new ObjectContent<List<TecModel>>(TecModel.MapTecModels(TechniqueBLL.GetAllTechniques()), new JsonMediaTypeFormatter());

            return response;
        }
    }
}
