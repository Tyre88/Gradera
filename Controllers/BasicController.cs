using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Formatting;
using Gradera_Klubb.Models;
using Gradera_Klubb.Filters;

namespace Gradera_Klubb.Controllers
{
    [AuthorizeFilter]
    public class BasicController : ApiController
    {
        Vicdude_graderaEntities db = new Vicdude_graderaEntities();

        [HttpGet]
        public HttpResponseMessage GetGradingTabs(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            string tabData = db.GradingTabs.FirstOrDefault(t => t.ClubId == id).Content;

            response.Content = new ObjectContent<string>(tabData, new JsonMediaTypeFormatter());

            return response;
        }

        [HttpPost]
        [HttpOptions]
        public HttpResponseMessage SaveGradingTabs(GradingTabs tab)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            var dataTab = db.GradingTabs.FirstOrDefault(t => t.Id == tab.Id);

            if(dataTab != null)
            {
                dataTab.Content = tab.Content;
                dataTab.LastEdited = DateTime.Now;
                db.SaveChanges();
            }
            else
            {
                tab.LastEdited = DateTime.Now;

                db.GradingTabs.Add(tab);
                db.SaveChanges();
            }

            return response;
        }

        [HttpGet]
        public HttpResponseMessage GetAllTechniques()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            var techniques = db.TECHNICS.ToList();

            List<TecModel> tecModels = new List<TecModel>();

            foreach (var item in techniques)
            {
                tecModels.Add(new TecModel()
                {
                    Id = item.id,
                    Belt = item.belt,
                    Description = item.desc,
                    Name = item.name
                });
            }

            response.Content = new ObjectContent<List<TecModel>>(tecModels, new JsonMediaTypeFormatter());

            return response;
        }
    }
}
